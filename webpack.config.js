/* eslint-disable */
const defaultConfig = require( '@wordpress/scripts/config/webpack.config' );
const { getWebpackEntryPoints } = require( '@wordpress/scripts/utils/config' );

const isProduction = process.env.NODE_ENV === 'production';

const filteredDefaultRules = defaultConfig.module.rules.filter( ( rule ) => {
  // keep everything that is **not** the WP default svgr/url-loader rule
  if (
    String( rule.test ) === String( /\.svg$/ ) &&
    String( rule.issuer ) === String( /\.(j|t)sx?$/ ) &&
    Array.isArray( rule.use ) &&
    rule.use.find( (u) =>
      typeof u === 'string'
        ? u.includes( '@svgr/webpack' )
        : u.loader && u.loader.includes( '@svgr/webpack' )
    )
  ) {
    return false; // drop it
  }
  return true; // keep every other rule
} );

const spriteRules = [
  // 2-A:  *.svg?url  →  file in /build/…, return URL string
  {
    test: /\.svg$/i,
    resourceQuery: /url/,          // only when “?url” is present
    type: 'asset/resource',
  },
  // 2-B:  other SVGs imported from code  → SVGR React component
  {
    test: /\.svg$/i,
    issuer: /\.[jt]sx?$/,          // only JS/TS sources
    resourceQuery: { not: [/url/] },
    use: [ '@svgr/webpack' ],
  },
];

module.exports = {
  ...defaultConfig,

  entry: {
    ...getWebpackEntryPoints( 'script' )(),
    'stores/store-rrze-elements-jumpnames': './src/stores/jumpNameStore.ts',
  },

  devtool: isProduction ? false : 'eval-source-map',

  module: {
    ...defaultConfig.module,
    rules: [
      /* our safe SVG rules first … */
      ...spriteRules,
      /* … then everything else from WP (sans the old SVGR rule) */
      ...filteredDefaultRules,

      /* your extra TS + font rules stay unchanged */
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(woff2?|eot|ttf|otf)$/,
        type: 'asset/resource',
        generator: { filename: 'webfonts/[name][ext][query]' },
      },
    ],
  },

  resolve: {
    ...defaultConfig.resolve,
    extensions: [ '.tsx', '.ts', '.js', '.json' ],
  },

  optimization: {
    ...defaultConfig.optimization,
  },

  performance: { ...defaultConfig.performance, hints: false },
};
