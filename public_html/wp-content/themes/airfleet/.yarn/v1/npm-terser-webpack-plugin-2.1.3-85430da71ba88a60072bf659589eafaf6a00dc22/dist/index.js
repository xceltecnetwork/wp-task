"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _crypto = _interopRequireDefault(require("crypto"));

var _path = _interopRequireDefault(require("path"));

var _sourceMap = require("source-map");

var _webpackSources = require("webpack-sources");

var _RequestShortener = _interopRequireDefault(require("webpack/lib/RequestShortener"));

var _webpack = require("webpack");

var _schemaUtils = _interopRequireDefault(require("schema-utils"));

var _serializeJavascript = _interopRequireDefault(require("serialize-javascript"));

var _package = _interopRequireDefault(require("terser/package.json"));

var _options = _interopRequireDefault(require("./options.json"));

var _TaskRunner = _interopRequireDefault(require("./TaskRunner"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const warningRegex = /\[.+:([0-9]+),([0-9]+)\]/;

class TerserPlugin {
  constructor(options = {}) {
    (0, _schemaUtils.default)(_options.default, options, {
      name: 'Terser Plugin',
      baseDataPath: 'options'
    });
    const {
      minify,
      terserOptions = {},
      test = /\.m?js(\?.*)?$/i,
      chunkFilter = () => true,
      warningsFilter = () => true,
      extractComments = true,
      sourceMap,
      cache = true,
      cacheKeys = defaultCacheKeys => defaultCacheKeys,
      parallel = true,
      include,
      exclude
    } = options;
    this.options = {
      test,
      chunkFilter,
      warningsFilter,
      extractComments,
      sourceMap,
      cache,
      cacheKeys,
      parallel,
      include,
      exclude,
      minify,
      terserOptions
    };
  }

  static isSourceMap(input) {
    // All required options for `new SourceMapConsumer(...options)`
    // https://github.com/mozilla/source-map#new-sourcemapconsumerrawsourcemap
    return Boolean(input && input.version && input.sources && Array.isArray(input.sources) && typeof input.mappings === 'string');
  }

  static buildSourceMap(inputSourceMap) {
    if (!inputSourceMap || !TerserPlugin.isSourceMap(inputSourceMap)) {
      return null;
    }

    return new _sourceMap.SourceMapConsumer(inputSourceMap);
  }

  static buildError(error, file, sourceMap, requestShortener) {
    // Handling error which should have line, col, filename and message
    if (error.line) {
      const original = sourceMap && sourceMap.originalPositionFor({
        line: error.line,
        column: error.col
      });

      if (original && original.source && requestShortener) {
        return new Error(`${file} from Terser\n${error.message} [${requestShortener.shorten(original.source)}:${original.line},${original.column}][${file}:${error.line},${error.col}]`);
      }

      return new Error(`${file} from Terser\n${error.message} [${file}:${error.line},${error.col}]`);
    } else if (error.stack) {
      return new Error(`${file} from Terser\n${error.stack}`);
    }

    return new Error(`${file} from Terser\n${error.message}`);
  }

  static buildWarning(warning, file, sourceMap, requestShortener, warningsFilter) {
    let warningMessage = warning;
    let locationMessage = '';
    let source = null;

    if (sourceMap) {
      const match = warningRegex.exec(warning);

      if (match) {
        const line = +match[1];
        const column = +match[2];
        const original = sourceMap.originalPositionFor({
          line,
          column
        });

        if (original && original.source && original.source !== file && requestShortener) {
          ({
            source
          } = original);
          warningMessage = `${warningMessage.replace(warningRegex, '')}`;
          locationMessage = `[${requestShortener.shorten(original.source)}:${original.line},${original.column}]`;
        }
      }
    }

    if (warningsFilter && !warningsFilter(warning, source)) {
      return null;
    }

    return `Terser Plugin: ${warningMessage}${locationMessage}`;
  }

  static removeQueryString(filename) {
    let targetFilename = filename;
    const queryStringIdx = targetFilename.indexOf('?');

    if (queryStringIdx >= 0) {
      targetFilename = targetFilename.substr(0, queryStringIdx);
    }

    return targetFilename;
  }

  static hasAsset(commentFilename, assets) {
    const assetFilenames = Object.keys(assets).map(assetFilename => TerserPlugin.removeQueryString(assetFilename));
    return assetFilenames.includes(TerserPlugin.removeQueryString(commentFilename));
  }

  apply(compiler) {
    this.options.sourceMap = typeof this.options.sourceMap === 'undefined' ? compiler.options.devtool && /^((inline|hidden|nosources)-)?source-?map/.test(compiler.options.devtool) : Boolean(this.options.sourceMap);

    const buildModuleFn = moduleArg => {
      // to get detailed location info about errors
      // eslint-disable-next-line no-param-reassign
      moduleArg.useSourceMap = true;
    };

    const optimizeFn = async (compilation, chunks) => {
      const processedAssets = new WeakSet();

      const matchObject = _webpack.ModuleFilenameHelpers.matchObject.bind( // eslint-disable-next-line no-undefined
      undefined, this.options);

      const additionalChunkAssets = Array.from(compilation.additionalChunkAssets || []);
      const filteredChunks = Array.from(chunks).filter(chunk => this.options.chunkFilter && this.options.chunkFilter(chunk));
      const chunksFiles = filteredChunks.reduce((acc, chunk) => acc.concat(Array.from(chunk.files || [])), []);
      const files = [].concat(additionalChunkAssets).concat(chunksFiles);
      const tasks = [];
      files.forEach(file => {
        if (!matchObject(file)) {
          return;
        }

        let inputSourceMap;
        const asset = compilation.assets[file];

        if (processedAssets.has(asset)) {
          return;
        }

        try {
          let input;

          if (this.options.sourceMap && asset.sourceAndMap) {
            const {
              source,
              map
            } = asset.sourceAndMap();
            input = source;

            if (TerserPlugin.isSourceMap(map)) {
              inputSourceMap = map;
            } else {
              inputSourceMap = map;
              compilation.warnings.push(new Error(`${file} contains invalid source map`));
            }
          } else {
            input = asset.source();
            inputSourceMap = null;
          } // Handling comment extraction


          let commentsFilename = false;

          if (this.options.extractComments) {
            commentsFilename = this.options.extractComments.filename || '[file].LICENSE[query]'; // Todo remove this in next major release

            if (typeof commentsFilename === 'function') {
              commentsFilename = commentsFilename.bind(null, file);
            }

            let query = '';
            let filename = file;
            const querySplit = filename.indexOf('?');

            if (querySplit >= 0) {
              query = filename.substr(querySplit);
              filename = filename.substr(0, querySplit);
            }

            const lastSlashIndex = filename.lastIndexOf('/');
            const basename = lastSlashIndex === -1 ? filename : filename.substr(lastSlashIndex + 1);
            const data = {
              filename,
              basename,
              query
            };
            commentsFilename = compilation.getPath(commentsFilename, data);
          }

          if (commentsFilename && TerserPlugin.hasAsset(commentsFilename, compilation.assets)) {
            // Todo make error and stop uglifing in next major release
            compilation.warnings.push(new Error(`The comment file "${TerserPlugin.removeQueryString(commentsFilename)}" conflicts with an existing asset, this may lead to code corruption, please use a different name`));
          }

          const task = {
            file,
            input,
            inputSourceMap,
            commentsFilename,
            extractComments: this.options.extractComments,
            terserOptions: this.options.terserOptions,
            minify: this.options.minify
          };

          if (this.options.cache) {
            const defaultCacheKeys = {
              terser: _package.default.version,
              // eslint-disable-next-line global-require
              'terser-webpack-plugin': require('../package.json').version,
              'terser-webpack-plugin-options': this.options,
              nodeVersion: process.version,
              filename: file,
              contentHash: _crypto.default.createHash('md4').update(input).digest('hex')
            };
            task.cacheKeys = this.options.cacheKeys(defaultCacheKeys, file);
          }

          tasks.push(task);
        } catch (error) {
          compilation.errors.push(TerserPlugin.buildError(error, file, TerserPlugin.buildSourceMap(inputSourceMap), new _RequestShortener.default(compiler.context)));
        }
      });

      if (tasks.length === 0) {
        return Promise.resolve();
      }

      const taskRunner = new _TaskRunner.default({
        cache: this.options.cache,
        parallel: this.options.parallel
      });
      const completedTasks = await taskRunner.run(tasks);
      await taskRunner.exit();
      completedTasks.forEach((completedTask, index) => {
        const {
          file,
          input,
          inputSourceMap,
          commentsFilename
        } = tasks[index];
        const {
          error,
          map,
          code,
          warnings
        } = completedTask;
        let {
          extractedComments
        } = completedTask;
        let sourceMap = null;

        if (error || warnings && warnings.length > 0) {
          sourceMap = TerserPlugin.buildSourceMap(inputSourceMap);
        } // Handling results
        // Error case: add errors, and go to next file


        if (error) {
          compilation.errors.push(TerserPlugin.buildError(error, file, sourceMap, new _RequestShortener.default(compiler.context)));
          return;
        }

        let outputSource;

        if (map) {
          outputSource = new _webpackSources.SourceMapSource(code, file, JSON.parse(map), input, inputSourceMap, true);
        } else {
          outputSource = new _webpackSources.RawSource(code);
        } // Write extracted comments to commentsFilename


        if (commentsFilename && extractedComments && extractedComments.length > 0) {
          if (commentsFilename in compilation.assets) {
            const commentsFileSource = compilation.assets[commentsFilename].source();
            extractedComments = extractedComments.filter(comment => !commentsFileSource.includes(comment));
          }

          if (extractedComments.length > 0) {
            // Add a banner to the original file
            if (this.options.extractComments.banner !== false) {
              let banner = this.options.extractComments.banner || `For license information please see ${_path.default.relative(_path.default.dirname(file), commentsFilename).replace(/\\/g, '/')}`;

              if (typeof banner === 'function') {
                banner = banner(commentsFilename);
              }

              if (banner) {
                outputSource = new _webpackSources.ConcatSource(`/*! ${banner} */\n`, outputSource);
              }
            }

            const commentsSource = new _webpackSources.RawSource(`${extractedComments.join('\n\n')}\n`);

            if (commentsFilename in compilation.assets) {
              // commentsFile already exists, append new comments...
              if (compilation.assets[commentsFilename] instanceof _webpackSources.ConcatSource) {
                compilation.assets[commentsFilename].add('\n');
                compilation.assets[commentsFilename].add(commentsSource);
              } else {
                // eslint-disable-next-line no-param-reassign
                compilation.assets[commentsFilename] = new _webpackSources.ConcatSource(compilation.assets[commentsFilename], '\n', commentsSource);
              }
            } else {
              // eslint-disable-next-line no-param-reassign
              compilation.assets[commentsFilename] = commentsSource;
            }
          }
        } // Updating assets
        // eslint-disable-next-line no-param-reassign


        processedAssets.add(compilation.assets[file] = outputSource); // Handling warnings

        if (warnings && warnings.length > 0) {
          warnings.forEach(warning => {
            const builtWarning = TerserPlugin.buildWarning(warning, file, sourceMap, new _RequestShortener.default(compiler.context), this.options.warningsFilter);

            if (builtWarning) {
              compilation.warnings.push(builtWarning);
            }
          });
        }
      });
      return Promise.resolve();
    };

    const plugin = {
      name: this.constructor.name
    };
    compiler.hooks.compilation.tap(plugin, compilation => {
      if (this.options.sourceMap) {
        compilation.hooks.buildModule.tap(plugin, buildModuleFn);
      }

      const {
        mainTemplate,
        chunkTemplate
      } = compilation; // Regenerate `contenthash` for minified assets

      for (const template of [mainTemplate, chunkTemplate]) {
        template.hooks.hashForChunk.tap(plugin, hash => {
          const data = (0, _serializeJavascript.default)({
            terser: _package.default.version,
            terserOptions: this.options.terserOptions
          });
          hash.update('TerserPlugin');
          hash.update(data);
        });
      }

      compilation.hooks.optimizeChunkAssets.tapPromise(plugin, optimizeFn.bind(this, compilation));
    });
  }

}

var _default = TerserPlugin;
exports.default = _default;