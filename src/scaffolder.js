import {promises as fs} from 'fs';
import {resolve} from 'path';

export default async function ({buildDirectory, projectRoot}) {
  await fs.copyFile(resolve(__dirname, '..', 'templates', 'netlify.toml'), `${projectRoot}/netlify.toml`);

  return {
    scripts: {
      'predeploy:netlify': 'run-s build',
      'deploy:netlify': `npx --package netlify-cli netlify deploy --dir=${buildDirectory}/`
    },
    vcsIgnore: {directories: ['/.netlify/']}
  };
}
