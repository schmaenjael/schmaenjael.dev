/** @type {import('@remix-run/dev').AppConfig} */

module.exports = {
  ignoredRouteFiles: ['**/*.css', '**/*.scss'],
  appDirectory: 'src',
  assetsBuildDirectory: 'build/public/assets',
  serverBuildPath: 'build/index.js',
  publicPath: '/build/',
  routes: async (defineRoutes) =>
    defineRoutes((route) => {
      route('/:lang/', 'routes/$lang/welcome/index.tsx');
    }),
};
