export default function ({buildDirectory}) {
  return {
    scripts: {
      deploy: `netlify deploy --site=$NETLIFY_SITE_ID --auth=$NETLIFY_ACCESS_TOKEN --dir=${buildDirectory}/ --prod`
    },
    environmentVariables: {ci: ['NETLIFY_SITE_ID', 'NETLIFY_ACCESS_TOKEN']},
    devDependencies: ['netlify-cli'],
    vcsIgnore: {directories: ['/.netlify/']}
  };
}
