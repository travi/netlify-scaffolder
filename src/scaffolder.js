export default function ({buildDirectory}) {
  return {
    scripts: {
      'predeploy:netlify': 'run-s build',
      'deploy:netlify': `netlify deploy --dir=${buildDirectory}/ --prod`
    },
    devDependencies: ['netlify-cli'],
    vcsIgnore: {directories: ['/.netlify/']}
  };
}
