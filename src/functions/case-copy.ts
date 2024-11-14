import { env, QuickPickItem, window } from 'vscode';
import { EOL } from 'os';
import { getSelectedText, getSelectedTextIfOnlyOneSelection } from '../util';
import { getCommandDefinitions } from '../config';

const commandDefinitions = getCommandDefinitions('Copy case as');

/**
 * 1. 显示命令选择菜单，让用户选择复制方式；
 * 2. 实时预览；
 * 3. 执行选择的复制方式。
 */
export function copyCaseQuickPick() {
  const firstSelectedText = getSelectedTextIfOnlyOneSelection();

  // 如果只有一个选择，显示转换后的预览，否则使用 COMMAND_DEFINITIONS 中的描述
  const items: QuickPickItem[] = commandDefinitions.map((item) => ({
    label: item.label,
    description: firstSelectedText ? item.func(firstSelectedText) : item.description,
  }));

  window
    .showQuickPick(items, {
      placeHolder: 'Choose a case variant to copy',
    })
    .then((command) => command && runCommand(command.label));
}

/**
 * 执行所选择的复制方式
 */
export function runCommand(commandLabel: string) {
  const commandDefinition = commandDefinitions.filter((item) => item.label === commandLabel)[0];

  if (!commandDefinition) {
    return;
  }

  const editor = window.activeTextEditor;

  if (!editor) {
    return;
  }

  const { document, selections } = editor;

  let texts: string[] = [];

  editor
    .edit(() => {
      texts = selections.map((selection) => {
        const { text, range } = getSelectedText(selection, document);

        if (selection.isSingleLine) {
          // 单行选择 - 直接转换
          return commandDefinition.func(text);
        } else {
          // 多行选择 - 转换每一行
          const lines = document.getText(range).split(EOL);
          return lines.map((line) => commandDefinition.func(line)).join(EOL);
        }
      });
    })
    .then(() => {
      // 完成所有转换后，将结果连接并复制到剪贴板
      const finalText = texts.join(EOL);
      env.clipboard.writeText(finalText);
    });
}
