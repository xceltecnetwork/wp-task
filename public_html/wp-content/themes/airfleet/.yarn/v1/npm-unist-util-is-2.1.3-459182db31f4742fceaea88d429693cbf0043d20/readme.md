# unist-util-is

[![Build][build-badge]][build]
[![Coverage][coverage-badge]][coverage]
[![Downloads][downloads-badge]][downloads]
[![Size][size-badge]][size]
[![Sponsors][sponsors-badge]][collective]
[![Backers][backers-badge]][collective]
[![Chat][chat-badge]][chat]

[**unist**][unist] utility to check if a node passes a test.

## Install

[npm][]:

```sh
npm install unist-util-is
```

## Usage

```js
var is = require('unist-util-is')

var node = {type: 'strong'}
var parent = {type: 'paragraph', children: [node]}

function test(node, n) {
  return n === 5
}

is() // => false
is(null, {children: []}) // => false
is(null, node) // => true
is('strong', node) // => true
is('emphasis', node) // => false

is(node, node) // => true
is({type: 'paragraph'}, parent) // => true
is({type: 'strong'}, parent) // => false

is(test, node) // => false
is(test, node, 4, parent) // => false
is(test, node, 5, parent) // => true
```

## API

### `is(test, node[, index, parent[, context]])`

###### Parameters

*   `test` ([`Function`][test], `string`, `Object`, or `Array.<Test>`, optional)
    —  When not given, checks if `node` is a [`Node`][node].
    When `string`, works like passing `node => node.type === test`.
    When `array`, checks if any one of the subtests pass.
    When `object`, checks that all keys in `test` are in `node`,
    and that they have strictly equal values
*   `node` ([`Node`][node]) — Node to check.  `false` is returned
*   `index` (`number`, optional) — [Index][] of `node` in `parent`
*   `parent` ([`Node`][node], optional) — [Parent][] of `node`
*   `context` (`*`, optional) — Context object to invoke `test` with

###### Returns

`boolean` — Whether `test` passed *and* `node` is a [`Node`][node] (object
with `type` set to a non-empty `string`).

#### `function test(node[, index, parent])`

###### Parameters

*   `node` (`Node`) — Node to test
*   `index` (`number?`) — Position of `node` in `parent`
*   `parent` (`Node?`) — Parent of `node`

###### Context

`*` — The to `is` given `context`.

###### Returns

`boolean?` — Whether `node` matches.

## Related

*   [`unist-util-find-after`](https://github.com/syntax-tree/unist-util-find-after)
    — Find a node after another node
*   [`unist-util-find-before`](https://github.com/syntax-tree/unist-util-find-before)
    — Find a node before another node
*   [`unist-util-find-all-after`](https://github.com/syntax-tree/unist-util-find-all-after)
    — Find all nodes after another node
*   [`unist-util-find-all-before`](https://github.com/syntax-tree/unist-util-find-all-before)
    — Find all nodes before another node
*   [`unist-util-find-all-between`](https://github.com/mrzmmr/unist-util-find-all-between)
    — Find all nodes between two nodes
*   [`unist-util-find`](https://github.com/blahah/unist-util-find)
    — Find nodes matching a predicate
*   [`unist-util-filter`](https://github.com/eush77/unist-util-filter)
    — Create a new tree with nodes that pass a check
*   [`unist-util-remove`](https://github.com/eush77/unist-util-remove)
    — Remove nodes from tree

## Contribute

See [`contributing.md` in `syntax-tree/.github`][contributing] for ways to get
started.
See [`support.md`][support] for ways to get help.

This project has a [Code of Conduct][coc].
By interacting with this repository, organisation, or community you agree to
abide by its terms.

## License

[MIT][license] © [Titus Wormer][author]

<!-- Definitions -->

[build-badge]: https://img.shields.io/travis/syntax-tree/unist-util-is.svg

[build]: https://travis-ci.org/syntax-tree/unist-util-is

[coverage-badge]: https://img.shields.io/codecov/c/github/syntax-tree/unist-util-is.svg

[coverage]: https://codecov.io/github/syntax-tree/unist-util-is

[downloads-badge]: https://img.shields.io/npm/dm/unist-util-is.svg

[downloads]: https://www.npmjs.com/package/unist-util-is

[size-badge]: https://img.shields.io/bundlephobia/minzip/unist-util-is.svg

[size]: https://bundlephobia.com/result?p=unist-util-is

[sponsors-badge]: https://opencollective.com/unified/sponsors/badge.svg

[backers-badge]: https://opencollective.com/unified/backers/badge.svg

[collective]: https://opencollective.com/unified

[chat-badge]: https://img.shields.io/badge/join%20the%20community-on%20spectrum-7b16ff.svg

[chat]: https://spectrum.chat/unified/syntax-tree

[npm]: https://docs.npmjs.com/cli/install

[license]: license

[author]: https://wooorm.com

[contributing]: https://github.com/syntax-tree/.github/blob/master/contributing.md

[support]: https://github.com/syntax-tree/.github/blob/master/support.md

[coc]: https://github.com/syntax-tree/.github/blob/master/code-of-conduct.md

[unist]: https://github.com/syntax-tree/unist

[node]: https://github.com/syntax-tree/unist#node

[parent]: https://github.com/syntax-tree/unist#parent-1

[index]: https://github.com/syntax-tree/unist#index

[test]: #function-testnode-index-parent
