import { ExtensionContext, Uri } from "vscode";
import { ConfigLoader } from "./ConfigLoader";

export class MainExtension {
  private context: ExtensionContext;
  private uri: Uri | undefined;

  private constructor(context: ExtensionContext, uri?: Uri) {
    this.context = context;
    this.uri = uri;
  }

  setContext(context: ExtensionContext) {
    this.context = context;
  }

  async run() {
    const configLoader = ConfigLoader.from(this.context);
    const config = await configLoader.getProperConfig();

    if (!config) {
      return;
    }
    

    // if (!uri) {
    //   return window.showErrorMessage("No file path found.");
    // }
  }

  // ______ singleton _______
  private static instance: MainExtension | null = null;
  public static from(context: ExtensionContext, uri?: Uri): MainExtension {
    if (this.instance === null) {
      this.instance = new MainExtension(context, uri);
    }
    this.instance.setContext(context);
    return this.instance;
  }
  // ____ END singleton _____
}
