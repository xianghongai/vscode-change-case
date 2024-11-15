import { l10n, QuickPickItem, Uri, window, workspace } from 'vscode';
import { basename, dirname, join } from 'path';
import * as fs from 'fs';
import { getCommandDefinitions } from '../config';

const commandDefinitions = getCommandDefinitions();

export async function renameDir(uri: Uri) {
  const currentDir = uri.fsPath;

  // 显示选择界面
  const items: QuickPickItem[] = commandDefinitions.map((item) => ({
    label: item.label,
    description: item.func(basename(currentDir))
  }));

  const selectedVariant = await window.showQuickPick(items, {
    title: l10n.t('Rename {0}', `${basename(currentDir)}`),
    placeHolder: l10n.t('Select naming format'),
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
      throw new Error(l10n.t('Directory name already exists'));
    }

    // 重命名文件夹
    fs.renameSync(currentDir, newDirPath);
    await workspace.saveAll();

    // window.showInformationMessage(l10n.t('Directory renamed to: {0}', `${newDirName}`));
  } catch (error) {
    window.showErrorMessage(l10n.t('Failed to rename directory: {0}', `${error instanceof Error ? error.message : String(error)}`));
  }
}
