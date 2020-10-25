import {promises as fs} from 'fs';
import {resolve} from 'path';

export default async function ({buildDirectory, projectRoot}) {
  await fs.copyFile(resolve(__dirname, '..', 'templates', 'netlify.toml'), `${projectRoot}/netlify.toml`);

  return {
    scripts: {
      'predeploy:netlify': 'run-s build',
      'deploy:netlify': `npx --package netlify-cli netlify deploy --dir=${buildDirectory}/`
    },
    vcsIgnore: {directories: ['/.netlify/']},
    nextSteps: [
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
  };
}
