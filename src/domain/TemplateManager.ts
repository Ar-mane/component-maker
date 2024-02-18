import { Config, Template } from '@/config/types';
import { ConfigLoader } from '@/domain/ConfigLoader';
import { RelativePath } from '@/domain/models/types';
import { TerminateReason, TerminationError } from '@/exceptions/TerminationError';
import { DialogManager } from '@/ui/DialogManager';
import { Files } from '@/utility/Files';
import {
  getResolvedFileContent,
  getTemplateFiles,
  relativePathToTemplate,
} from '@/utility/fileUtility';

export class TemplateManager {
  private configLoader: ConfigLoader;
  private config!: Config;
  private destination: string;

  private constructor(configLoader: ConfigLoader, destination: RelativePath) {
    this.configLoader = configLoader;
    this.destination = destination;
  }

  async run() {
    this.config = await this.configLoader.getConfig();
    const template = await DialogManager.promptTemplateSelection(this.config);
    const componentName = await DialogManager.promptComponentName();
    await this.processTemplate(template, componentName);
  }

  // TODO: NEEDS REWORK
  private async processTemplate(template: Template, componentName: string) {
    const files = await getTemplateFiles(this.config, template);

    await Promise.all(
      files.map(async (file) => {
        return await this.handleFile(template, componentName, file);
      }),
    );
  }

  async handleFile(template: Template, componentName: string, file: string) {
    const componentContent = await getResolvedFileContent(template, file, componentName);

    const relativePath = relativePathToTemplate(this.config, template, file);
    const resolvedPath = this.resolvePath(relativePath, template, componentName);
    const folderTarget = this.determineTargetFolder(relativePath, template);
    const target = Files.join(folderTarget, resolvedPath);

    const resolvedTarget = this.resolvePath(target, template, componentName);

    if (await Files.exist(resolvedTarget)) {
      throw new TerminationError(TerminateReason.ComponentAlreadyExists);
    }

    await Files.writeFile(resolvedTarget, componentContent);
  }

  determineTargetFolder(file: string, template: Template) {
    const specialFile = template.files?.find((e) => e.sourceFile === file); // check not always true , compare path if relative
    if (specialFile) {
      return specialFile.destinationDir;
    }
    if (template.destinationDir) {
      return template.destinationDir;
    }
    return this.destination;
  }

  resolvePath(relativePath: string, template: Template, componentName: string) {
    return relativePath.replace(new RegExp(template.variable, 'g'), componentName);
  }

  // ______ singleton _______
  private static _instance: TemplateManager | null = null;
  public static instance(configLoader: ConfigLoader, destination: RelativePath): TemplateManager {
    if (this._instance === null) {
      this._instance = new TemplateManager(configLoader, destination);
    }
    return this._instance;
  }
  // ____ END singleton _____
}
