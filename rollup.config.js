const { default: esbuild } = require('rollup-plugin-esbuild');
const copy = require('rollup-plugin-copy-merge');

module.exports = {
  input: 'src/index.ts',
  output: [
    {
      file: './dist/index.js',
      format: 'cjs',
    },
  ],
  plugins: [
    esbuild(),
    copy({
      targets: [
        { src: 'src/nodes/*.html', file: 'dist/index.html' }
      ]
    }),
  ],
};
