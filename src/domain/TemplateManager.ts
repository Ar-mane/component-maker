import { Config, Template } from "@/config/types";
import {
  TerminateReason,
  TerminationError,
} from "@/exceptions/TerminationError";
import { DialogManager } from "@/ui/DialogManager";
import { subFolderUri } from "@/utility/Uri";
import {
  calculateRelativePathFromFile,
  getResolvedFileContent,
  getTemplateFilesUris,
  isFileExist,
  writeFile,
} from "@/utility/fileUtility";
import path, { relative } from "path";
import { ExtensionContext, Uri, workspace } from "vscode";
import { ConfigLoader } from "./ConfigLoader";

export class TemplateManager {
  private configLoader: ConfigLoader;
  private config: Config | undefined;

  private constructor(configLoader: ConfigLoader) {
    this.configLoader = configLoader;
  }

  async run() {
    this.config = await this.configLoader.getConfig();
    const template = await DialogManager.promptTemplateSelection(this.config);
    const componentName = await DialogManager.promptComponentName();
    this.processTemplate(template, componentName);
  }

  private async processTemplate(template: Template, componentName: string) {
    const filesURIs = await getTemplateFilesUris(this.config!, template);

    filesURIs.map(async (file) => {
      var componentContent = await getResolvedFileContent(
        template,
        file,
        componentName,
      );

      const relativePath = calculateRelativePathFromFile(
        this.config!,
        template,
        file,
      );
      const folderTarget = this.determineTargetFolder(relativePath, template);

      // TODO , check this , maybe to be somewere else

      const resolvedPath = this.resolvePath(
        relativePath,
        template,
        componentName,
      );
      const target = subFolderUri(folderTarget, resolvedPath);

      const resolvedTarget = this.resolvePath(
        target.fsPath,
        template,
        componentName,
      );
      if (await isFileExist(Uri.file(resolvedTarget))) {
        throw new TerminationError(TerminateReason.ComponentAlreadyExists);
      }

      writeFile(Uri.file(resolvedTarget), componentContent);
    });
  }

  determineTargetFolder(file: string, template: Template) {
    const specialFile = template.files?.find((e) => e.sourceFile === file);
    if (specialFile) {
      return subFolderUri(
        this.configLoader.getWorkspaceUri,
        specialFile.destinationDir,
      );
    }

    if (template.destinationDir) {
      return subFolderUri(
        this.configLoader.getWorkspaceUri,
        template.destinationDir,
      );
    }

    return this.configLoader.destinationUri;
  }

  resolvePath(relativePath: string, template: Template, componentName: string) {
    return relativePath.replace(
      new RegExp(template.variable, "g"),
      componentName,
    );
  }

  // ______ singleton _______
  private static instance: TemplateManager | null = null;
  public static from(configLoader: ConfigLoader): TemplateManager {
    if (this.instance === null) {
      this.instance = new TemplateManager(configLoader);
    }
    return this.instance;
  }
  // ____ END singleton _____
}
