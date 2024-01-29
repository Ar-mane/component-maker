import { Config, Template } from "@/config/types";
import {
  ExtensionTerminationError,
  TerminateReason,
} from "@/exceptions/ExtensionTerminationError";
import { DialogManager } from "@/ui/DialogManager";
import { subFolderUri } from "@/utility/Uri";
import {
  getResolvedFileContent,
  getTemplateFilesUris,
  isFileExist,
  writeFile,
} from "@/utility/fileUtility";
import path, { relative } from "path";
import { ExtensionContext, Uri, workspace } from "vscode";
import { ConfigLoader } from "./ConfigLoader";

export class TemplateManager {
  private context: ExtensionContext;
  private configLoader: ConfigLoader;
  private config: Config | undefined;

  private constructor(context: ExtensionContext, configLoader: ConfigLoader) {
    this.context = context;
    this.configLoader = configLoader;
  }

  private setContext(context: ExtensionContext) {
    this.context = context;
  }

  async run() {
    this.config = await this.configLoader.getProperConfig();
    const template = await DialogManager.propmtTemplateOptions(this.config);
    const componentName = await DialogManager.propmtComponentName();
    this.manageTemplate(template, componentName);
  }

  private async manageTemplate(template: Template, componentName: string) {
    const getWorkspaceUri = this.configLoader.getWorkspaceUri;
    const filesURIs = await getTemplateFilesUris(this.config!, template);

    filesURIs.map(async (file) => {
      var componentContent = await getResolvedFileContent(
        template,
        file,
        componentName
      );

      const relativePath = this.getTemplateFile(file, template);
      const folderTarget = this.getTargetFolder(relativePath, template);

      // TODO check files exceptions destinations  here

      // TODO , check this , maybe to be somewere else

      const resolvedPath = this.resolvePath(
        relativePath,
        template,
        componentName
      );
      const target = subFolderUri(folderTarget, resolvedPath);

      const resolvedTarget = this.resolvePath(
        target.fsPath,
        template,
        componentName
      );
      if (await isFileExist(Uri.file(resolvedTarget))) {
        throw new ExtensionTerminationError(
          TerminateReason.componentAlreadyExist
        );
      }

      writeFile(Uri.file(resolvedTarget), componentContent);
    });
  }

  getTargetFolder(file: string, template: Template) {
    const specialFile = template.files?.find((e) => e.source === file);
    if (specialFile) {
      return subFolderUri(
        this.configLoader.getWorkspaceUri,
        specialFile.destination
      );
    }

    if (template.destination) {
      return subFolderUri(
        this.configLoader.getWorkspaceUri,
        template.destination
      );
    }

    return this.configLoader.destinationUri;
  }

  resolvePath(relativePath: string, template: Template, componentName: string) {
    return relativePath.replace(
      new RegExp(template.variable, "g"),
      componentName
    );
  }
  getTemplateFile(file: Uri, template: Template): string {
    const relativePath = relative(
      `${this.config?.templateFolder}/${template.rootFolder}`,
      workspace.asRelativePath(file)
    )
      .split(path.sep)
      .join("/");
    return relativePath;
  }

  makeUriForComponent(
    context: ExtensionContext,
    template: Template,
    file: Uri,
    componentName: string
  ): import("vscode").Uri {
    throw new Error("Method not implemented.");
  }

  // ______ singleton _______
  private static instance: TemplateManager | null = null;
  public static from(
    context: ExtensionContext,
    configLoader: ConfigLoader
  ): TemplateManager {
    if (this.instance === null) {
      this.instance = new TemplateManager(context, configLoader);
    }
    this.instance.setContext(context);
    return this.instance;
  }
  // ____ END singleton _____
}
