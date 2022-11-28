import { Config } from "@/config/types";
import { ExtensionContext, Uri, window } from "vscode";

import {
  checkIfTemplateFolderExist,
  fillTemplateByComponentName,
  getTemplateFilesUris,
  isFileExist,
  readFile,
  writeFile
} from "@/utility/fileUtility";
import {
  folderWhereToCreateComponent,
  getProperConfig
} from "@/utility/utility";

async function writeComponentFiles(
  config: Config,
  directory: string,
  componentName: string
) {
  const files = await getTemplateFilesUris(config);

  files.map(async (file) => {
    var content = await readFile(file);
    var compContent = await fillTemplateByComponentName(
      config,
      content,
      componentName
    );
    writeFile(
      makeUriForComponent(directory, componentName, file, config),
      compContent
    );
  });
}

export async function makeComponent(_context: ExtensionContext, uri?: Uri) {
  try {
    const customConfig = await getProperConfig();

    if (!(await checkIfTemplateFolderExist(customConfig))) {
      return window.showErrorMessage("No template folder found");
    }

    if (!uri) {
      return window.showErrorMessage("No file path found.");
    }

    const componentName = await window.showInputBox({
      prompt: "Component name ?",
    });

    if (!componentName) {
      return window.showErrorMessage("No component name passed");
    }

    const directory = await folderWhereToCreateComponent(uri);

    if (await componentAlreadyExist(directory, componentName)) {
      return window.showErrorMessage(
        `component ${componentName} already exist in this folder`
      );
    }

    writeComponentFiles(customConfig, directory, componentName);
  } catch (e) {
    console.error(e);
  }
}
const makeUriForComponent = (
  directory: string,
  componentName: string,
  template: Uri,
  config: Config
): Uri => {
  var uri = Uri.file(
    directory +
      template.path
        .split(config.templateFolder)[1]
        .replace(new RegExp(config.templateComponentName, "g"), componentName)
  );
  return uri;
};
async function componentAlreadyExist(
  directory: string,
  componentName: string
): Promise<boolean> {
  return await isFileExist(Uri.joinPath(Uri.file(directory), componentName));
}
