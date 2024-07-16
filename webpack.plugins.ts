import CopyPlugin from 'copy-webpack-plugin'
import { config } from 'dotenv'
import Dotenv from 'dotenv-webpack'
import type IForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin'
import os from 'os'
import path from 'path'

const isWindows = os.platform() === 'win32'
const isMac = os.platform() === 'darwin'
const isLinux = os.platform() === 'linux'

function getIconPath() {
  if (isWindows) {
    return path.resolve(__dirname, 'src/main/icons/icon.ico')
  } else if (isMac) {
    return path.resolve(__dirname, 'src/main/icons/icon.icns')
  } else if (isLinux) {
    return path.resolve(__dirname, 'src/main/icons/icon.png')
  }

  return path.resolve(__dirname, 'src/main/icons/icon.png')
}

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
        from: getIconPath(),
        to: path.resolve(__dirname, '.webpack', 'main'),
      },
    ],
  }),
]
