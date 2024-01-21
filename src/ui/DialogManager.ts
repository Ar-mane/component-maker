import { defaultConfig } from "@/config/config";
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

export class DialogManager {
  static async shouldCreateNewConfig() {
    //TODO: needs rework
    const choice = await window.showInformationMessage(
      NO_CONFIG_FOUND_MESSAGE,
      ...[NO_CONFIG_ACTIONS_CREATE, NO_CONFIG_ACTIONS_DEFAULT]
    );

    return choice === NO_CONFIG_ACTIONS_CREATE;
  }
}
