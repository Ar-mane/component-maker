import { ExtensionContext, Uri } from "vscode";
import { ConfigLoader } from "./ConfigLoader";
import { TemplateManager } from "./TemplateManager";

export class MainExtension {
  private context: ExtensionContext;
  private uri: Uri;

  private constructor(context: ExtensionContext, uri: Uri) {
    this.context = context;
    this.uri = uri;
  }

  private setContext(context: ExtensionContext) {
    this.context = context;
  }

  async run() {
    const configLoader = ConfigLoader.from(this.uri);
    await TemplateManager.from(configLoader).run();
  }

  // ______ singleton _______
  private static instance: MainExtension | null = null;
  public static from(context: ExtensionContext, uri: Uri): MainExtension {
    if (this.instance === null) {
      this.instance = new MainExtension(context, uri);
    }
    this.instance.setContext(context);
    return this.instance;
  }
  // ____ END singleton _____
}
