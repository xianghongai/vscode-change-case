import { QuickPickItem, Uri, window, workspace } from 'vscode';
import { basename, dirname, join } from 'path';
import * as fs from 'fs';
import { getCommandDefinitions } from '../config';

const commandDefinitions = getCommandDefinitions('Rename directory to');

export async function renameDir(uri: Uri) {
  const currentDir = uri.fsPath;

  // 显示选择界面
  const items: QuickPickItem[] = commandDefinitions.map((item) => ({
    label: item.label,
    description: item.func(basename(currentDir))
  }));

  const selectedVariant = await window.showQuickPick(items, {
    title: `Rename ${basename(currentDir)}`,
    placeHolder: 'Select naming format'
  });

  if (!selectedVariant) {
    return;
  }

  try {
    const newDirName = selectedVariant.description!;
    const parentDir = dirname(currentDir);
    const newDirPath = join(parentDir, newDirName);

    // 检查新文件夹名是否已存在
    if (fs.existsSync(newDirPath)) {
      throw new Error('Directory name already exists');
    }

    // 重命名文件夹
    fs.renameSync(currentDir, newDirPath);
    await workspace.saveAll();

    window.showInformationMessage(`Directory renamed to: ${newDirName}`);
  } catch (error) {
    window.showErrorMessage(`Failed to rename directory: ${error instanceof Error ? error.message : String(error)}`);
  }
}
