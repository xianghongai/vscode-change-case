import { env, l10n, QuickPickItem, window } from 'vscode';
import { EOL } from 'os';
import { getCommandDefinitions } from '../config';

const commandDefinitions = getCommandDefinitions();

/**
 * 1. 显示命令选择菜单，让用户选择粘贴方式；
 * 2. 实时预览；
 * 3. 执行选择的粘贴方式。
 */
export async function pasteCaseQuickPick() {
  const clipboardText = await getClipboardText();

  // 剪贴板为空
  if (!clipboardText) {
    return;
  }

  // 如果剪贴板内容包含多行，使用 description，否则显示转换后的预览
  const hasMultipleLines = clipboardText.includes(EOL);
  const items: QuickPickItem[] = commandDefinitions.map((item) => ({
    label: item.label,
    description: hasMultipleLines ? '' : item.func(clipboardText),
  }));

  window
    .showQuickPick(items, {
      placeHolder: l10n.t('Choose a case variant to paste'),
    })
    .then((command) => command && runCommand(command.label));
}

/**
 * 执行所选择的粘贴方式
 */
export async function runCommand(commandLabel: string) {
  const commandDefinition = commandDefinitions.filter((item) => item.label === commandLabel)[0];

  if (!commandDefinition || !window.activeTextEditor) {
    return;
  }

  const editor = window.activeTextEditor;
  const { selections } = editor;

  // 获取剪贴板内容
  const clipboardText = await getClipboardText();

  if (!clipboardText) {
    return;
  }

  // 按系统换行符分割剪贴板内容
  const lines = clipboardText.split(EOL);

  editor.edit((editBuilder) => {
    selections.forEach((selection, index) => {
      // 循环选择行
      const lineIndex = index % lines.length;
      const textToTransform = lines[lineIndex];

      // 使用选中的转换方式转换文本
      const transformedText = commandDefinition.func(textToTransform);

      // 替换或插入转换后的文本
      if (selection.isEmpty) {
        editBuilder.insert(selection.active, transformedText);
      } else {
        editBuilder.replace(selection, transformedText);
      }
    });
  });
}

async function getClipboardText() {
  return await env.clipboard.readText();
}
