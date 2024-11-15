import { env, l10n, QuickPickItem, Uri, window } from 'vscode';
import { basename } from 'path';
import { getCommandDefinitions } from '../config';
import { extractFileNameParts } from '../util';

const commandDefinitions = getCommandDefinitions();

export async function copyFileName(uri: Uri) {
  const fullFileName = basename(uri.fsPath);
  const { fileName } = extractFileNameParts(fullFileName);

  const items: QuickPickItem[] = commandDefinitions.map((item) => ({
    label: item.label,
    description: item.func(fileName),
  }));

  const selectedCommand = await window.showQuickPick(items, {
    title: l10n.t('Copy File Name {0}', `${fullFileName}`),
    placeHolder: l10n.t('Select naming format'),
  });

  if (!selectedCommand) {
    return;
  }

  await runCommand(selectedCommand.label, uri);
}

async function runCommand(commandLabel: string, uri: Uri) {
  const commandDefinition = commandDefinitions.find((item) => item.label === commandLabel);

  if (!commandDefinition) {
    return;
  }

  const fullFileName = basename(uri.fsPath);
  const { fileName } = extractFileNameParts(fullFileName);
  const finalText = commandDefinition.func(fileName);

  await env.clipboard.writeText(finalText);
}
