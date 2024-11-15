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
    description: item.func(basename(currentDir)),
  }));

  const selectedCommand = await window.showQuickPick(items, {
    title: l10n.t('Rename {0}', `${basename(currentDir)}`),
    placeHolder: l10n.t('Select naming format'),
  });

  if (!selectedCommand) {
    return;
  }

  await runCommand(selectedCommand.label, uri);
}

/**
 * 执行重命名操作
 */
async function runCommand(commandLabel: string, uri: Uri) {
  try {
    const commandDefinition = commandDefinitions.find((item) => item.label === commandLabel);

    if (!commandDefinition) {
      return;
    }

    const currentDir = uri.fsPath;
    const parentDir = dirname(currentDir);
    const oldName = basename(currentDir);
    const newDirName = commandDefinition.func(oldName);

    // 如果新名字与旧名字相同，跳过
    if (newDirName === oldName) {
      return;
    }

    const newDirPath = join(parentDir, newDirName);

    // 检查新文件夹名是否已存在
    if (fs.existsSync(newDirPath)) {
      throw new Error(l10n.t('Directory name already exists: {0}', newDirName));
    }

    // 重命名文件夹
    fs.renameSync(currentDir, newDirPath);

    await workspace.saveAll();
  } catch (error) {
    window.showErrorMessage(
      l10n.t('Failed to rename directory: {0}', `${error instanceof Error ? error.message : String(error)}`)
    );
  }
}
