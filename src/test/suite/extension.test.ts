import * as assert from 'assert';
import { COMMAND_LABELS, COMMAND_DEFINITIONS } from '../../constant';

suite('Change Case Extension Tests', () => {
  // 测试输入
  const testString = 'hello world test';

  // 测试 camelCase
  test('should convert to `camelCase`', async () => {
    const camelCaseCommand = COMMAND_DEFINITIONS.filter((c) => c.label === COMMAND_LABELS.camelCase)[0];
    assert.strictEqual(camelCaseCommand.func(testString), 'helloWorldTest');
  });

  // 测试 Capital Case
  test('should convert to `Capital Case`', async () => {
    const capitalCaseCommand = COMMAND_DEFINITIONS.filter((c) => c.label === COMMAND_LABELS.capitalCase)[0];
    assert.strictEqual(capitalCaseCommand.func(testString), 'Hello World Test');
  });

  // 测试 CONSTANT_CASE
  test('should convert to `CONSTANT_CASE`', async () => {
    const constantCaseCommand = COMMAND_DEFINITIONS.filter((c) => c.label === COMMAND_LABELS.constantCase)[0];
    assert.strictEqual(constantCaseCommand.func(testString), 'HELLO_WORLD_TEST');
  });

  // 测试 dot.case
  test('should convert to `dot.case`', async () => {
    const dotCaseCommand = COMMAND_DEFINITIONS.filter((c) => c.label === COMMAND_LABELS.dotCase)[0];
    assert.strictEqual(dotCaseCommand.func(testString), 'hello.world.test');
  });

  // 测试 kebab-case
  test('should convert to `kebab-case`', async () => {
    const kebabCaseCommand = COMMAND_DEFINITIONS.filter((c) => c.label === COMMAND_LABELS.kebabCase)[0];
    assert.strictEqual(kebabCaseCommand.func(testString), 'hello-world-test');
  });

  // 测试 no case
  test('should convert to `no case`', async () => {
    const noCaseCommand = COMMAND_DEFINITIONS.filter((c) => c.label === COMMAND_LABELS.noCase)[0];
    assert.strictEqual(noCaseCommand.func(testString), 'hello world test');
  });
  // 测试 PascalCase
  test('should convert to `PascalCase`', async () => {
    const pascalCaseCommand = COMMAND_DEFINITIONS.filter((c) => c.label === COMMAND_LABELS.pascalCase)[0];
    assert.strictEqual(pascalCaseCommand.func(testString), 'HelloWorldTest');
  });

  // 测试 path/case
  test('should convert to `path/case`', async () => {
    const pathCaseCommand = COMMAND_DEFINITIONS.filter((c) => c.label === COMMAND_LABELS.pathCase)[0];
    assert.strictEqual(pathCaseCommand.func(testString), 'hello/world/test');
  });

  // 测试 Sentence case
  test('should convert to `Sentence case`', async () => {
    const sentenceCaseCommand = COMMAND_DEFINITIONS.filter((c) => c.label === COMMAND_LABELS.sentenceCase)[0];
    assert.strictEqual(sentenceCaseCommand.func(testString), 'Hello world test');
  });

  // 测试 snake_case
  test('should convert to `snake_case`', async () => {
    const snakeCaseCommand = COMMAND_DEFINITIONS.filter((c) => c.label === COMMAND_LABELS.snakeCase)[0];
    assert.strictEqual(snakeCaseCommand.func(testString), 'hello_world_test');
  });

  // 测试 Train-Case
  test('should convert to `Train-Case`', async () => {
    const trainCaseCommand = COMMAND_DEFINITIONS.filter((c) => c.label === COMMAND_LABELS.trainCase)[0];
    assert.strictEqual(trainCaseCommand.func(testString), 'Hello-World-Test');
  });

});
