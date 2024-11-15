// 每个命令的具体实现和描述
import * as changeCase from 'change-case';
import { COMMAND_LABELS } from '../constant';

export function getCommandDefinitions() {
  return [
    {
      label: COMMAND_LABELS.camelCase,
      description: `camelCase`,
      func: changeCase.camelCase,
    },
    {
      label: COMMAND_LABELS.pascalCase,
      description: `PascalCase`,
      func: changeCase.pascalCase,
    },
    {
      label: COMMAND_LABELS.snakeCase,
      description: `snake_case`,
      func: changeCase.snakeCase,
    },
    {
      label: COMMAND_LABELS.kebabCase,
      description: `kebab-case`,
      func: changeCase.paramCase,
    },
    {
      label: COMMAND_LABELS.constantCase,
      description: `CONSTANT_CASE`,
      func: changeCase.constantCase,
    },
    {
      label: COMMAND_LABELS.capitalCase,
      description: `Capital Case`,
      func: changeCase.capitalCase,
    },

    {
      label: COMMAND_LABELS.dotCase,
      description: `dot.case`,
      func: changeCase.dotCase,
    },
    {
      label: COMMAND_LABELS.noCase,
      description: `no case`,
      func: changeCase.noCase,
    },
    // NOTE: change-case 5.0.0: pascalSnakeCase, eg: Pascal_Snake_Case
    // {
    //   label: COMMAND_LABELS.pascalSnakeCase,
    //   description: 'Pascal_Snake_Case',
    //   func: changeCase.pascalSnakeCase,
    // },
    {
      label: COMMAND_LABELS.pathCase,
      description: `path/case`,
      func: changeCase.pathCase,
    },
    {
      label: COMMAND_LABELS.sentenceCase,
      description: `Sentence case`,
      func: changeCase.sentenceCase,
    },

    {
      label: COMMAND_LABELS.trainCase,
      description: `Train-Case`,
      // change-case 5.0.0: trainCase
      func: changeCase.headerCase,
    },
  ];
}
