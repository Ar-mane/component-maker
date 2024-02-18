import { ConfigLoader } from '@/domain/ConfigLoader';
import { TemplateManager } from '@/domain/TemplateManager';
import { Files } from '@/utility/Files';
import { getComponentDestincation } from '@/utility/fileUtility';
import { ExtensionContext, Uri } from 'vscode';

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
    const configLoader = ConfigLoader.instance();
    const dest = Files.toRelative(getComponentDestincation(this.uri));
    await TemplateManager.instance(configLoader, Files.toRelative(dest)).run();
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
