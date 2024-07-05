import type { Configuration } from 'webpack'

import path from 'path'
import { plugins } from './webpack.plugins'
import { rules } from './webpack.rules'

rules.push({
  test: /\.css$/,
  use: [
    { loader: 'style-loader' },
    { loader: 'css-loader' },
    {
      loader: 'postcss-loader',
      options: { sourceMap: true },
    },
  ],
})

export const rendererConfig: Configuration = {
  module: {
    rules,
  },
  plugins,
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src/renderer/'),
      '@public': path.resolve(__dirname, 'public'),
    },
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css'],
  },
}
