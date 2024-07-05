import CopyPlugin from 'copy-webpack-plugin'
import { config } from 'dotenv'
import Dotenv from 'dotenv-webpack'
import type IForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin'
import path from 'path'

config()
// eslint-disable-next-line @typescript-eslint/no-var-requires
const ForkTsCheckerWebpackPlugin: typeof IForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')

export const plugins = [
  new ForkTsCheckerWebpackPlugin({
    logger: 'webpack-infrastructure',
  }),
  new Dotenv(),
  new CopyPlugin({
    patterns: [
      {
        from: path.resolve(__dirname, 'src/main/icons/'),
        to: path.resolve(__dirname, '.webpack', 'main'),
      },
    ],
  }),
]
