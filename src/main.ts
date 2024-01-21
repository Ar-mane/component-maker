import { Config } from "@/config/types";
import { ExtensionContext, Uri, window } from "vscode";

import {
  fillTemplateByComponentName,
  getTemplateFilesUris,
  isFileExist,
  readFile,
  writeFile,
} from "@/utility/fileUtility";

import { ConfigLoader } from "./domain/ConfigLoader";
import path = require("path");

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
    const loader = ConfigLoader.from(_context);

    const customConfig = await loader.getProperConfig();

    if (!customConfig) {
      return;
    }

    if (!uri) {
      return window.showErrorMessage("No file path found.");
    }

    // const submenuItems = [
    //   {
    //     label: "📄 add component",
    //     detail: "to create a complete next component",
    //     path: "/ss/s/eee/s/e",
    //   },
    //   {
    //     label: "🗃️ add page",
    //     detail: "to create a complete next page",
    //   },
    // ];

    // const selection = await window.showQuickPick(submenuItems);

    // log(`Selected: ${JSON.stringify(selection)}`);

    // const componentName = await window.showInputBox({
    //   prompt: "Component name ?",
    // });

    // if (!componentName) {
    //   return window.showErrorMessage("No component name passed");
    // }

    // const directory = await folderWhereToCreateComponent(uri);

    // if (await componentAlreadyExist(directory, componentName)) {
    //   return window.showErrorMessage(
    //     `component ${componentName} already exist in this folder`
    //   );
    // }

    // writeComponentFiles(customConfig, directory, componentName);
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
        .replace(new RegExp(config.templates[0].variable, "g"), componentName)
  );
  return uri;
};
async function componentAlreadyExist(
  directory: string,
  componentName: string
): Promise<boolean> {
  return await isFileExist(Uri.joinPath(Uri.file(directory), componentName));
}
