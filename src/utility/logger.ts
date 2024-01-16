import * as vscode from "vscode";

class Logger {
  private static instance: Logger;
  private logger: vscode.OutputChannel;

  private constructor() {
    this.logger = vscode.window.createOutputChannel("[ Component Maker ]");
  }

  public static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }

    return Logger.instance;
  }

  public log(message: any): void {
    this.logger.appendLine(message);
  }
}
export function log(message: any) {
  Logger.getInstance().log(message);
}
export default Logger;
