import { MC_MAIN_CMD } from '@/constants/Constants';
import messages from '@/constants/Message.json';
import { MainExtension } from '@/domain/MainExtension';
import { TerminateReason, TerminationError } from '@/exceptions/TerminationError';
import { DialogManager } from '@/ui/DialogManager';
import { log } from '@/utility/logger';
import { ExtensionContext, Uri, commands } from 'vscode';

export function activate(context: ExtensionContext) {
  log(messages.extensionRunning);

  const command = commands.registerCommand(MC_MAIN_CMD, async (uri?: Uri) => {
    try {
      if (!uri) {
        throw new TerminationError(TerminateReason.NoUriProvided);
      }
      // this is a good conf for now
      // investigate using webview
      // if (panel) {
      //   panel.dispose();
      // }
      // panel = window.createWebviewPanel(
      //   EXTENSION_NAME,
      //   EXTENSION_NAME,
      //   ViewColumn.Beside,
      //   { enableScripts: true }
      // );

      // if (panel.visible) {
      //   panel.reveal(ViewColumn.Beside, true);
      // }

      await MainExtension.from(context, uri).run();
      DialogManager.displaySuccessNotification();
    } catch (error) {
      DialogManager.displayWarning((error as TerminationError).reason);
    }
  });
  context.subscriptions.push(command);
}

export function deactivate() {}
