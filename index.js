'use strict'

var _clickTarget = null
var qset = require('q-set')
var fset = qset.flat
var validTags = {
  INPUT: true,
  TEXTAREA: true,
  SELECT: true,
  BUTTON: true
}

/**
 * Tracks which button submitted a form last.
 */
window.addEventListener('click', function patchActiveElement (e) {
  var el = e.target
  // Find an <button> element that may have been clicked.
  while (el != null && (el.nodeName !== 'BUTTON' || el.type !== 'submit')) el = el.parentNode
  // Store the button that was clicked.
  _clickTarget = el
})

/**
 * Patch for document.activeElement for safari.
 */
function getActiveElement () {
  if (document.activeElement === document.body) return _clickTarget
  return document.activeElement
}

/*
 * Serialize a html form as JS object.
 *
 * @param {<Form/>} form
 * @returns { Array<Array> }
 */
module.exports = function parseForm (form, flat) {
  if (!form || form.nodeName !== 'FORM') {
    throw new Error('Can only parse form elements.')
  }

  var set = flat ? fset : qset
  var isMultiPart = form.enctype === 'multipart/form-data'
  var nodes = form.elements
  var body = {}
  var files = isMultiPart ? {} : undefined

  for (var i = 0, len = nodes.length; i < len; i++) {
    var el = nodes[i]

    // Check if this el should be serialized.
    if (el.disabled || !(el.name && validTags[el.nodeName])) {
      continue
    }

    var name = el.name
    var options = el.options

    switch (el.type) {
      case 'submit':
        // We check if the submit button is active
        // otherwise all type=submit buttons would be serialized.
        if (el === getActiveElement()) set(body, name, el.value)
        break
      case 'checkbox':
      case 'radio':
        if (el.checked) set(body, name, el.value)
        break
      case 'select-one':
        if (el.selectedIndex >= 0) set(body, name, options[el.selectedIndex].value)
        break
      case 'select-multiple':
        var selected = []
        var option
        for (var _a = 0, _lenA = options.length; _a < _lenA; _a++) {
          option = options[_a]
          if (option && option.selected) selected.push(option.value)
        }

        set(body, name, selected)
        break
      case 'file':
        var fileList = el.files
        if (isMultiPart && fileList) {
          for (var _b = 0, _lenB = fileList.length; _b < _lenB; _b++) {
            set(files, name, fileList[_b])
          }
        }
        break
      default:
        set(body, name, el.value)
    }
  }

  return {
    body: body,
    files: files
  }
}
