import { MC_MAIN_CMD } from '@/constants/Constants';
import messages from '@/constants/Message.json';
import { MainExtension } from '@/domain/MainExtension';
import { TerminateReason, TerminationError } from '@/exceptions/TerminationError';
import { DialogManager } from '@/ui/DialogManager';
import { log } from '@/utility/logger';
import { ExtensionContext, Uri, commands } from 'vscode';

export function activate(context: ExtensionContext) {
  const command = commands.registerCommand(MC_MAIN_CMD, async (uri?: Uri) => {
    log(messages.extensionRunning);

    try {
      if (!uri) {
        throw new TerminationError(TerminateReason.NoUriProvided);
      }

      await MainExtension.from(context, uri).run();
      DialogManager.displaySuccessNotification();
    } catch (error) {
      if (error instanceof TerminationError) {
        DialogManager.displayWarning((error as TerminationError).reason);
      } else {
        log((error as any).message);
      }
    }
  });
  context.subscriptions.push(command);
}

export function deactivate() {}
