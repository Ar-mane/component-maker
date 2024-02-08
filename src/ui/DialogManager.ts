import { Config, Template } from "@/config/types";
import messages from "@/constants/Message.json";
import {
  TerminationError,
  TerminateReason,
} from "@/exceptions/TerminationError";
import { window } from "vscode";

export class DialogManager {
  static async displayWarning(failReason?: TerminateReason) {
    window.showInformationMessage("YAAAY");
  }
  static async displaySuccessNotification() {
    window.showInformationMessage("YAAAY");
  }
  static async promptCreateNewConfig() {
    //TODO: needs rework
    const choice = await window.showInformationMessage(
      messages.noConfigFoundInfo,
      ...[messages.noConfigActionCreate, messages.noConfigActionDefault],
    );

    return choice === messages.noConfigActionCreate;
  }

  static async promptTemplateSelection(config: Config): Promise<Template> {
    const selection = await window.showQuickPick(config.templates);
    if (!selection) {
      throw new TerminationError(TerminateReason.TemplateSelectionFailed);
    }
    return selection;
  }

  static async promptComponentName(): Promise<string> {
    const componentName = await window.showInputBox({
      prompt: messages.componentNamePrompt,
    });

    if (!componentName) {
      throw new TerminationError(TerminateReason.EmptyComponentName);
    }
    return componentName;
  }
}
