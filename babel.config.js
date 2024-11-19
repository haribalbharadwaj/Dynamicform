module.exports = {
  presets: [
    '@babel/preset-env',
    '@babel/preset-react',
    '@babel/preset-typescript',
  ],
  plugins: [
    '@babel/plugin-transform-runtime',
  ],
  sourceType: 'unambiguous', // This ensures compatibility with both ESM and CommonJS
};
