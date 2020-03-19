export default function ({buildDirectory}) {
  return {
    scripts: {
      'predeploy:netlify': 'run-s build',
      'deploy:netlify': `npx --package netlify-cli netlify deploy --dir=${buildDirectory}/ --prod`
    },
    vcsIgnore: {directories: ['/.netlify/']}
  };
}
