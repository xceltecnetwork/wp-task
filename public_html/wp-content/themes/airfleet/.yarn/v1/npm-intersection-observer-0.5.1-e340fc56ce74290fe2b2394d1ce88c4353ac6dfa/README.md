# `IntersectionObserver` polyfill

This library polyfills the native [`IntersectionObserver`](http://w3c.github.io/IntersectionObserver/) API in unsupporting browsers. See the [API documentation](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) for usage information.

- [Installation](#installation)
- [Configuring the polyfill](#configuring-the-polyfill)
- [Browser support](#browser-support)
- [Running the tests](#running-the-tests)

## Installation

You can install the polyfill via npm or by downloading a [zip](https://github.com/w3c/IntersectionObserver/archive/gh-pages.zip) of this repository:

```sh
npm install intersection-observer
```

### Adding the polyfill to your site

The examples below show various ways to add the `IntersectionObserver` polyfill to your site. Be sure to include the polyfill prior to referencing it anywhere in your JavaScript code.

**Using `<script>` tags in the HTML:**

```html
<!-- Load the polyfill first. -->
<script src="path/to/intersection-observer.js"></script>

<!-- Load all other JavaScript. -->
<script src="app.js"></script>
```

**Using a module loader (e.g. Browserify or Webpack):**

```js
// Require the polyfill before requiring any other modules.
require('intersection-observer');

require('./foo.js');
require('./bar.js');
```

## Configuring the polyfill

It's impossible to handle all possible ways a target element could intersect with a root element without resorting to constantly polling the document for intersection changes.

To avoid this extra work and performance penalty, the default configuration of the polyfill optimizes for the most common `IntersectionObserver` use cases, which primarily include target elements intersecting with a root element due to:

- User scrolling.
- Resizing the window.
- Changes to the DOM.

All of the above can be handled without polling the DOM.

There are, however, additional use cases that the default configuration will not detect. These include target elements intersecting with a root element due to:

- CSS changes on `:hover`, `:active`, or `:focus` states.
- CSS changes due to transitions or animations with a long initial delay.
- Resizable `<textarea>` elements that cause other elements to move around.
- Scrolling of non-document elements in browsers that don't support the event capture phase.

If you need to handle any of these use-cases, you can configure the polyfill to poll the document by setting the `POLL_INTERVAL` property. This can be set either globally or on a per-instance basis.

**Enabling polling for all instance:**

To enable polling for all instance, set a value for `POLL_INTERVAL` on the `IntersectionObserver` prototype:


```js
IntersectionObserver.prototype.POLL_INTERVAL = 100; // Time in milliseconds.
```

**Enabling polling for individual instance:**

To enable polling on only specific instances, set a `POLL_INTERVAL` value on the instance itself:

```js
var io = new IntersectionObserver(callback);
io.POLL_INTERVAL = 100; // Time in milliseconds.
io.observe(someTargetElement);
```

**Note:** the `POLL_INTERVAL` property must be set prior to calling the `.observe` method, or the default configuration will be used.

**Ignoring DOM changes**

You can also choose to not check for intersections when the DOM changes by setting an observer's `USE_MUTATION_OBSERVER` property to `false` (either globally on the prototype or per-instance)

```js
IntersectionObserver.prototype.USE_MUTATION_OBSERVER = false; // Globally

// for an instance
var io = new IntersectionObserver(callback);
io.USE_MUTATION_OBSERVER = false;
```

This is recommended in cases where the DOM will update frequently but you know those updates will have no affect on the position or your target elements.

## Browser support

The polyfill has been tested and known to work in the latest version of all browsers.

Legacy support is also possible in very old browsers by including a shim for ES5 as well as the `window.getComputedStyle` method. The easiest way to load the IntersectionObserver polyfill and have it work in the widest range of browsers is via [polyfill.io](https://cdn.polyfill.io/v2/docs/), which will automatically include dependencies where necessary:

```html
<script src="https://polyfill.io/v2/polyfill.min.js?features=IntersectionObserver"></script>
```

With these polyfills, `IntersectionObserver` has been tested an known to work in the following browsers:

<table>
  <tr>
    <td align="center">
      <img src="https://raw.github.com/alrra/browser-logos/39.2.2/src/chrome/chrome_48x48.png" alt="Chrome"><br>
      ???
    </td>
    <td align="center">
      <img src="https://raw.github.com/alrra/browser-logos/39.2.2/src/firefox/firefox_48x48.png" alt="Firefox"><br>
      ???
    </td>
    <td align="center">
      <img src="https://raw.github.com/alrra/browser-logos/39.2.2/src/safari/safari_48x48.png" alt="Safari"><br>
      6+
    </td>
    <td align="center">
      <img src="https://raw.github.com/alrra/browser-logos/39.2.2/src/edge/edge_48x48.png" alt="Edge"><br>
      ???
    </td>
    <td align="center">
      <img src="https://raw.github.com/alrra/browser-logos/39.2.2/src/archive/internet-explorer_7-8/internet-explorer_7-8_48x48.png" alt="Internet Explorer"><br>
      7+
    </td>
    <td align="center">
      <img src="https://raw.github.com/alrra/browser-logos/39.2.2/src/opera/opera_48x48.png" alt="Opera"><br>
      ???
    </td>
    <td align="center">
      <img src="https://raw.github.com/alrra/browser-logos/39.2.2/src/android/android_48x48.png" alt="Android"><br>
      4.4+
    </td>
  </tr>
</table>

## Running the tests

To run the test suite for the `IntersectionObserver` polyfill, open the [`intersection-observer-test.html`](./intersection-observer-test.html) page in the browser of your choice.

If you run the tests in a browser that support `IntersectionObserver` natively, the tests will be run against the native implementation. If it doesn't the tests will be run against the polyfill.
