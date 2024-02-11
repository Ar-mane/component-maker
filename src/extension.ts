import { MC_MAIN_CMD } from "@/constants/Constants";
import messages from "@/constants/Message.json";
import { MainExtension } from "@/domain/MainExtension";
import {
  TerminateReason,
  TerminationError,
} from "@/exceptions/TerminationError";
import { DialogManager } from "@/ui/DialogManager";
import { log } from "@/utility/logger";
import { ExtensionContext, Uri, ViewColumn, commands, window } from "vscode";

export function activate(context: ExtensionContext) {
  log(messages.extensionRunning);

  const command = commands.registerCommand(MC_MAIN_CMD, async (uri?: Uri) => {
    try {
      if (!uri) {
        throw new TerminationError(TerminateReason.NoUriProvided);
      }
      // const panel = window.createWebviewPanel(
      //   "centeredMarkdown", // Identifies the type of the webview. Used internally
      //   "Centered Markdown", // Title of the panel displayed to the user
      //   ViewColumn.Beside, // Editor column to show the new webview panel in : https://code.visualstudio.com/api/extension-guides/webview
      //   {}
      // );
      // // Set the HTML content with your markdown
      // panel.webview.html += `<h1>HELLOOOO<h1>`; 

      await MainExtension.from(context, uri).run();
      DialogManager.displaySuccessNotification();
    } catch (error) {
      DialogManager.displayWarning((error as TerminationError).reason);
    }
  });
  context.subscriptions.push(command);
}

export function deactivate() {}
