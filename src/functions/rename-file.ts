import { l10n, QuickPickItem, Uri, window, workspace, WorkspaceEdit } from 'vscode';
import { basename, extname } from 'path';
import { getCommandDefinitions } from '../config';

const commandDefinitions = getCommandDefinitions();

export async function renameFile(uri: Uri) {
  const fullFileName = basename(uri.fsPath);
  let fileName = fullFileName;
  let fullExt = '';

  // Split extension twice e.g. file.test.ts -> file & .test.ts
  for (let i = 0; i < 2; i++) {
    const ext = extname(fileName);
    if (!ext.length) {
      break;
    }
    fileName = fileName.slice(0, -ext.length);
    fullExt = `${ext}${fullExt}`;
  }

  const items: QuickPickItem[] = commandDefinitions.map((item) => ({
    label: item.label,
    description: item.func(fileName)
  }));

  const selectedVariant = await window.showQuickPick(items, {
    title: l10n.t('Rename {0}', `${fullFileName}`),
    placeHolder: l10n.t('Select naming format'),
  });

  if (!selectedVariant) {
    return;
  }

  try {
    const newFileName = selectedVariant.description!;
    const edit = new WorkspaceEdit();
    edit.renameFile(uri, Uri.joinPath(uri, '..', `${newFileName}${fullExt}`));
    await workspace.applyEdit(edit);

    // window.showInformationMessage(l10n.t('File renamed to: {0}', `${newFileName}${fullExt}`));
  } catch (error) {
    window.showErrorMessage(l10n.t('Failed to rename file: {0}', `${error instanceof Error ? error.message : String(error)}`));
  }
}
