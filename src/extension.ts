import { LOG_STARTING, MC_MAIN_CMD } from "@/constants/Constants";
import { makeComponent } from "@/main";
import { log } from "@/utility/logger";
import { ExtensionContext, Uri, commands } from "vscode";

export function deactivate() {}

export function activate(context: ExtensionContext) {
  log(LOG_STARTING);
  const makeComponentRegister = commands.registerCommand(
    MC_MAIN_CMD,
    (uri?: Uri) => makeComponent(context, uri)
  );

  context.subscriptions.push(makeComponentRegister);
}
