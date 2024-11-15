import { l10n, QuickPickItem, Uri, window, workspace, WorkspaceEdit } from 'vscode';
import { basename } from 'path';
import { getCommandDefinitions } from '../config';

import { extractFileNameParts } from '../util';

const commandDefinitions = getCommandDefinitions();

export async function renameFile(uri: Uri) {
  const fullFileName = basename(uri.fsPath);
  const { fileName, fullExt } = extractFileNameParts(fullFileName);

  const items: QuickPickItem[] = commandDefinitions.map((item) => ({
    label: item.label,
    description: item.func(fileName),
  }));

  const selectedCommand = await window.showQuickPick(items, {
    title: l10n.t('Rename {0}', `${fullFileName}`),
    placeHolder: l10n.t('Select naming format'),
  });

  if (!selectedCommand) {
    return;
  }

  await runCommand(selectedCommand.label, uri, fullExt);
}

async function runCommand(commandLabel: string, uri: Uri, fullExt: string) {
  try {
    const commandDefinition = commandDefinitions.find((item) => item.label === commandLabel);

    if (!commandDefinition) {
      return;
    }

    const fullFileName = basename(uri.fsPath);
    const { fileName } = extractFileNameParts(fullFileName);
    const newFileName = `${commandDefinition.func(fileName)}${fullExt}`;

    // If the new name is the same as the old name, skip
    if (newFileName === fileName) {
      return;
    }

    const edit = new WorkspaceEdit();
    edit.renameFile(uri, Uri.joinPath(uri, '..', newFileName));
    await workspace.applyEdit(edit);
  } catch (error) {
    window.showErrorMessage(
      l10n.t('Failed to rename file: {0}', `${error instanceof Error ? error.message : String(error)}`)
    );
  }
}
