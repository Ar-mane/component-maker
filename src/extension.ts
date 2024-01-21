import { MC_MAIN_CMD } from "@/constants/Constants";
import { log } from "@/utility/logger";
import { ExtensionContext, Uri, commands } from "vscode";
import { MainExtension } from "./domain/MainExtension";

export function deactivate() {}

export function activate(context: ExtensionContext) {
  log("Component Maker up");

  const command = commands.registerCommand(MC_MAIN_CMD, (uri?: Uri) =>
    MainExtension.from(context, uri).run()
  );

  context.subscriptions.push(command);
}
