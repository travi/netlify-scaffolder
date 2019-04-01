import {assert} from 'chai';
import any from '@travi/any';
import {scaffold} from '../../src';

suite('scaffolder', () => {
  const buildDirectory = any.string();

  test('that the deploy script is defined', async () => {
    const results = await scaffold({buildDirectory});

    assert.equal(
      results.scripts.deploy,
      `netlify deploy --site=$NETLIFY_SITE_ID --auth=$NETLIFY_ACCESS_TOKEN --dir=${buildDirectory}/ --prod`
    );
    assert.deepEqual(results.devDependencies, ['netlify-cli']);
  });

  test('that the required ci environment variables are listed', async () => {
    const results = await scaffold({buildDirectory});

    assert.deepEqual(results.environmentVariables.ci, ['NETLIFY_SITE_ID', 'NETLIFY_ACCESS_TOKEN']);
  });

  test('that the netlify directory is ignored from version-cpntrol', async () => {
    const results = await scaffold({buildDirectory});

    assert.deepEqual(results.vcsIgnore.directories, ['/.netlify/']);
  });
});
