import type { Configuration } from 'webpack'

import path from 'path'
import { plugins } from './webpack.plugins'
import { rules } from './webpack.rules'

export const mainConfig: Configuration = {
  /**
   * This is the main entry point for your application, it's the first file
   * that runs in the main process.
   */
  entry: './src/main/index.ts',
  // Put your normal webpack config below here
  module: {
    rules,
  },
  plugins,
  resolve: {
    alias: {
      '@public': path.resolve(__dirname, 'public'),
    },
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css', '.json'],
  },
}
