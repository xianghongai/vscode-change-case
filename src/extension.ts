import { commands, ExtensionContext } from 'vscode';
import { COMMAND_LABELS } from './constant';
import { changeCaseQuickPick, runCommand as changeCaseRunCommand } from './functions/case-change';
import { copyCaseQuickPick, runCommand as copyCaseRunCommand } from './functions/case-copy';
import { pasteCaseQuickPick, runCommand as pasteCaseRunCommand } from './functions/case-paste';
import { copyDirName } from './functions/copy-dir-name';
import { copyFileName } from './functions/copy-file-name';
import { renameDir } from './functions/rename-dir';
import { renameFile } from './functions/rename-file';

export async function activate({ subscriptions }: ExtensionContext) {
  /* 1. Change Case */
  const changeCaseQuickPickCommand = commands.registerCommand('extension.changeCase.commands', changeCaseQuickPick);

  // Change Case Commands
  const changeToCamelCase = commands.registerCommand('extension.changeCase.camelCase', () => changeCaseRunCommand(COMMAND_LABELS.camelCase));
  const changeToCapitalCase = commands.registerCommand('extension.changeCase.capitalCase', () => changeCaseRunCommand(COMMAND_LABELS.capitalCase));
  const changeToConstantCase = commands.registerCommand('extension.changeCase.constantCase', () => changeCaseRunCommand(COMMAND_LABELS.constantCase));
  const changeToDotCase = commands.registerCommand('extension.changeCase.dotCase', () => changeCaseRunCommand(COMMAND_LABELS.dotCase));
  const changeToKebabCase = commands.registerCommand('extension.changeCase.kebabCase', () => changeCaseRunCommand(COMMAND_LABELS.kebabCase));
  const changeToNoCase = commands.registerCommand('extension.changeCase.noCase', () => changeCaseRunCommand(COMMAND_LABELS.noCase));
  const changeToPascalCase = commands.registerCommand('extension.changeCase.pascalCase', () => changeCaseRunCommand(COMMAND_LABELS.pascalCase));
  const changeToPathCase = commands.registerCommand('extension.changeCase.pathCase', () => changeCaseRunCommand(COMMAND_LABELS.pathCase));
  const changeToSentenceCase = commands.registerCommand('extension.changeCase.sentenceCase', () => changeCaseRunCommand(COMMAND_LABELS.sentenceCase));
  const changeToSnakeCase = commands.registerCommand('extension.changeCase.snakeCase', () => changeCaseRunCommand(COMMAND_LABELS.snakeCase));
  const changeToTrainCase = commands.registerCommand('extension.changeCase.trainCase', () => changeCaseRunCommand(COMMAND_LABELS.trainCase));

  /* 2. Copy Case */
  const copyCaseQuickPickCommand = commands.registerCommand('extension.copyCase.commands', copyCaseQuickPick);
  // Copy Case Commands
  const copyAsCamelCaseCommand = commands.registerCommand('extension.copyCase.camelCase', () => copyCaseRunCommand(COMMAND_LABELS.camelCase));
  const copyAsCapitalCaseCommand = commands.registerCommand('extension.copyCase.capitalCase', () => copyCaseRunCommand(COMMAND_LABELS.capitalCase));
  const copyAsConstantCaseCommand = commands.registerCommand('extension.copyCase.constantCase', () => copyCaseRunCommand(COMMAND_LABELS.constantCase));
  const copyAsDotCaseCommand = commands.registerCommand('extension.copyCase.dotCase', () => copyCaseRunCommand(COMMAND_LABELS.dotCase));
  const copyAsKebabCaseCommand = commands.registerCommand('extension.copyCase.kebabCase', () => copyCaseRunCommand(COMMAND_LABELS.kebabCase));
  const copyAsNoCaseCommand = commands.registerCommand('extension.copyCase.noCase', () => copyCaseRunCommand(COMMAND_LABELS.noCase));
  const copyAsPascalCaseCommand = commands.registerCommand('extension.copyCase.pascalCase', () => copyCaseRunCommand(COMMAND_LABELS.pascalCase));
  const copyAsPathCaseCommand = commands.registerCommand('extension.copyCase.pathCase', () => copyCaseRunCommand(COMMAND_LABELS.pathCase));
  const copyAsSentenceCaseCommand = commands.registerCommand('extension.copyCase.sentenceCase', () => copyCaseRunCommand(COMMAND_LABELS.sentenceCase));
  const copyAsSnakeCaseCommand = commands.registerCommand('extension.copyCase.snakeCase', () => copyCaseRunCommand(COMMAND_LABELS.snakeCase));
  const copyAsTrainCaseCommand = commands.registerCommand('extension.copyCase.trainCase', () => copyCaseRunCommand(COMMAND_LABELS.trainCase));

  /* 3. Paste Case */
  const pasteCaseQuickPickCommand = commands.registerCommand('extension.pasteCase.commands', pasteCaseQuickPick);
  // Paste Case Commands
  const pasteAsCamelCaseCommand = commands.registerCommand('extension.pasteCase.camelCase', () => pasteCaseRunCommand(COMMAND_LABELS.camelCase));
  const pasteAsCapitalCaseCommand = commands.registerCommand('extension.pasteCase.capitalCase', () => pasteCaseRunCommand(COMMAND_LABELS.capitalCase));
  const pasteAsConstantCaseCommand = commands.registerCommand('extension.pasteCase.constantCase', () => pasteCaseRunCommand(COMMAND_LABELS.constantCase));
  const pasteAsDotCaseCommand = commands.registerCommand('extension.pasteCase.dotCase', () => pasteCaseRunCommand(COMMAND_LABELS.dotCase));
  const pasteAsKebabCaseCommand = commands.registerCommand('extension.pasteCase.kebabCase', () => pasteCaseRunCommand(COMMAND_LABELS.kebabCase));
  const pasteAsNoCaseCommand = commands.registerCommand('extension.pasteCase.noCase', () => pasteCaseRunCommand(COMMAND_LABELS.noCase));
  const pasteAsPascalCaseCommand = commands.registerCommand('extension.pasteCase.pascalCase', () => pasteCaseRunCommand(COMMAND_LABELS.pascalCase));
  const pasteAsPathCaseCommand = commands.registerCommand('extension.pasteCase.pathCase', () => pasteCaseRunCommand(COMMAND_LABELS.pathCase));
  const pasteAsSentenceCaseCommand = commands.registerCommand('extension.pasteCase.sentenceCase', () => pasteCaseRunCommand(COMMAND_LABELS.sentenceCase));
  const pasteAsSnakeCaseCommand = commands.registerCommand('extension.pasteCase.snakeCase', () => pasteCaseRunCommand(COMMAND_LABELS.snakeCase));
  const pasteAsTrainCaseCommand = commands.registerCommand('extension.pasteCase.trainCase', () => pasteCaseRunCommand(COMMAND_LABELS.trainCase));

  /* 4. Copy/Rename File/Directory Name */
  const copyFileNameCommand = commands.registerCommand('extension.changeCase.copyFileName', copyFileName);
  const copyDirNameCommand = commands.registerCommand('extension.changeCase.copyDirName', copyDirName);
  const renameFileCommand = commands.registerCommand('extension.changeCase.renameFile', renameFile);
  const renameDirCommand = commands.registerCommand('extension.changeCase.renameDir', renameDir);

  /* x. 注册所有命令 */
  const allCommands = [
    changeCaseQuickPickCommand,
    renameFileCommand,
    renameDirCommand,
    changeToCamelCase,
    changeToCapitalCase,
    changeToConstantCase,
    changeToDotCase,
    changeToKebabCase,
    changeToNoCase,
    changeToPascalCase,
    changeToPathCase,
    changeToSentenceCase,
    changeToSnakeCase,
    changeToTrainCase,
    copyCaseQuickPickCommand,
    copyAsCamelCaseCommand,
    copyAsCapitalCaseCommand,
    copyAsConstantCaseCommand,
    copyAsDotCaseCommand,
    copyAsKebabCaseCommand,
    copyAsNoCaseCommand,
    copyAsPascalCaseCommand,
    copyAsPathCaseCommand,
    copyAsSentenceCaseCommand,
    copyAsSnakeCaseCommand,
    copyAsTrainCaseCommand,
    pasteCaseQuickPickCommand,
    pasteAsCamelCaseCommand,
    pasteAsCapitalCaseCommand,
    pasteAsConstantCaseCommand,
    pasteAsDotCaseCommand,
    pasteAsKebabCaseCommand,
    pasteAsNoCaseCommand,
    pasteAsPascalCaseCommand,
    pasteAsPathCaseCommand,
    pasteAsSentenceCaseCommand,
    pasteAsSnakeCaseCommand,
    pasteAsTrainCaseCommand,
    copyFileNameCommand,
    copyDirNameCommand,
  ];
  subscriptions.push(...allCommands);
}

export function deactivate() {
}
