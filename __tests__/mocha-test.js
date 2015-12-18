import glob from 'glob';
import { CLIEngine } from 'eslint';
import { assert } from 'chai';

const formatErrors = function(errors) {
  return errors.map((error) => {
    return `${error.line}:${error.column} ${error.message.slice(0, -1)} ${error.ruleId}`;
  }).join('\n');
};

const eslintTestGenerator = function(relativePath, errors = []) {
  const pass = errors.length === 0;

    it(`${relativePath} passes`, function() {
      if (!pass) {
        assert.fail(true, true, formatErrors(errors));
      }
  });
};

const paths = glob.sync('./+(app|test)/**/*.js*');
const engine = new CLIEngine({
  envs: ['node', 'mocha'],
  useEslintrc: true,
});

const results = engine.executeOnFiles(paths).results;

describe('ESLint', function() {
  results.forEach((result) => {
    eslintTestGenerator(result.filePath, result.messages);
  });
});
