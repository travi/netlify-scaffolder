import {assert} from 'chai';
import any from '@travi/any';
import {scaffold} from '../../src';

suite('scaffolder', () => {
  const buildDirectory = any.string();

  test('that the deploy script is defined', async () => {
    const results = await scaffold({buildDirectory});

    assert.deepEqual(
      results.scripts,
      {
        'predeploy:netlify': 'run-s build',
        'deploy:netlify': `netlify deploy --dir=${buildDirectory}/ --prod`
      }
    );
    assert.deepEqual(results.devDependencies, ['netlify-cli']);
  });

  test('that the netlify directory is ignored from version-cpntrol', async () => {
    const results = await scaffold({buildDirectory});

    assert.deepEqual(results.vcsIgnore.directories, ['/.netlify/']);
  });
});
