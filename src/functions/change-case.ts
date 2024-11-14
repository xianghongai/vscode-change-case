import { QuickPickItem, Range, window } from 'vscode';
import { EOL } from 'os';
import { uniq } from 'lodash';
import { COMMAND_DEFINITIONS } from '../constant';
import {
  compareByEndPosition,
  getSelectedText,
  getSelectedTextIfOnlyOneSelection,
  isRangeSimplyCursorPosition,
  toSelection
} from '../util';

/**
 * 1. 显示命令选择菜单，让用户选择转换方式；
 * 2. 实时预览；
 * 3. 执行选择的转换方式。
 */
export function changeCaseQuickPick() {
  const firstSelectedText = getSelectedTextIfOnlyOneSelection();

  // 如果只有一个选择，显示转换后的预览，否则使用 COMMAND_DEFINITIONS 中的描述
  const items: QuickPickItem[] = COMMAND_DEFINITIONS.map((c) => ({
    label: c.label,
    description: firstSelectedText ? c.func(firstSelectedText) : c.description
  }));

  window
    .showQuickPick(items, {
      placeHolder: 'Select case variant for conversion'
    })
    .then((command) => command && runCommand(command.label));
}

/**
 * 执行所选择的转换方式
 */
export function runCommand(commandLabel: string) {
  const commandDefinition = COMMAND_DEFINITIONS.filter((c) => c.label === commandLabel)[0];
  if (!commandDefinition) {
    return;
  }

  const editor = window.activeTextEditor;
  if (!editor) {
    return;
  }
  const { document, selections } = editor;

  let replacementActions: { text: string; range: Range; replacement: string; offset: number; newRange: Range }[] = [];

  editor
    .edit((editBuilder) => {
      replacementActions = selections.map((selection) => {
        const { text, range } = getSelectedText(selection, document);

        let replacement;
        let offset;

        if (selection.isSingleLine) {
          replacement = commandDefinition.func(text);
          // 可能替换字符串比原字符串短或长，所以计算偏移量和新的选择坐标
          offset = replacement.length - text.length;
        } else {
          const lines = document.getText(range).split(EOL);

          const replacementLines = lines.map((x) => commandDefinition.func(x));
          replacement = replacementLines.reduce((acc, v) => (!acc ? '' : acc + EOL) + v, '');
          offset = replacementLines[replacementLines.length - 1].length - lines[lines.length - 1].length;
        }

        return {
          text,
          range,
          replacement,
          offset,
          newRange: isRangeSimplyCursorPosition(range)
            ? range
            : new Range(
              range.start.line,
              range.start.character,
              range.end.line,
              range.end.character + offset
            )
        };
      });

      replacementActions
        .filter((x) => x.replacement !== x.text)
        .forEach((x) => {
          editBuilder.replace(x.range, x.replacement);
        });
    })
    .then(() => {
      const sortedActions = replacementActions.sort((a, b) => compareByEndPosition(a.newRange, b.newRange));

      // 为了维护基于可能的新替换长度的选择，计算新的范围坐标，考虑到可能的行中较早的编辑
      const lineRunningOffsets = uniq(sortedActions.map((s) => s.range.end.line)).map((lineNumber) => ({
        lineNumber,
        runningOffset: 0
      }));

      const adjustedSelectionCoordinateList = sortedActions.map((s) => {
        const lineRunningOffset = lineRunningOffsets.filter((lro) => lro.lineNumber === s.range.end.line)[0];
        const range = new Range(
          s.newRange.start.line,
          s.newRange.start.character + lineRunningOffset.runningOffset,
          s.newRange.end.line,
          s.newRange.end.character + lineRunningOffset.runningOffset
        );
        lineRunningOffset.runningOffset += s.offset;
        return range;
      });

      // 现在终于设置新创建的选择
      editor.selections = adjustedSelectionCoordinateList.map((r) => toSelection(r));
    });
}
