import messages from "@/constants/Message.json";
import { window } from "vscode";

export class DialogManager {
  static async shouldCreateNewConfig() {
    //TODO: needs rework
    const choice = await window.showInformationMessage(
      messages.noConfigFoundInfo,
      ...[messages.noConfigActionCreate, messages.noConfigActionDefault]
    );

    return choice === messages.noConfigActionCreate;
  }
}
