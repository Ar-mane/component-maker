import { Config } from "@/config/types";
import { CONFIG_FILE_NAME_IN_WORKSPACE } from "@/constants/Constants";
import { showNoConfigFileExistPrompt } from "@/ui/Components";
import {
  getConfigFromUri,
  isFileExist,
  tryToReadDirectory,
} from "@/utility/fileUtility";
import { posix } from "path";
import { Uri, workspace } from "vscode";

export const getProperConfig = async (): Promise<Config> => {
  const projectConfigFileUri = generateUriFromRootFilename(
    CONFIG_FILE_NAME_IN_WORKSPACE
  );

  const fileExist = await isFileExist(projectConfigFileUri);

  if (fileExist) {
    return getConfigFromUri(projectConfigFileUri);
  } else {
    return showNoConfigFileExistPrompt(projectConfigFileUri);
  }
};
export async function folderWhereToCreateComponent(uri: Uri) {
  const { path } = uri;
  if (await tryToReadDirectory(path)) {
    return path;
  }
  // its a file
  // removing fileName
  const pathArray = path.split("/");
  pathArray.pop();
  return pathArray.join("/");
}

export const generateUriFromRootFilename = (fileName: string): Uri => {
  let folderUri;

  if (workspace.workspaceFolders) {
    folderUri = workspace.workspaceFolders[0].uri;
    var res = folderUri?.with({
      path: posix.join(folderUri.path, fileName),
    });

    return res;
  }

  throw new Error("no workspaceFolders");
};
