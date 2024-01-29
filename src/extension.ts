import { MC_MAIN_CMD } from "@/constants/Constants";
import { log } from "@/utility/logger";
import { ExtensionContext, Uri, commands } from "vscode";
import { MainExtension } from "./domain/MainExtension";
import { ExtensionTerminationError } from "./exceptions/ExtensionTerminationError";
import { DialogManager } from "./ui/DialogManager";

export function deactivate() {}

export function activate(context: ExtensionContext) {
  log("Component Maker up");

  const command = commands.registerCommand(MC_MAIN_CMD, (uri?: Uri) => {
    try {
      if (!uri) {
        throw ExtensionTerminationError;
      }
      MainExtension.from(context, uri).run();
      DialogManager.showNotification(true);  //TODO: fix this
    
    } catch (error) {
      if (error instanceof ExtensionTerminationError) {
        //Exit
        DialogManager.showNotification(false, error.reason); // not a good idea tho , using enum as arg s here
      } else {
        console.error(error);
      }
    }
  });

  context.subscriptions.push(command);
}
