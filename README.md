<h1 align="center">
  <!-- Logo -->
  <br/>
  parse-form
	<br/>

  <!-- Stability -->
  <a href="https://nodejs.org/api/documentation.html#documentation_stability_index">
    <img src="https://img.shields.io/badge/stability-stable-brightgreen.svg" alt="API Stability"/>
  </a>
  <!-- TypeScript -->
  <a href="http://typescriptlang.org">
    <img src="https://img.shields.io/badge/%3C%2F%3E-typescript-blue.svg" alt="TypeScript"/>
  </a>
  <!-- NPM version -->
  <a href="https://npmjs.org/package/parse-form">
    <img src="https://img.shields.io/npm/v/parse-form.svg" alt="NPM Version"/>
  </a>
  <!-- Downloads -->
  <a href="https://npmjs.org/package/parse-form">
    <img src="https://img.shields.io/npm/dm/parse-form.svg" alt="Downloads"/>
  </a>
  <!-- Size -->
  <a href="https://npmjs.org/package/parse-form">
    <img src="https://img.shields.io/badge/size-1.22kb-green.svg" alt="Browser Bundle Size"/>
  </a>
</h1>

Utility convert a form to a javascript object in the way that a browser might.
Supports files, and every type of native input.

# Installation

```console
npm install parse-form
```

# Example

```html
<form id="my-form">
  <input type="text" name="a[b][c]" value="hello world"/>
  <input type="file" name="myFyle" value=.../>
  <button type="submit">Submit</button>
</form>
```

```javascript
import { parse } from "parse-form";

const form = document.getElementById("my-form");
parse(form);
/**
 * {
 *     body: { a: { b: { c: "hello world" } } },
 *     files: { myFile: [...] }
 * }
 */
```

# API

`parse(<Form>, shallow: Boolean)`
 * Parses a form into a javascript object.
 * If `shallow` is true then nested keys such as a[b][c] won't be expanded.

### Contributions

* Use `npm test` to build and run tests.

Please feel free to create a PR!
