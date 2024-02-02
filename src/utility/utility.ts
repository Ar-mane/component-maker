import {
  tryToReadDirectory
} from "@/utility/fileUtility";
import { posix } from "path";
import { Uri, workspace } from "vscode";
import path = require("path");

// to delete if succeed 

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
