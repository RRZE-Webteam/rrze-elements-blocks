const defaultConfig = require('@wordpress/scripts/config/webpack.config');

// Check if it's a production build
const isProduction = process.env.NODE_ENV === 'production';

let optimization = defaultConfig.optimization;

if (isProduction) {
  optimization = {
    ...defaultConfig.optimization,
    splitChunks: {
      chunks: 'all',
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
        },
      },
    },
  };
}

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
  optimization: optimization,
};
