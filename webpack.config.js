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
      // TypeScript loader
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      },
    ],
  },
  // Erweitern Sie die Dateierweiterungen, die Webpack verarbeiten wird
  resolve: {
    ...defaultConfig.resolve,
    extensions: ['.tsx', '.ts', '.js', '.json'],
  },
  optimization: optimization,
};
