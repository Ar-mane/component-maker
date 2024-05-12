import { ConfigLoader } from '@/domain/ConfigLoader';
import { TemplateManager } from '@/domain/TemplateManager';
import { Files } from '@/utility/Files';
import { getComponentDestincation } from '@/utility/fileUtility';
import { Uri } from 'vscode';

export class MainExtension {
  private uri: Uri;

  private constructor(uri: Uri) {

    this.uri = uri;
  }

  private setUri(uri: Uri) {
    this.uri = uri;
  }

  async run() {
    const configLoader = ConfigLoader.instance();
    const dest = Files.toRelative(getComponentDestincation(this.uri));
    await TemplateManager.instance(configLoader).run(dest);
  }

  // ______ singleton _______
  private static instance: MainExtension | null = null;
  public static from(uri: Uri): MainExtension {
    if (this.instance === null) {
      this.instance = new MainExtension(uri);
    }
    this.instance.setUri(uri);
    return this.instance;
  }
  // ____ END singleton _____
}
