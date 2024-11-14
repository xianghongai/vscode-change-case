// 所有支持的转换命令标签
import * as changeCase from 'change-case';

// 每个命令的标签
export const COMMAND_LABELS = {
  camelCase: 'CamelCase',
  capitalCase: 'Capital Case',
  constantCase: 'CONSTANT_CASE',
  dotCase: 'dot.case',
  kebabCase: 'kebab-case',
  noCase: 'no case',
  pascalCase: 'PascalCase',
  pathCase: 'path/case',
  sentenceCase: 'Sentence case',
  snakeCase: 'snake_case',
  // pascalSnakeCase: 'Pascal_Snake_Case',
  trainCase: 'Train Case',
};

// 每个命令的具体实现和描述
export const COMMAND_DEFINITIONS = [
  {
    label: COMMAND_LABELS.camelCase,
    description: 'Change case to: CamelCase',
    func: changeCase.camelCase,
  },
  {
    label: COMMAND_LABELS.capitalCase,
    description: 'Change case to: Capital Case',
    func: changeCase.capitalCase,
  },
  {
    label: COMMAND_LABELS.constantCase,
    description: 'Change case to: CONSTANT_CASE',
    func: changeCase.constantCase,
  },
  {
    label: COMMAND_LABELS.dotCase,
    description: 'Change case to: dot.case',
    func: changeCase.dotCase,
  },
  {
    label: COMMAND_LABELS.kebabCase,
    description: 'Change case to: kebab-case',
    func: changeCase.paramCase,
  },
  {
    label: COMMAND_LABELS.noCase,
    description: 'Change case to: no case',
    func: changeCase.noCase,
  },
  {
    label: COMMAND_LABELS.pascalCase,
    description: 'Change case to: PascalCase',
    func: changeCase.pascalCase,
  },
  // NOTE: change-case 5.0.0: pascalSnakeCase, eg: Pascal_Snake_Case
  // {
  //   label: COMMAND_LABELS.pascalSnakeCase,
  //   description: 'Convert to a underscore-separated string with the first character of every word upper cased',
  //   func: changeCase.pascalSnakeCase,
  // },
  {
    label: COMMAND_LABELS.pathCase,
    description: 'Change case to: path/case',
    func: changeCase.pathCase,
  },
  {
    label: COMMAND_LABELS.sentenceCase,
    description: 'Change case to: Sentence case',
    func: changeCase.sentenceCase,
  },
  {
    label: COMMAND_LABELS.snakeCase,
    description: 'Change case to: snake_case',
    func: changeCase.snakeCase,
  },
  {
    label: COMMAND_LABELS.trainCase,
    description: 'Change case to: Train-Case',
    // change-case 5.0.0: trainCase
    func: changeCase.headerCase,
  },
];
