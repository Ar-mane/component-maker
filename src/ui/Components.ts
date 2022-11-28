import { Uri, window } from "vscode";
import {
  NO_CONFIG_ACTIONS_CREATE,
  NO_CONFIG_ACTIONS_DEFAULT,
  NO_CONFIG_FOUND_MESSAGE,
} from "@/constants/Constants";
import { writeFile } from "@/utility/fileUtility";
import { log } from "@/utility/logger";
import { Config } from "@/config/types";
import { defaultConfig } from "@/config/config";

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
      writeFile(uri, JSON.stringify(defaultConfig, null, 3));
      break;

    default:
      log("no choice"); // a better message maybe
  }
};
