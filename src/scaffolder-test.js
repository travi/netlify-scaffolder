import {promises as fs} from 'fs';
import {resolve} from 'path';
import {assert} from 'chai';
import any from '@travi/any';
import sinon from 'sinon';
import {scaffold} from './index';

suite('scaffolder', () => {
  let sandbox;
  const buildDirectory = any.string();

  setup(() => {
    sandbox = sinon.createSandbox();

    sandbox.stub(fs, 'copyFile');
  });

  teardown(() => sandbox.restore());

  test('that the deploy script is defined', async () => {
    const results = await scaffold({buildDirectory});

    assert.deepEqual(
      results.scripts,
      {
        'predeploy:netlify': 'run-s build',
        'deploy:netlify': `npx --package netlify-cli netlify deploy --dir=${buildDirectory}/`
      }
    );
  });

  test('that the netlify directory is ignored from version-cpntrol', async () => {
    const results = await scaffold({buildDirectory});

    assert.deepEqual(results.vcsIgnore.directories, ['/.netlify/']);
  });

  test('that the netlify config file is created', async () => {
    const projectRoot = any.string();

    await scaffold({buildDirectory, projectRoot});

    assert.calledWith(
      fs.copyFile,
      resolve(__dirname, '..', 'templates', 'netlify.toml'),
      `${projectRoot}/netlify.toml`
    );
  });

  test('that next-steps are listed for steps not completed by the scaffolder', async () => {
    const results = await scaffold({buildDirectory});

    assert.deepEqual(
      results.nextSteps,
      [
        {
          summary: 'Create a new site through the Netlify web UI',
          description: `- [ ] Set the site name to something more description than the auto-generated one
- [ ] Configure a custom domain`
        },
        {summary: 'Make `NETLIFY_AUTH_TOKEN` available to the deploy step on CI at an account level'},
        {summary: 'Make `NETLIFY_SITE_ID` available to the deploy step on CI at a repository level'},
        {
          summary: 'Redirect the netlify url to the custom url in the `netlify.toml`',
          description: `
\`\`\`toml
[[redirects]]
from = "https://pragmatic-divops.netlify.com/*"
to = "https://pragmatic-divops.dev/:splat"
force = true
\`\`\`
`
        }
      ]
    );
  });
});
