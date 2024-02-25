import { Config } from '@/config/types';
import { CONFIG_FILE_NAME_IN_WORKSPACE, EXTENSION_ID } from '@/constants/Constants';
import { TerminateReason, TerminationError } from '@/exceptions/TerminationError';
import { DialogManager } from '@/ui/DialogManager';
import { Files } from '@/utility/Files';
import { getAllTemplateFilePaths } from '@/utility/configValidator';
import { extensions, window, workspace } from 'vscode';

export class ConfigLoader {
  private async readConfig(): Promise<Config> {
    const readStr = await Files.readFile(CONFIG_FILE_NAME_IN_WORKSPACE);
    return JSON.parse(readStr) as Config;
  }
  private async initializeEmptyTemplate() {
    const extensionPath = extensions.getExtension(EXTENSION_ID)?.extensionPath;
    await Files.copyFolder(Files.absolute(extensionPath!, 'template'));
  }

  private async handleTemplateFolderCloning() {
    if (await DialogManager.promptCreateNewConfig()) {
      await this.initializeEmptyTemplate();
      // TODO: this doesnt work  , file not found
      const doc = await workspace.openTextDocument(CONFIG_FILE_NAME_IN_WORKSPACE);
      await window.showTextDocument(doc);
      return true;
    }
    return false;
  }

  private async checkTemplateConfigCompatibility(config: Config) {
    const allTemplateFilePaths = getAllTemplateFilePaths(config);

    const allFilesExist = await Promise.all(
      allTemplateFilePaths.map(async (e) => await Files.exist(e)),
    );
    return allFilesExist.every(Boolean);
  }

  getConfig = async (): Promise<Config> => {
    const fileExist = await Files.exist(CONFIG_FILE_NAME_IN_WORKSPACE);

    if (fileExist) {
      const config = await this.readConfig();
      const allFilesMatchTemplate = await this.checkTemplateConfigCompatibility(config);
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

  // ______ singleton _______
  private static _instance: ConfigLoader | null = null;
  public static instance(): ConfigLoader {
    if (this._instance === null) {
      this._instance = new ConfigLoader();
    }
    return this._instance;
  }
  // ____ END singleton _____
}
