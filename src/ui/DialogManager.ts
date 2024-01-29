import { Config, Template } from "@/config/types";
import messages from "@/constants/Message.json";
import {
  ExtensionTerminationError,
  TerminateReason,
} from "@/exceptions/ExtensionTerminationError";
import { window } from "vscode";

export class DialogManager {
  static async showNotification(
    success: boolean,
    failReason?: TerminateReason
  ) {
    window.showInformationMessage("YAAAY");
  }
  static async shouldCreateNewConfig() {
    //TODO: needs rework
    const choice = await window.showInformationMessage(
      messages.noConfigFoundInfo,
      ...[messages.noConfigActionCreate, messages.noConfigActionDefault]
    );

    return choice === messages.noConfigActionCreate;
  }

  static async propmtTemplateOptions(config: Config): Promise<Template> {
    const selection = await window.showQuickPick(config.templates);
    if (!selection) {
      throw new ExtensionTerminationError(TerminateReason.templateSelect);
    }
    return selection;
  }

  static async propmtComponentName(): Promise<string> {
    const componentName = await window.showInputBox({
      prompt: messages.componentNamePrompt,
    });

    if (!componentName) {
      throw new ExtensionTerminationError(TerminateReason.emptyComponentName);
    }
    return componentName;
  }
}
