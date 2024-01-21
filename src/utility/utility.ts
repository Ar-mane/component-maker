import {
  tryToReadDirectory
} from "@/utility/fileUtility";
import { posix } from "path";
import { Uri, workspace } from "vscode";
import path = require("path");

export async function folderWhereToCreateComponent(uri: Uri) {
  if (await tryToReadDirectory(uri.path)) {
    return uri.path;
  }

  return path.dirname(uri.fsPath);
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
