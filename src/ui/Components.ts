import { defaultConfig } from "@/config/config";
import { Config } from "@/config/types";
import {
  DEFAULT_COMPONENT_CONTENT,
  NO_CONFIG_ACTIONS_CREATE,
  NO_CONFIG_ACTIONS_DEFAULT,
  NO_CONFIG_FOUND_MESSAGE,
} from "@/constants/Constants";
import { writeFile } from "@/utility/fileUtility";
import { log } from "@/utility/logger";
import { Uri, window } from "vscode";
import path = require("path");

export const showNoConfigFileExistPrompt = async (
  uri: Uri
): Promise<Config> => {
  const choice = await window.showInformationMessage(
    NO_CONFIG_FOUND_MESSAGE,
    ...[NO_CONFIG_ACTIONS_CREATE, NO_CONFIG_ACTIONS_DEFAULT]
  );

  makeConfigurationOption(uri, choice as string);
  return defaultConfig;
};

const makeConfigurationOption = (uri: Uri, choice: string) => {
  switch (choice) {
    case NO_CONFIG_ACTIONS_CREATE:
      const templateFolderUri = Uri.file(
        path.dirname(uri.fsPath) +
          `/${defaultConfig.templateFolder}/${defaultConfig.templateComponentName}/${defaultConfig.templateComponentName}.ts`
      );
      writeFile(uri, JSON.stringify(defaultConfig, null, 3));
      writeFile(templateFolderUri, DEFAULT_COMPONENT_CONTENT);
      break;

    default:
      log("no choice"); // a better message maybe
  }
};
