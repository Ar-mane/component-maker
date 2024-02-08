import { Uri, workspace } from "vscode";
import { Config, Template } from "@/config/types";
import path = require("path");
import { existsSync, statSync } from "fs";
import { relative } from "path";

export async function writeFile(uri: Uri, content: string) {
  return workspace.fs.writeFile(uri, new Uint8Array(Buffer.from(content)));
}

export async function readFile(path: Uri) {
  try {
    const file = await workspace.fs.readFile(path);
    return file.toString();
  } catch {
    throw new Error("cant read file content");
  }
}
export const isFileExist = async (uri: Uri): Promise<boolean> => {
  try {
    await workspace.fs.stat(uri);
    return true;
  } catch {
    return false;
  }
};

export function getParentUri(uri: Uri): Uri {
  const isFile = existsSync(uri.fsPath) && statSync(uri.fsPath).isFile();

  const parentPath = isFile ? path.dirname(uri.fsPath) : uri.fsPath;

  return Uri.file(parentPath);
}

export async function getResolvedFileContent(
  template: Template,
  file: Uri,
  componentName: string,
) {
  var content = await readFile(file);
  return content.replace(new RegExp(template.variable, "g"), componentName);
}

export function calculateRelativePathFromFile(
  config: Config,
  template: Template,
  file: Uri,
): string {
  const relativePath = relative(
    `${config.dir}/${template.templateDir}`,
    workspace.asRelativePath(file),
  )
    .split(path.sep)
    .join("/");
  return relativePath;
}

export const getTemplateFilesUris = async (
  config: Config,
  template: Template,
): Promise<Uri[]> =>
  await workspace.findFiles(`${config.dir}/${template.templateDir}/**/*.*`);
