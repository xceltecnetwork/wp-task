"use strict";

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// A simple implementation of make-array
function makeArray(subject) {
  return Array.isArray(subject) ? subject : [subject];
}

var REGEX_TEST_BLANK_LINE = /^\s+$/;
var REGEX_REPLACE_LEADING_EXCAPED_EXCLAMATION = /^\\!/;
var REGEX_REPLACE_LEADING_EXCAPED_HASH = /^\\#/;
var REGEX_SPLITALL_CRLF = /\r?\n/g; // /foo,
// ./foo,
// ../foo,
// .
// ..

var REGEX_TEST_INVALID_PATH = /^\.*\/|^\.+$/;
var SLASH = '/';
var KEY_IGNORE = typeof Symbol !== 'undefined' ? Symbol["for"]('node-ignore')
/* istanbul ignore next */
: 'node-ignore';

var define = function define(object, key, value) {
  return Object.defineProperty(object, key, {
    value: value
  });
};

var REGEX_REGEXP_RANGE = /([0-z])-([0-z])/g; // Sanitize the range of a regular expression
// The cases are complicated, see test cases for details

var sanitizeRange = function sanitizeRange(range) {
  return range.replace(REGEX_REGEXP_RANGE, function (match, from, to) {
    return from.charCodeAt(0) <= to.charCodeAt(0) ? match // Invalid range (out of order) which is ok for gitignore rules but
    //   fatal for JavaScript regular expression, so eliminate it.
    : '';
  });
}; // > If the pattern ends with a slash,
// > it is removed for the purpose of the following description,
// > but it would only find a match with a directory.
// > In other words, foo/ will match a directory foo and paths underneath it,
// > but will not match a regular file or a symbolic link foo
// >  (this is consistent with the way how pathspec works in general in Git).
// '`foo/`' will not match regular file '`foo`' or symbolic link '`foo`'
// -> ignore-rules will not deal with it, because it costs extra `fs.stat` call
//      you could use option `mark: true` with `glob`
// '`foo/`' should not continue with the '`..`'


var DEFAULT_REPLACER_PREFIX = [// > Trailing spaces are ignored unless they are quoted with backslash ("\")
[// (a\ ) -> (a )
// (a  ) -> (a)
// (a \ ) -> (a  )
/\\?\s+$/, function (match) {
  return match.indexOf('\\') === 0 ? ' ' : '';
}], // replace (\ ) with ' '
[/\\\s/g, function () {
  return ' ';
}], // Escape metacharacters
// which is written down by users but means special for regular expressions.
// > There are 12 characters with special meanings:
// > - the backslash \,
// > - the caret ^,
// > - the dollar sign $,
// > - the period or dot .,
// > - the vertical bar or pipe symbol |,
// > - the question mark ?,
// > - the asterisk or star *,
// > - the plus sign +,
// > - the opening parenthesis (,
// > - the closing parenthesis ),
// > - and the opening square bracket [,
// > - the opening curly brace {,
// > These special characters are often called "metacharacters".
[/[\\^$.|*+(){]/g, function (match) {
  return "\\".concat(match);
}], [// > [abc] matches any character inside the brackets
// >    (in this case a, b, or c);
/\[([^\]/]*)($|\])/g, function (match, p1, p2) {
  return p2 === ']' ? "[".concat(sanitizeRange(p1), "]") : "\\".concat(match);
}], [// > a question mark (?) matches a single character
/(?!\\)\?/g, function () {
  return '[^/]';
}], // leading slash
[// > A leading slash matches the beginning of the pathname.
// > For example, "/*.c" matches "cat-file.c" but not "mozilla-sha1/sha1.c".
// A leading slash matches the beginning of the pathname
/^\//, function () {
  return '^';
}], // replace special metacharacter slash after the leading slash
[/\//g, function () {
  return '\\/';
}], [// > A leading "**" followed by a slash means match in all directories.
// > For example, "**/foo" matches file or directory "foo" anywhere,
// > the same as pattern "foo".
// > "**/foo/bar" matches file or directory "bar" anywhere that is directly
// >   under directory "foo".
// Notice that the '*'s have been replaced as '\\*'
/^\^*\\\*\\\*\\\//, // '**/foo' <-> 'foo'
function () {
  return '^(?:.*\\/)?';
}]];
var DEFAULT_REPLACER_SUFFIX = [// starting
[// there will be no leading '/'
//   (which has been replaced by section "leading slash")
// If starts with '**', adding a '^' to the regular expression also works
/^(?=[^^])/, function startingReplacer() {
  return !/\/(?!$)/.test(this) // > If the pattern does not contain a slash /,
  // >   Git treats it as a shell glob pattern
  // Actually, if there is only a trailing slash,
  //   git also treats it as a shell glob pattern
  ? '(?:^|\\/)' // > Otherwise, Git treats the pattern as a shell glob suitable for
  // >   consumption by fnmatch(3)
  : '^';
}], // two globstars
[// Use lookahead assertions so that we could match more than one `'/**'`
/\\\/\\\*\\\*(?=\\\/|$)/g, // Zero, one or several directories
// should not use '*', or it will be replaced by the next replacer
// Check if it is not the last `'/**'`
function (_, index, str) {
  return index + 6 < str.length // case: /**/
  // > A slash followed by two consecutive asterisks then a slash matches
  // >   zero or more directories.
  // > For example, "a/**/b" matches "a/b", "a/x/b", "a/x/y/b" and so on.
  // '/**/'
  ? '(?:\\/[^\\/]+)*' // case: /**
  // > A trailing `"/**"` matches everything inside.
  // #21: everything inside but it should not include the current folder
  : '\\/.+';
}], // intermediate wildcards
[// Never replace escaped '*'
// ignore rule '\*' will match the path '*'
// 'abc.*/' -> go
// 'abc.*'  -> skip this rule
/(^|[^\\]+)\\\*(?=.+)/g, // '*.js' matches '.js'
// '*.js' doesn't match 'abc'
function (_, p1) {
  return "".concat(p1, "[^\\/]*");
}], // trailing wildcard
[/(\^|\\\/)?\\\*$/, function (_, p1) {
  var prefix = p1 // '\^':
  // '/*' does not match ''
  // '/*' does not match everything
  // '\\\/':
  // 'abc/*' does not match 'abc/'
  ? "".concat(p1, "[^/]+") // 'a*' matches 'a'
  // 'a*' matches 'aa'
  : '[^/]*';
  return "".concat(prefix, "(?=$|\\/$)");
}], [// unescape
/\\\\\\/g, function () {
  return '\\';
}]];
var POSITIVE_REPLACERS = [].concat(DEFAULT_REPLACER_PREFIX, [// 'f'
// matches
// - /f(end)
// - /f/
// - (start)f(end)
// - (start)f/
// doesn't match
// - oof
// - foo
// pseudo:
// -> (^|/)f(/|$)
// ending
[// 'js' will not match 'js.'
// 'ab' will not match 'abc'
/(?:[^*/])$/, // 'js*' will not match 'a.js'
// 'js/' will not match 'a.js'
// 'js' will match 'a.js' and 'a.js/'
function (match) {
  return "".concat(match, "(?=$|\\/)");
}]], DEFAULT_REPLACER_SUFFIX);
var NEGATIVE_REPLACERS = [].concat(DEFAULT_REPLACER_PREFIX, [// #24, #38
// The MISSING rule of [gitignore docs](https://git-scm.com/docs/gitignore)
// A negative pattern without a trailing wildcard should not
// re-include the things inside that directory.
// eg:
// ['node_modules/*', '!node_modules']
// should ignore `node_modules/a.js`
[/(?:[^*])$/, function (match) {
  return "".concat(match, "(?=$|\\/$)");
}]], DEFAULT_REPLACER_SUFFIX); // A simple cache, because an ignore rule only has only one certain meaning

var regexCache = Object.create(null); // @param {pattern}

var makeRegex = function makeRegex(pattern, negative, ignorecase) {
  var r = regexCache[pattern];

  if (r) {
    return r;
  }

  var replacers = negative ? NEGATIVE_REPLACERS : POSITIVE_REPLACERS;
  var source = replacers.reduce(function (prev, current) {
    return prev.replace(current[0], current[1].bind(pattern));
  }, pattern);
  return regexCache[pattern] = ignorecase ? new RegExp(source, 'i') : new RegExp(source);
};

var isString = function isString(subject) {
  return typeof subject === 'string';
}; // > A blank line matches no files, so it can serve as a separator for readability.


var checkPattern = function checkPattern(pattern) {
  return pattern && isString(pattern) && !REGEX_TEST_BLANK_LINE.test(pattern) // > A line starting with # serves as a comment.
  && pattern.indexOf('#') !== 0;
};

var splitPattern = function splitPattern(pattern) {
  return pattern.split(REGEX_SPLITALL_CRLF);
};

var IgnoreRule = function IgnoreRule(origin, pattern, negative, regex) {
  _classCallCheck(this, IgnoreRule);

  this.origin = origin;
  this.pattern = pattern;
  this.negative = negative;
  this.regex = regex;
};

var createRule = function createRule(pattern, ignorecase) {
  var origin = pattern;
  var negative = false; // > An optional prefix "!" which negates the pattern;

  if (pattern.indexOf('!') === 0) {
    negative = true;
    pattern = pattern.substr(1);
  }

  pattern = pattern // > Put a backslash ("\") in front of the first "!" for patterns that
  // >   begin with a literal "!", for example, `"\!important!.txt"`.
  .replace(REGEX_REPLACE_LEADING_EXCAPED_EXCLAMATION, '!') // > Put a backslash ("\") in front of the first hash for patterns that
  // >   begin with a hash.
  .replace(REGEX_REPLACE_LEADING_EXCAPED_HASH, '#');
  var regex = makeRegex(pattern, negative, ignorecase);
  return new IgnoreRule(origin, pattern, negative, regex);
};

var throwError = function throwError(message, Ctor) {
  throw new Ctor(message);
};

var checkPath = function checkPath(path, originalPath, doThrow) {
  if (!isString(path)) {
    return doThrow("path must be a string, but got `".concat(originalPath, "`"), TypeError);
  } // We don't know if we should ignore '', so throw


  if (!path) {
    return doThrow("path must not be empty", TypeError);
  } // Check if it is a relative path


  if (checkPath.isNotRelative(path)) {
    var r = '`path.relative()`d';
    return doThrow("path should be a ".concat(r, " string, but got \"").concat(originalPath, "\""), RangeError);
  }

  return true;
};

var isNotRelative = function isNotRelative(path) {
  return REGEX_TEST_INVALID_PATH.test(path);
};

checkPath.isNotRelative = isNotRelative;

checkPath.convert = function (p) {
  return p;
};

var Ignore =
/*#__PURE__*/
function () {
  function Ignore() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$ignorecase = _ref.ignorecase,
        ignorecase = _ref$ignorecase === void 0 ? true : _ref$ignorecase;

    _classCallCheck(this, Ignore);

    this._rules = [];
    this._ignorecase = ignorecase;
    define(this, KEY_IGNORE, true);

    this._initCache();
  }

  _createClass(Ignore, [{
    key: "_initCache",
    value: function _initCache() {
      this._ignoreCache = Object.create(null);
      this._testCache = Object.create(null);
    }
  }, {
    key: "_addPattern",
    value: function _addPattern(pattern) {
      // #32
      if (pattern && pattern[KEY_IGNORE]) {
        this._rules = this._rules.concat(pattern._rules);
        this._added = true;
        return;
      }

      if (checkPattern(pattern)) {
        var rule = createRule(pattern, this._ignorecase);
        this._added = true;

        this._rules.push(rule);
      }
    } // @param {Array<string> | string | Ignore} pattern

  }, {
    key: "add",
    value: function add(pattern) {
      this._added = false;
      makeArray(isString(pattern) ? splitPattern(pattern) : pattern).forEach(this._addPattern, this); // Some rules have just added to the ignore,
      // making the behavior changed.

      if (this._added) {
        this._initCache();
      }

      return this;
    } // legacy

  }, {
    key: "addPattern",
    value: function addPattern(pattern) {
      return this.add(pattern);
    } //          |           ignored : unignored
    // negative |   0:0   |   0:1   |   1:0   |   1:1
    // -------- | ------- | ------- | ------- | --------
    //     0    |  TEST   |  TEST   |  SKIP   |    X
    //     1    |  TESTIF |  SKIP   |  TEST   |    X
    // - SKIP: always skip
    // - TEST: always test
    // - TESTIF: only test if checkUnignored
    // - X: that never happen
    // @param {boolean} whether should check if the path is unignored,
    //   setting `checkUnignored` to `false` could reduce additional
    //   path matching.
    // @returns {TestResult} true if a file is ignored

  }, {
    key: "_testOne",
    value: function _testOne(path, checkUnignored) {
      var ignored = false;
      var unignored = false;

      this._rules.forEach(function (rule) {
        var negative = rule.negative;

        if (unignored === negative && ignored !== unignored || negative && !ignored && !unignored && !checkUnignored) {
          return;
        }

        var matched = rule.regex.test(path);

        if (matched) {
          ignored = !negative;
          unignored = negative;
        }
      });

      return {
        ignored: ignored,
        unignored: unignored
      };
    } // @returns {TestResult}

  }, {
    key: "_test",
    value: function _test(originalPath, cache, checkUnignored, slices) {
      var path = originalPath // Supports nullable path
      && checkPath.convert(originalPath);
      checkPath(path, originalPath, throwError);
      return this._t(path, cache, checkUnignored, slices);
    }
  }, {
    key: "_t",
    value: function _t(path, cache, checkUnignored, slices) {
      if (path in cache) {
        return cache[path];
      }

      if (!slices) {
        // path/to/a.js
        // ['path', 'to', 'a.js']
        slices = path.split(SLASH);
      }

      slices.pop(); // If the path has no parent directory, just test it

      if (!slices.length) {
        return cache[path] = this._testOne(path, checkUnignored);
      }

      var parent = this._t(slices.join(SLASH) + SLASH, cache, checkUnignored, slices); // If the path contains a parent directory, check the parent first


      return cache[path] = parent.ignored // > It is not possible to re-include a file if a parent directory of
      // >   that file is excluded.
      ? parent : this._testOne(path, checkUnignored);
    }
  }, {
    key: "ignores",
    value: function ignores(path) {
      return this._test(path, this._ignoreCache, false).ignored;
    }
  }, {
    key: "createFilter",
    value: function createFilter() {
      var _this = this;

      return function (path) {
        return !_this.ignores(path);
      };
    }
  }, {
    key: "filter",
    value: function filter(paths) {
      return makeArray(paths).filter(this.createFilter());
    } // @returns {TestResult}

  }, {
    key: "test",
    value: function test(path) {
      return this._test(path, this._testCache, true);
    }
  }]);

  return Ignore;
}();

var factory = function factory(options) {
  return new Ignore(options);
};

var returnFalse = function returnFalse() {
  return false;
};

var isPathValid = function isPathValid(path) {
  return checkPath(path && checkPath.convert(path), path, returnFalse);
};

factory.isPathValid = isPathValid; // Fixes typescript

factory["default"] = factory;
module.exports = factory; // Windows
// --------------------------------------------------------------

/* istanbul ignore if  */

if ( // Detect `process` so that it can run in browsers.
typeof process !== 'undefined' && (process.env && process.env.IGNORE_TEST_WIN32 || process.platform === 'win32')) {
  /* eslint no-control-regex: "off" */
  var makePosix = function makePosix(str) {
    return /^\\\\\?\\/.test(str) || /[\0-\x1F"<>\|]+/.test(str) ? str : str.replace(/\\/g, '/');
  };

  checkPath.convert = makePosix; // 'C:\\foo'     <- 'C:\\foo' has been converted to 'C:/'
  // 'd:\\foo'

  var REGIX_IS_WINDOWS_PATH_ABSOLUTE = /^[a-z]:\//i;

  checkPath.isNotRelative = function (path) {
    return REGIX_IS_WINDOWS_PATH_ABSOLUTE.test(path) || isNotRelative(path);
  };
}
