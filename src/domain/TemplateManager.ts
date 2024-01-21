import {
  CONFIG_FILE_NAME_IN_WORKSPACE
} from "@/constants/Constants";
import { rootUri, subFolderUri } from "@/utility/Uri";
import { ExtensionContext, Uri } from "vscode";

export class TemplateManager {
  context: ExtensionContext;
  projectConfigFileUri: Uri;
  rootFolder: Uri;

  private constructor(context: ExtensionContext) {
    this.context = context;
    this.rootFolder = rootUri();
    this.projectConfigFileUri = subFolderUri(
      this.rootFolder,
      CONFIG_FILE_NAME_IN_WORKSPACE
    );
  }

  setContext(context: ExtensionContext) {
    this.context = context;
  }

  // ______ singleton _______
  private static instance: TemplateManager | null = null;
  public static from(context: ExtensionContext): TemplateManager {
    if (this.instance === null) {
      this.instance = new TemplateManager(context);
    }
    this.instance.setContext(context);
    return this.instance;
  }
  // ____ END singleton _____
}
