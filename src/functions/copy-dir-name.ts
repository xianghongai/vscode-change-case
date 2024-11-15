import { env, l10n, QuickPickItem, Uri, window } from 'vscode';
import { basename } from 'path';
import { getCommandDefinitions } from '../config';

const commandDefinitions = getCommandDefinitions();

export async function copyDirName(uri: Uri) {
  const currentDir = uri.fsPath;

  // 显示选择界面
  const items: QuickPickItem[] = commandDefinitions.map((item) => ({
    label: item.label,
    description: item.func(basename(currentDir)),
  }));

  const selectedCommand = await window.showQuickPick(items, {
    title: l10n.t('Copy Directory Name {0}', `${basename(currentDir)}`),
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
  const commandDefinition = commandDefinitions.find((item) => item.label === commandLabel);

  if (!commandDefinition) {
    return;
  }

  const finalText = commandDefinition.func(basename(uri.fsPath));

  await env.clipboard.writeText(finalText);
}
