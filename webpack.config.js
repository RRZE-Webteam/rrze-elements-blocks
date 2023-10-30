const defaultConfig = require('@wordpress/scripts/config/webpack.config');

// Check if it's a production build
const isProduction = process.env.NODE_ENV === 'production';

let optimization = defaultConfig.optimization;

if (isProduction) {
  optimization = {
    ...defaultConfig.optimization,
    splitChunks: {
      chunks: 'all',
      minSize: 10000,
        maxSize: 249856,
      cacheGroups: {
        svgIcons: {
          test: /svg[\\/]/,
          name: 'svg-icons',
          chunks: 'async',
          reuseExistingChunk: true,
          maxSize: 249856,
        },
      },
    },
  };
}

// Set the devtool based on the build environment
const devtool = isProduction ? false : 'eval-source-map';

module.exports = {
  ...defaultConfig,
  devtool: devtool,
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
  performance: {
    ...defaultConfig.performance,
    hints: false
  },
};
