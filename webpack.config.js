//@ts-check

"use strict";

import { resolve as _resolve } from "path";

/**@type {import('webpack').Configuration}*/
const config = {
  target: "node",
  mode: "none",
  entry: "./src/extension.ts",
  output: {
    path: _resolve(__dirname, "dist"),
    filename: "extension.js",
    libraryTarget: "commonjs2",
    devtoolModuleFilenameTemplate: "./[resource-path]",
  },
  devtool: "source-map",
  externals: {
    vscode: "commonjs vscode",
  },
  resolve: {
    alias: {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      "@": _resolve("src"),
    },
    extensions: [".ts", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "ts-loader",
          },
        ],
      },
    ],
  },
};
export default config;
