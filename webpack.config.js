const defaultConfig = require( '@wordpress/scripts/config/webpack.config' );

module.exports = {
  ...defaultConfig,
  module: {
    ...defaultConfig.module,
    rules: [
      ...defaultConfig.module.rules,
      {
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      },
    ],
  },
  optimization: {
    ...defaultConfig.optimization,
    splitChunks: {
      chunks: 'all',  // This means even synchronous imports get their own chunks.
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
        svgIcons: {
          test: /svg[\\/]/,
          name: 'svg-icons',
          chunks: 'async',
          reuseExistingChunk: true,
        }
      }
    }
  }
};
