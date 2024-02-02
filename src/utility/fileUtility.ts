import { Uri, workspace } from "vscode";
import { Config, Template } from "@/config/types";
import { generateUriFromRootFilename } from "./utility";
import path = require("path");
import { existsSync, statSync } from "fs";

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
  componentName: string
) {
  var content = await readFile(file);
  return content.replace(new RegExp(template.variable, "g"), componentName);
}

export const getConfigFromUri = async (uri: Uri): Promise<Config> => {
  const readStr = await readFile(uri);
  return JSON.parse(readStr) as Config;
};

export const getTemplateFilesUris = async (
  config: Config,
  template: Template
): Promise<Uri[]> =>
  await workspace.findFiles(
    `${config.templateFolder}/${template.rootFolder}/**/*.*`
  );

export async function tryToReadDirectory(path: string) {
  try {
    const directory = await workspace.fs.readDirectory(Uri.file(path));
    return directory;
  } catch {
    return null;
  }
}
export async function checkIfTemplateFolderExist(config: Config) {
  var templatefolder = generateUriFromRootFilename(config.templateFolder);
  return await isFileExist(templatefolder);
}
