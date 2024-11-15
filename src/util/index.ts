import { Position, Range, Selection, TextDocument, window, workspace } from 'vscode';
import { snakeCase } from 'change-case';
import { extname } from 'path';

const CHANGE_CASE_WORD_CHARACTER_REGEX = /([\w_.\-/$]+)/;
const CHANGE_CASE_WORD_CHARACTER_REGEX_WITHOUT_DOT = /([\w_\-/$]+)/;

const FIRST_LETTER_REGEX = /^\w/;
const FIRST_AFTER_UNDER_REGEX = /_([A-Za-z]){1}/g;

/**
 * 将字符串转换为蛇形命名法 (snake_case)，然后将首字母转换为大写，将下划线后的第一个字母转换为大写。
 */
export const snakeUpper = (text: string) => {

  return snakeCase(text)
    .replace(FIRST_LETTER_REGEX, (v) => v.toUpperCase())
    .replace(FIRST_AFTER_UNDER_REGEX, (v) => v.toUpperCase());
};

/**
 * 获取当前只有一个选择时的文本
 */
export function getSelectedTextIfOnlyOneSelection(): string {
  const editor = window.activeTextEditor;

  if (!editor) { return ''; }

  const { document, selection, selections } = editor;

  // 检查是否只有一个选择或选择跨越多行
  if (selections.length > 1 || selection.start.line !== selection.end.line) {
    return '';
  }

  return getSelectedText(selections[0], document).text;
}

/**
 * 获取当前选择范围内的文本
 */
export function getSelectedText(
  selection: Selection,
  document: TextDocument,
): { text: string; range: Range } {
  let range: Range;

  if (isRangeSimplyCursorPosition(selection)) {
    const wordRange = getChangeCaseWordRangeAtPosition(document, selection.end);
    range = wordRange || new Range(selection.start, selection.end);
  } else {
    range = new Range(selection.start, selection.end);
  }

  return {
    text: range ? document.getText(range) || '' : '',
    range,
  };
}

/**
 * 获取当前光标位置范围内的字符
 */
function getChangeCaseWordRangeAtPosition(document: TextDocument, position: Position) {
  const configuration = workspace.getConfiguration('changeCase');
  const includeDotInCurrentWord = configuration ? configuration.get('includeDotInCurrentWord', false) : false;
  const regex = includeDotInCurrentWord
    ? CHANGE_CASE_WORD_CHARACTER_REGEX
    : CHANGE_CASE_WORD_CHARACTER_REGEX_WITHOUT_DOT;

  const range = document.getWordRangeAtPosition(position);
  if (!range) {
    return undefined;
  }

  let startCharacterIndex = range.start.character - 1;
  while (startCharacterIndex >= 0) {
    const charRange = new Range(
      range.start.line,
      startCharacterIndex,
      range.start.line,
      startCharacterIndex + 1,
    );
    const character = document.getText(charRange);
    if (character.search(regex) === -1) {
      // no match
      break;
    }
    startCharacterIndex--;
  }

  const lineMaxColumn = document.lineAt(range.end.line).range.end.character;
  let endCharacterIndex = range.end.character;
  while (endCharacterIndex < lineMaxColumn) {
    const charRange = new Range(range.end.line, endCharacterIndex, range.end.line, endCharacterIndex + 1);
    const character = document.getText(charRange);
    if (character.search(regex) === -1) {
      // no match
      break;
    }
    endCharacterIndex++;
  }

  return new Range(range.start.line, startCharacterIndex + 1, range.end.line, endCharacterIndex);
}

/**
 * 检查是否仅为光标位置，即没有选择任何文本
 */
export function isRangeSimplyCursorPosition(range: Range): boolean {
  return range.start.line === range.end.line && range.start.character === range.end.character;
}

/**
 * 转换之后文本的长度可能有变化，选择范围需要重新计算
 */
export function toSelection(range: Range): Selection {
  return new Selection(range.start.line, range.start.character, range.end.line, range.end.character);
}

/**
 * 比较两个范围或选择的结束位置，
 */
export function compareByEndPosition(a: Range | Selection, b: Range | Selection): number {
  if (a.end.line < b.end.line) {
    return -1;
  }
  if (a.end.line > b.end.line) {
    return 1;
  }
  if (a.end.character < b.end.character) {
    return -1;
  }
  if (a.end.character > b.end.character) {
    return 1;
  }
  return 0;
}

interface FileNameParts {
    fileName: string;
    fullExt: string;
}

/**
 * Extract filename and extension parts
 * @example file.test.ts -> { fileName: "file", fullExt: ".test.ts" }
 */
export function extractFileNameParts(fullFileName: string): FileNameParts {
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

    return { fileName, fullExt };
}
