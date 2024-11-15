import { l10n, QuickPickItem, Range, window } from 'vscode';
import { EOL } from 'os';
import { uniq } from 'lodash';
import {
  compareByEndPosition,
  getSelectedText,
  getSelectedTextIfOnlyOneSelection,
  isRangeSimplyCursorPosition,
  toSelection,
} from '../util';
import { getCommandDefinitions } from '../config';

const commandDefinitions = getCommandDefinitions();

/**
 * 1. 显示命令选择菜单，让用户选择转换方式；
 * 2. 实时预览；
 * 3. 执行选择的转换方式。
 */
export function changeCaseQuickPick() {
  const firstSelectedText = getSelectedTextIfOnlyOneSelection();

  // 如果只有一个选择，显示转换后的预览，否则使用 COMMAND_DEFINITIONS 中的描述
  const items: QuickPickItem[] = commandDefinitions.map((item) => ({
    label: item.label,
    description: firstSelectedText ? item.func(firstSelectedText) : '',
  }));

  window
    .showQuickPick(items, {
      placeHolder: l10n.t('Choose a case variant to change'),
    })
    .then((command) => command && runCommand(command.label));
}

/**
 * 执行所选择的转换方式
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

  // 存储替换信息
  let replacementActions: { text: string; range: Range; replacement: string; offset: number; newRange: Range }[] = [];

  editor
    .edit((editBuilder) => {
      replacementActions = selections.map((selection) => {
        const { text, range } = getSelectedText(selection, document);
        let replacement;
        let offset;

        // 单行选择
        if (selection.isSingleLine) {
          replacement = commandDefinition.func(text);
          // 可能替换字符串比原字符串短或长，所以计算偏移量和新的选择坐标
          offset = replacement.length - text.length;
        } else {
          // 多行选择
          const lines = document.getText(range).split(EOL);
          const replacementLines = lines.map((line) => commandDefinition.func(line));
          // 将多行替换结果连接起来
          replacement = replacementLines.reduce((acc, line) => (!acc ? '' : acc + EOL) + line, '');
          // 计算偏移量
          offset = replacementLines[replacementLines.length - 1].length - lines[lines.length - 1].length;
        }

        // 返回替换信息
        return {
          text,
          range,
          replacement,
          offset,
          newRange: isRangeSimplyCursorPosition(range)
            ? range
            : new Range(range.start.line, range.start.character, range.end.line, range.end.character + offset),
        };
      });

      // 执行替换
      replacementActions
        .filter((item) => item.replacement !== item.text)
        .forEach((item) => {
          editBuilder.replace(item.range, item.replacement);
        });
    })
    .then(() => {
      // 按结束位置排序，为了计算每行的偏移量
      const sortedActions = replacementActions.sort((a, b) => compareByEndPosition(a.newRange, b.newRange));

      // 计算每行在替换后的偏移量
      const lineRunningOffsets = uniq(sortedActions.map((action) => action.range.end.line)).map((lineNumber) => ({
        lineNumber,
        runningOffset: 0,
      }));

      // 计算新的选择坐标
      const adjustedSelectionCoordinateList = sortedActions.map((action) => {
        const lineRunningOffset = lineRunningOffsets.filter((item) => item.lineNumber === action.range.end.line)[0];
        const range = new Range(
          action.newRange.start.line,
          action.newRange.start.character + lineRunningOffset.runningOffset,
          action.newRange.end.line,
          action.newRange.end.character + lineRunningOffset.runningOffset
        );
        lineRunningOffset.runningOffset += action.offset;

        return range;
      });

      // 设置新的选择坐标
      editor.selections = adjustedSelectionCoordinateList.map((range) => toSelection(range));
    });
}
