import { MC_MAIN_CMD } from "@/constants/Constants";
import { log } from "@/utility/logger";
import { ExtensionContext, Uri, commands } from "vscode";
import { MainExtension } from "./domain/MainExtension";
import {
  TerminationError,
  TerminateReason,
} from "./exceptions/TerminationError";
import { DialogManager } from "./ui/DialogManager";

export function deactivate() {}

export function activate(context: ExtensionContext) {
  log("Component Maker is active");

  const command = commands.registerCommand(MC_MAIN_CMD, (uri?: Uri) => {
    try {
      if (!uri) {
        throw new TerminationError(TerminateReason.NoUriProvided);
      }

      MainExtension.from(context, uri)
        .run()
        .then(() => DialogManager.displaySuccessNotification());
    } catch (error) {
      handleActivationError(error);
    }
  });

  context.subscriptions.push(command);
}

function handleActivationError(error: any) {
  if (error instanceof TerminationError) {
    DialogManager.displayWarning(error.reason);
  } else {
    console.error(error);
  }
}
