import { Config, Template } from '@/config/types';
import { COMPONENT_NAME_REGEX } from '@/constants/Constants';
import messages from '@/constants/Message.json';
import { TerminateReason, TerminationError } from '@/exceptions/TerminationError';
import { window } from 'vscode';

export class DialogManager {
  static async displayWarning(failReason: TerminateReason) {
    if (failReason !== TerminateReason.Canceled) {
      window.showInformationMessage(messages.terminationReason[failReason]);
    }
  }
  static async displaySuccessNotification() {
    window.showInformationMessage(messages.ComponentCreatedSuccessfully);
  }
  static async promptCreateNewConfig() {
    const choice = await window.showInformationMessage(
      messages.noConfigFoundInfo,
      ...[messages.noConfigActionCreate, messages.noConfigActionDefault],
    );

    return choice === messages.noConfigActionCreate;
  }

  static async promptTemplateSelection(config: Config): Promise<Template> {
    const selection = await window.showQuickPick(config.templates, {
      ignoreFocusOut: true,
    });

    if (!selection) {
      throw new TerminationError(TerminateReason.Canceled);
    }

    return selection;
  }

  static async promptComponentName(): Promise<string> {
    const componentName = await window.showInputBox({
      prompt: messages.componentNamePrompt,
      title: messages.componentNameWarning.title,
      validateInput: (input) => {
        if (!input) {
          return messages.componentNameWarning.empty;
        }
        if (!COMPONENT_NAME_REGEX.test(input)) {
          return messages.componentNameWarning.invalid;
        }
      },
    });
    if (componentName === undefined) {
      throw new TerminationError(TerminateReason.Canceled);
    }
    return componentName;
  }
}
