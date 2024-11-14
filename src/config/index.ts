// 每个命令的具体实现和描述
import * as changeCase from 'change-case';
import { COMMAND_LABELS } from '../constant';

export function getCommandDefinitions(descriptionPrefix: string) {
  return [
    {
      label: COMMAND_LABELS.camelCase,
      description: `${descriptionPrefix}: CamelCase`,
      func: changeCase.camelCase
    },
    {
      label: COMMAND_LABELS.capitalCase,
      description: `${descriptionPrefix}: Capital Case`,
      func: changeCase.capitalCase
    },
    {
      label: COMMAND_LABELS.constantCase,
      description: `${descriptionPrefix}: CONSTANT_CASE`,
      func: changeCase.constantCase
    },
    {
      label: COMMAND_LABELS.dotCase,
      description: `${descriptionPrefix}: dot.case`,
      func: changeCase.dotCase
    },
    {
      label: COMMAND_LABELS.kebabCase,
      description: `${descriptionPrefix}: kebab-case`,
      func: changeCase.paramCase
    },
    {
      label: COMMAND_LABELS.noCase,
      description: `${descriptionPrefix}: no case`,
      func: changeCase.noCase
    },
    {
      label: COMMAND_LABELS.pascalCase,
      description: `${descriptionPrefix}: PascalCase`,
      func: changeCase.pascalCase
    },
    // NOTE: change-case 5.0.0: pascalSnakeCase, eg: Pascal_Snake_Case
    // {
    //   label: COMMAND_LABELS.pascalSnakeCase,
    //   description: 'Convert to a underscore-separated string with the first character of every word upper cased',
    //   func: changeCase.pascalSnakeCase,
    // },
    {
      label: COMMAND_LABELS.pathCase,
      description: `${descriptionPrefix}: path/case`,
      func: changeCase.pathCase
    },
    {
      label: COMMAND_LABELS.sentenceCase,
      description: `${descriptionPrefix}: Sentence case`,
      func: changeCase.sentenceCase
    },
    {
      label: COMMAND_LABELS.snakeCase,
      description: `${descriptionPrefix}: snake_case`,
      func: changeCase.snakeCase
    },
    {
      label: COMMAND_LABELS.trainCase,
      description: `${descriptionPrefix}: Train-Case`,
      // change-case 5.0.0: trainCase
      func: changeCase.headerCase
    }
  ];
}
