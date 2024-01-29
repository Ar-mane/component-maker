import { Config } from "@/config/types";
import {
  CONFIG_FILE_NAME_IN_WORKSPACE,
  EXTENSION_ID,
} from "@/constants/Constants";
import messages from "@/constants/Message.json";
import {
  ExtensionTerminationError,
  TerminateReason,
} from "@/exceptions/ExtensionTerminationError";
import { DialogManager } from "@/ui/DialogManager";
import { rootUri, subFolderUri } from "@/utility/Uri";
import { getParentUri, isFileExist, readFile } from "@/utility/fileUtility";
import * as fs from "fs-extra";
import * as path from "node:path";
import { ExtensionContext, Uri, extensions, window, workspace } from "vscode";

export class ConfigLoader {
  context: ExtensionContext;
  projectConfigFileUri: Uri;
  workspaceUri: Uri;
  destinationUri: Uri;

  private constructor(context: ExtensionContext, uri: Uri) {
    this.context = context;
    this.workspaceUri = rootUri();
    this.destinationUri = getParentUri(uri);
    this.projectConfigFileUri = subFolderUri(
      this.workspaceUri,
      CONFIG_FILE_NAME_IN_WORKSPACE
    );
  }

  private setContext(context: ExtensionContext) {
    this.context = context;
  }

  private async readConfigFromConfigFile(): Promise<Config> {
    const readStr = await readFile(this.projectConfigFileUri);
    return JSON.parse(readStr) as Config;
  }

  private generateEmptyTemplate() {
    const templateFolder = this.getTemplateFolderFromExtension();
    fs.copy(templateFolder, this.workspaceUri.fsPath, {
      overwrite: true,
    });
  }

  private getTemplateFolderFromExtension() {
    const extensionPath = extensions.getExtension(EXTENSION_ID)?.extensionPath;
    const templateFolder = path.join(extensionPath || "", "template");
    return templateFolder;
  }

  private async manageCloningTemplateFolder() {
    if (await DialogManager.shouldCreateNewConfig()) {
      this.generateEmptyTemplate();
      window.showInformationMessage(messages.cloningTemplateInfo);
      workspace.openTextDocument(this.projectConfigFileUri).then((doc) => {
        window.showTextDocument(doc);
      });
    }
  }
  getProperConfig = async (): Promise<Config> => {
    const fileExist = await isFileExist(this.projectConfigFileUri);

    if (fileExist) {
      return this.readConfigFromConfigFile();
    } else {
      this.manageCloningTemplateFolder();
      throw new ExtensionTerminationError(TerminateReason.configCreated);
    }
  };

  public get getWorkspaceUri(): Uri {
    return this.workspaceUri;
  }
  // ______ singleton _______
  private static instance: ConfigLoader | null = null;
  public static from(
    context: ExtensionContext,
    destinationUri: Uri
  ): ConfigLoader {
    if (this.instance === null) {
      this.instance = new ConfigLoader(context, destinationUri);
    }
    this.instance.setContext(context);
    return this.instance;
  }
  // ____ END singleton _____
}
