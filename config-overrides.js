const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ReplaceInFileWebpackPlugin = require("replace-in-file-webpack-plugin");
var fs = require("fs");

module.exports = (config, env) => {
  // add in height/width style to html file entrypoint if it is a congress version (fixed size)
  if (process.env.REACT_APP_VERSION == "congress") {
    if (process.env.REACT_APP_DEVICE == "ipad") {
      config.plugins = [
        ...config.plugins,
        new ReplaceInFileWebpackPlugin([
          {
            dir: "build",
            test: /\index.html?$/,
            rules: [
              {
                search: new RegExp(`id="root">`, "g"),
                replace: `id="root" style="height: 1366px; width: 1025px;">`,
              },
            ],
          },
        ]),
      ];
    } else {
      config.plugins = [
        ...config.plugins,
        new ReplaceInFileWebpackPlugin([
          {
            dir: "build",
            test: /\index.html?$/,
            rules: [
              {
                search: new RegExp(`<html id="quiz-container" lang="de">`, "g"),
                replace: `<html id="quiz-container" lang="${
                  process.env.REACT_APP_LANGUAGE || "en"
                }">`,
              },
            ],
          },
        ]),
      ];
    }
  }

  return config;
};
