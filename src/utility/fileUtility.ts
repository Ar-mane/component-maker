import { Config, Template } from '@/config/types';
import { RelativePath } from '@/domain/models/types';
import { Files } from '@/utility/Files';
import { existsSync, statSync } from 'fs';
import { Uri } from 'vscode';
import path = require('path');

export function getComponentDestincation(uri: Uri): string {
  const isFile = existsSync(uri.path) && statSync(uri.path).isFile();
  const parentPath = isFile ? path.dirname(uri.path) : uri.path;
  return parentPath;
}

export async function getResolvedFileContent(
  template: Template,
  file: RelativePath,
  componentName: string,
) {
  var content = await Files.readFile(file);
  return content.replace(new RegExp(template.variable, 'g'), componentName);
}

export function relativePathToTemplate(
  config: Config,
  template: Template,
  path: RelativePath,
): string {
  return Files.toRelative(path, `${config.dir}/${template.templateDir}`);
}

export const getTemplateFiles = async (config: Config, template: Template): Promise<string[]> =>
  await Files.allFiles(`${config.dir}/${template.templateDir}`);
