const path = require('path');
const argv = require('yargs').argv;
const chalk = require('chalk');

const projectRoot = path.resolve(__dirname, '../../');

/*
Change the publicPath if site is running in a subfolder on the server.

It's also possible to override this publicPath by using:
yarn build --publicPath=/m/muban-site/

When you don't know the publicPath at build time, you can set `window['webpackPublicPath']` before
loading any script in your HTML.
*/
let publicPath = '/';

if(argv.publicPath){
  publicPath = argv.publicPath;
}

// force leading /
if (!publicPath.startsWith('/')) {
  publicPath = `/${publicPath}`;
}
// force trailing /
if (!publicPath.endsWith('/')) {
  publicPath = `${publicPath}/`;
}

if (publicPath !== '/') {
  console.log('');
  console.log(`${chalk.yellow('Note:')} publicPath set to "${chalk.blue(publicPath)}"`);
  console.log('');
}

const buildTypes = {
  DEVELOPMENT: 'development',
  PRODUCTION: 'production',
};

const versionPath = 'version/' + new Date().getTime() + '/'; // TODO
const staticPath = path.join(projectRoot, 'src/static');
const assetPath = path.join(projectRoot, 'src/asset');
const distPath = path.join(projectRoot, 'dist');
const buildPath = path.join(distPath, 'site');
const aemSharedPath = 'aem/clientlibs/clientlibs-shared/bundle/clientlibs/';
const rawAssetPath = 'aem/clientlibs/clientlibs-site/resources/';
const proxyAssetPath = 'etc.clientlibs/project-name/clientlibs/clientlibs-site/resources/';
const buildAssetPath = path.join(buildPath, rawAssetPath);
const buildProxyAssetPath = path.join(buildPath, proxyAssetPath);

module.exports = {
  buildTypes,

  /* paths */
  projectRoot,
  staticPath,
  distPath,
  buildPath,
  buildAssetPath,
  proxyAssetPath,
  buildProxyAssetPath,
  assetPath,
  rawAssetPath,
  aemSharedPath,

  /* EXPERIMENTAL: enable to generate per-page bundles. For each json file a .js and .css file are generated */
  standaloneOutput: false,

  devServer: {
    port: process.env.PORT || 9000,
    proxyTable: {},
    autoOpenBrowser: false,
    useHttps: false,
  },

  /* non-development builds */
  dist: {
    /* paths */
    publicPath,

    /* optimization */
    enableImageOptimization: true,
    enablePNGQuant: true,  // Best PNG optimizer, but PNGQuant crashes on some images so use with caution.

    /* settings for component building */
    componentRootPath: path.join(projectRoot, 'src/app/component'),
    componentGlobPath: '/**/*.+(ts|scss)',
    componentGlobIgnore: ['**/Abstract*', '**/layout/**/*', '**/_*', '**/icon/**/*']
  },

  /* environment variables (set using DefinePlugin) */
  env: {
    [buildTypes.PRODUCTION]: {
      NODE_ENV: JSON.stringify('production'),
      PUBLIC_PATH: JSON.stringify(publicPath),
    },
    [buildTypes.DEVELOPMENT]: {
      NODE_ENV: JSON.stringify('development'),
      PUBLIC_PATH: JSON.stringify('/'),
    }
  }
};
