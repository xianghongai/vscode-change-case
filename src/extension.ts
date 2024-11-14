import { commands, ExtensionContext } from 'vscode';
import { COMMAND_LABELS } from './constant';
import { changeCaseQuickPick, runCommand } from './functions/change-case';
import { renameFile } from './functions/rename-file';

export async function activate({ subscriptions }: ExtensionContext) {
  const changeCaseQuickPickCommand = commands.registerCommand('extension.changeCase.commands', changeCaseQuickPick);
  const renameFileCommand = commands.registerCommand('extension.changeCase.renameFile', renameFile);
  // Change Case Commands
  const camelCaseCommand = commands.registerCommand('extension.changeCase.camelCase', () => runCommand(COMMAND_LABELS.camelCase));
  const capitalCaseCommand = commands.registerCommand('extension.changeCase.capitalCase', () => runCommand(COMMAND_LABELS.capitalCase));
  const constantCaseCommand = commands.registerCommand('extension.changeCase.constantCase', () => runCommand(COMMAND_LABELS.constantCase));
  const dotCaseCommand = commands.registerCommand('extension.changeCase.dotCase', () => runCommand(COMMAND_LABELS.dotCase));
  const kebabCaseCommand = commands.registerCommand('extension.changeCase.kebabCase', () => runCommand(COMMAND_LABELS.kebabCase));
  const noCaseCommand = commands.registerCommand('extension.changeCase.noCase', () => runCommand(COMMAND_LABELS.noCase));
  const pascalCaseCommand = commands.registerCommand('extension.changeCase.pascalCase', () => runCommand(COMMAND_LABELS.pascalCase));
  // const pascalSnakeCaseCommand = commands.registerCommand('extension.changeCase.pascalSnakeCase', () => runCommand(COMMAND_LABELS.pascalSnakeCase));
  const pathCaseCommand = commands.registerCommand('extension.changeCase.pathCase', () => runCommand(COMMAND_LABELS.pathCase));
  const sentenceCaseCommand = commands.registerCommand('extension.changeCase.sentenceCase', () => runCommand(COMMAND_LABELS.sentenceCase));
  const snakeCaseCommand = commands.registerCommand('extension.changeCase.snakeCase', () => runCommand(COMMAND_LABELS.snakeCase));
  const trainCaseCommand = commands.registerCommand('extension.changeCase.trainCase', () => runCommand(COMMAND_LABELS.trainCase));

  subscriptions.push(changeCaseQuickPickCommand, renameFileCommand, camelCaseCommand, capitalCaseCommand, constantCaseCommand, dotCaseCommand, kebabCaseCommand, noCaseCommand, pascalCaseCommand, pathCaseCommand, sentenceCaseCommand, snakeCaseCommand, trainCaseCommand);
}

export function deactivate() {
}
