import * as vscode from 'vscode';

class Logger {
  private static instance: Logger;
  private logger?: vscode.OutputChannel;

  private constructor() {
    if (process.env.NODE_ENV === 'development') {
      this.logger = vscode.window.createOutputChannel('[ Component Maker ]');
    }
  }

  public static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }

    return Logger.instance;
  }

  public log(message: any): void {
    let logString: string;
    if (typeof message === 'object' && message !== null) {
      // Handle arrays separately
      if (Array.isArray(message)) {
        logString = JSON.stringify(message);
      } else {
        logString = JSON.stringify(message, null, 2); // Add spacing for better readability
      }
    } else {
      logString = String(message);
    }
    this.logMessage(logString);
  }

  private logMessage(logString: string) {
    this.logger?.appendLine(logString);
    this.logger?.show();
  }
}
export function log(message: any) {
  Logger.getInstance().log(message);
}
export default Logger;
