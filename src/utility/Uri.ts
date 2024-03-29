import { posix } from 'path/posix';
import { Uri, workspace } from 'vscode';

export const rootUri = (): Uri => {
  if (workspace.workspaceFolders) {
    return workspace.workspaceFolders[0].uri;
  }
  throw new Error('no workspaceFolders');
};

export const subFolderUri = (uri: Uri, path: string): Uri => {
  var res = uri?.with({
    path: posix.join(uri.path, path),
  });

  return res;
};
