<h1 align="center">
  <!-- Logo -->
  <br/>
  Parse-Form
	<br/>

  <!-- Stability -->
  <a href="https://nodejs.org/api/documentation.html#documentation_stability_index">
    <img src="https://img.shields.io/badge/stability-stable-brightgreen.svg" alt="API Stability"/>
  </a>
  <!-- TypeScript -->
  <a href="http://typescriptlang.org">
    <img src="https://img.shields.io/badge/%3C%2F%3E-typescript-blue.svg" alt="TypeScript"/>
  </a>
  <!-- Prettier -->
  <a href="https://github.com/prettier/prettier">
    <img src="https://img.shields.io/badge/styled_with-prettier-ff69b4.svg" alt="Styled with prettier"/>
  </a>
  <!-- Travis build -->
  <a href="https://travis-ci.org/DylanPiercey/parse-form">
  <img src="https://img.shields.io/travis/DylanPiercey/parse-form.svg" alt="Build status"/>
  </a>
  <!-- Coveralls coverage -->
  <a href="https://coveralls.io/github/DylanPiercey/parse-form">
    <img src="https://img.shields.io/coveralls/DylanPiercey/parse-form.svg" alt="Test Coverage"/>
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
    <img src="https://img.shields.io/badge/size-1.26kb-green.svg" alt="Browser Bundle Size"/>
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

`parse(form: HTMLFormElement, shallow: boolean): { body: object, files: object }`
 * Parses a form into a javascript object.
 * If `shallow` is true then nested keys such as a[b][c] won't be expanded.

### Contributions

* Use `npm test` to build and run tests.

Please feel free to create a PR!
