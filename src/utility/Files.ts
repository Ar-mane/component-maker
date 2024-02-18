import { RelativePath } from '@/domain/models/types';
import { TerminateReason, TerminationError } from '@/exceptions/TerminationError';
import * as fs from 'fs-extra';
import path, { sep } from 'path';
import { Uri, workspace } from 'vscode';
export class Files {
  public static get workspace(): Uri {
    if (workspace.workspaceFolders && workspace.workspaceFolders.length > 0) {
      return workspace.workspaceFolders[0].uri;
    }
    throw new TerminationError(TerminateReason.NoWorkSpace);
  }

  static async copyFolder(from: string, to: string = this.workspace.fsPath): Promise<void> {
    await fs.copy(from, to, {
      overwrite: true,
    });
  }

  static toUri(...pathSegments: RelativePath[]) {
    return Uri.joinPath(this.workspace, ...pathSegments);
  }

  static join(...pathSegments: RelativePath[]) {
    return this.sanitise(path.join(...pathSegments));
  }

  static absolute(arg0: string, arg1: RelativePath) {
    return this.sanitise(path.join(arg0, arg1));
  }

  private static sanitise(path: RelativePath) {
    if (path.includes('\\')) {
      return path.split(sep).join('/');
    }
    return path;
  }

  static toRelative(uri: string, relativeTo: string = this.workspace.path): string {
    const relativePath = path.relative(relativeTo, uri);
    return this.sanitise(relativePath);
  }

  static async readFile(path: RelativePath) {
    const fileUri = this.toUri(path);
    const fileContent = await workspace.fs.readFile(fileUri);
    return fileContent.toString();
  }

  static async writeFile(path: RelativePath, content: string) {
    const fileUri = this.toUri(path);
    return await workspace.fs.writeFile(fileUri, new Uint8Array(Buffer.from(content)));
  }

  static async exist(path: RelativePath): Promise<boolean> {
    try {
      await workspace.fs.stat(this.toUri(path));
      return true;
    } catch {
      return false;
    }
  }

  //✅
  static async allFiles(path: RelativePath) {
    const files = await workspace.findFiles(`${path}/**/*.*`);
    return files.map((file) => this.sanitise(workspace.asRelativePath(file)));
  }
}
