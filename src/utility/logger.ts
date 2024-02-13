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
    let logString: string;
    if (typeof message === "object" && message !== null) {
      // Handle arrays separately
      if (Array.isArray(message)) {
        logString = JSON.stringify(message);
      } else {
        logString = JSON.stringify(message, null, 2); // Add spacing for better readability
      }
    } else {
      // For string, number, and boolean, simply convert to string
      logString = String(message);
    }
    this.logger.appendLine(logString);
    this.logger.show();
  }
}
export function log(message: any) {
  Logger.getInstance().log(message);
}
export default Logger;
