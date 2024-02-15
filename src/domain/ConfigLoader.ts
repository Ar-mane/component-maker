import { Config } from "@/config/types";
import {
  CONFIG_FILE_NAME_IN_WORKSPACE,
  EXTENSION_ID,
} from "@/constants/Constants";
import {
  TerminateReason,
  TerminationError,
} from "@/exceptions/TerminationError";
import { DialogManager } from "@/ui/DialogManager";
import { rootUri, subFolderUri } from "@/utility/Uri";
import { getAllTemplateFilePaths } from "@/utility/configValidator";
import { getParentUri, isFileExist, readFile } from "@/utility/fileUtility";
import { log } from "@/utility/logger";
import * as fs from "fs-extra";
import * as path from "node:path";
import { Uri, extensions, window, workspace } from "vscode";

export class ConfigLoader {
  projectConfigFileUri: Uri;
  workspaceUri: Uri;
  destinationUri: Uri;

  private constructor(uri: Uri) {
    this.workspaceUri = rootUri();
    this.destinationUri = getParentUri(uri);
    this.projectConfigFileUri = subFolderUri(
      this.workspaceUri,
      CONFIG_FILE_NAME_IN_WORKSPACE,
    );
  }

  private async loadConfigFromConfigFile(): Promise<Config> {
    const readStr = await readFile(this.projectConfigFileUri);
    return JSON.parse(readStr) as Config;
  }
  private async initializeEmptyTemplate() {
    const templateFolder = this.getTemplateFolderFromExtension();
    await fs.copy(templateFolder, this.workspaceUri.fsPath, {
      overwrite: true,
    });
  }

  private getTemplateFolderFromExtension() {
    const extensionPath = extensions.getExtension(EXTENSION_ID)?.extensionPath;
    const templateFolder = path.join(extensionPath || "", "template");
    return templateFolder;
  }

  private async handleTemplateFolderCloning() {
    if (await DialogManager.promptCreateNewConfig()) {
      await this.initializeEmptyTemplate();
      const doc = await workspace.openTextDocument(this.projectConfigFileUri);
      await window.showTextDocument(doc);
      return true;
    }
    return false;
  }

  private async checkTemplateConfigCompatibility(config: Config) {
    const allTemplateFilePaths = getAllTemplateFilePaths(config);
    const fileExistencePromises = allTemplateFilePaths.map(
      async (filePath) =>
        await isFileExist(subFolderUri(this.getWorkspaceUri, filePath)),
    );
    const allFilesExist = await Promise.all(fileExistencePromises);
    return allFilesExist.every((fileExists) => fileExists);
  }

  getConfig = async (): Promise<Config> => {
    const fileExist = await isFileExist(this.projectConfigFileUri);

    if (fileExist) {
      const config = await this.loadConfigFromConfigFile();
      const allFilesMatchTemplate =
        await this.checkTemplateConfigCompatibility(config);
      if (allFilesMatchTemplate) {
        return config;
      } else {
        throw new TerminationError(TerminateReason.TemplateCompatibilityFailed);
      }
    } else {
      const isCreated = await this.handleTemplateFolderCloning();
      throw new TerminationError(
        isCreated
          ? TerminateReason.ConfigCreatedSuccessfully
          : TerminateReason.ConfigCreationAborted,
      );
    }
  };

  public get getWorkspaceUri(): Uri {
    return this.workspaceUri;
  }

  // ______ singleton _______
  private static instance: ConfigLoader | null = null;
  public static from(destinationUri: Uri): ConfigLoader {
    if (this.instance === null) {
      this.instance = new ConfigLoader(destinationUri);
    }
    return this.instance;
  }
  // ____ END singleton _____
}
