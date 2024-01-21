import { defaultConfig } from "@/config/config";
import { Config } from "@/config/types";
import {
  CONFIG_FILE_NAME_IN_WORKSPACE,
  EXTENSION_ID,
} from "@/constants/Constants";
import { DialogManager } from "@/ui/DialogManager";
import { rootUri, subFolderUri } from "@/utility/Uri";
import { isFileExist, readFile, writeFile } from "@/utility/fileUtility";
import * as fs from "fs-extra";
import { ExtensionContext, Uri, extensions, window, workspace } from "vscode";
import path = require("path");

export class ConfigLoader {
  context: ExtensionContext;
  projectConfigFileUri: Uri;
  rootFolder: Uri;

  private constructor(context: ExtensionContext) {
    this.context = context;
    this.rootFolder = rootUri();
    this.projectConfigFileUri = subFolderUri(
      this.rootFolder,
      CONFIG_FILE_NAME_IN_WORKSPACE
    );
  }

  setContext(context: ExtensionContext) {
    this.context = context;
  }

  private async readConfigFromConfigFile(): Promise<Config> {
    const readStr = await readFile(this.projectConfigFileUri);
    return JSON.parse(readStr) as Config;
  }

  private generateEmptyTemplate() {
    writeFile(
      this.projectConfigFileUri,
      JSON.stringify(defaultConfig, null, 3)
    );
    this.cloneTemplateFolder();
  }

  private cloneTemplateFolder() {
    const extensionPath = extensions.getExtension(EXTENSION_ID)?.extensionPath;
    const sourcePath = path.join(extensionPath || "", "src", ".cm_templates");
    const destinationPath = path.join(this.rootFolder.path, ".cm_templates");

    fs.copy(sourcePath, destinationPath, { overwrite: true }, (error: any) => {
      if (error) {
        window.showErrorMessage(`Error cloning folder: ${error.message}`);
      } else {
        window.showInformationMessage(
          `Folder cloned successfully to ${destinationPath}`
        );
      }
    });
  }
  private async manageCloningTemplateFolder() {
    if (await DialogManager.shouldCreateNewConfig()) {
      this.generateEmptyTemplate();

      window.showInformationMessage(
        "Initializing templates. Please edit the configuration file and the template content. You can find them in your workspace root"
      );
      workspace
        .openTextDocument(this.projectConfigFileUri)
        .then(window.showTextDocument);
    }
  }
  getProperConfig = async (): Promise<Config | undefined> => {
    const fileExist = await isFileExist(this.projectConfigFileUri);

    if (fileExist) {
      return this.readConfigFromConfigFile();
    } else {
      this.manageCloningTemplateFolder();
      return undefined;
    }
  };

  // ______ singleton _______
  private static instance: ConfigLoader | null = null;
  public static from(context: ExtensionContext): ConfigLoader {
    if (this.instance === null) {
      this.instance = new ConfigLoader(context);
    }
    this.instance.setContext(context);
    return this.instance;
  }
  // ____ END singleton _____
}
