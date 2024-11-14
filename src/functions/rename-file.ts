import { COMMAND_DEFINITIONS, COMMAND_LABELS } from '../constant';
import { QuickPickItem, Uri, window, workspace, WorkspaceEdit } from 'vscode';
import { basename, extname } from 'path';

/**
 * 重命名文件，直接指定转换方式或通过菜单选择
 * 可在 VS Code 快捷键中绑定和配置默认的转换方式，如：
 * { "key": "ctrl+u ctrl+f", "command": "extension.changeCase.renameFile", "args": "kebab" },
 */
export async function renameFile(variantArg?: keyof typeof COMMAND_LABELS) {
  const activeEditor = window.activeTextEditor;
  if (!activeEditor) {
    return;
  }

  const { uri: sourceUri } = activeEditor.document;
  const fullFileName = basename(sourceUri.fsPath);
  let fileName = fullFileName;
  let fullExt = '';

  // 切分两次扩展名 e.g. file.test.ts -> file & .test.ts
  for (let i = 0; i < 2; i++) {
    const ext = extname(fileName);
    if (!ext.length) {
      break;
    }
    fileName = fileName.slice(0, -ext.length);
    fullExt = `${ext}${fullExt}`;
  }

  let newFileName: string;
  if (variantArg) {
    const variantLabel = COMMAND_LABELS[variantArg];
    const commandDefinition = COMMAND_DEFINITIONS.find((c) => c.label === variantLabel);
    if (!commandDefinition) { return; }
    newFileName = commandDefinition.func(fileName);
  } else {
    const items: QuickPickItem[] = COMMAND_DEFINITIONS.map((c) => ({
      label: c.label,
      description: c.func(fileName)
    }));

    const selectedVariant = await window.showQuickPick(items, {
      title: `Renaming ${fullFileName}`,
      placeHolder: 'Select case variant for file name conversion'
    });
    if (!selectedVariant) {
      return;
    }
    newFileName = selectedVariant.description!;
  }
  const edit = new WorkspaceEdit();
  edit.renameFile(sourceUri, Uri.joinPath(sourceUri, '..', `${newFileName}${fullExt}`));
  await workspace.applyEdit(edit);
}
