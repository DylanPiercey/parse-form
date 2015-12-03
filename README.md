# Parse-Form
Utility convert a form to json in the way that a browser might.
Supports files, and every type of native input.

# Installation

#### Npm
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

```js
var parse = require("parse-form");
var form = document.getElementById("my-form");

parse(form);
/**
 * {
 * 		body: { a: { b: { c: "hello world" } } },
 * 		files: { myFile: [...] }
 * }
 */
```

# API

**parse(<Form>, flat: Boolean)**
 * Parses a form into a javascript object.
 * If flat is true then nested keys such as a[b][c] won't be resolved.

### Contributions

* Use gulp to run tests.

Please feel free to create a PR!
