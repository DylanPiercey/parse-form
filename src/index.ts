import { deep as setDeep, shallow as setShallow } from "q-set";
const validTags = {
  BUTTON: true,
  INPUT: true,
  SELECT: true,
  TEXTAREA: true
};

/**
 * Serialize a html form as JS object.
 */
export function parse(form: HTMLFormElement, shallow?: boolean) {
  if (!form || !(form instanceof HTMLFormElement)) {
    throw new Error("Can only parse form elements.");
  }

  const { enctype, elements } = form;
  const set = shallow ? setShallow : setDeep;
  const isMultiPart = enctype === "multipart/form-data";
  const body: { [x: string]: string | string[] } = {};
  /* istanbul ignore next */

  const files = isMultiPart ? {} : undefined;

  for (const el of elements as any) {
    const { name } = el;
    // Check if this el should be serialized.
    if (el.disabled || !(name && validTags[el.nodeName])) {
      continue;
    }

    switch (el.type) {
      case "submit":
        // We check if the submit button is active
        // otherwise all type=submit buttons would be serialized.
        if (el === getActiveElement()) {
          set(body, name, el.value);
        }
        break;
      case "checkbox":
      case "radio":
        if (el.checked) {
          set(body, name, el.value);
        }
        break;
      case "select-one":
        if (el.selectedIndex >= 0) {
          set(body, name, el.options[el.selectedIndex].value);
        }
        break;
      case "select-multiple":
        const selected: string[] = [];
        for (const option of el.options) {
          if (option && option.selected) {
            selected.push(option.value);
          }
        }

        set(body, name, selected);
        break;
      case "file":
        /* istanbul ignore next */
        if (isMultiPart && el.files) {
          for (const file of el.files) {
            set(files, name, file);
          }
        }
        break;
      default:
        set(body, name, el.value);
    }
  }

  return { body, files };
}

/**
 * Tracks which button submitted a form last.
 * This is a patch for safari which does not properly focus the clicked button.
 */
let clickTarget: HTMLButtonElement = null;
/* istanbul ignore next */
window.addEventListener("click", (e: MouseEvent) => {
  // Ignore canceled events, modified clicks, and right clicks.
  if (
    e.defaultPrevented ||
    e.metaKey ||
    e.ctrlKey ||
    e.shiftKey ||
    e.button !== 0
  ) {
    return;
  }

  let el = e.target as HTMLButtonElement;
  // Find an <button> element that may have been clicked.
  while (el != null && (el.nodeName !== "BUTTON" || el.type !== "submit")) {
    el = el.parentNode as HTMLButtonElement;
  }

  // Store the button that was clicked.
  clickTarget = el;
});

/**
 * Patch for document.activeElement for safari.
 */
/* istanbul ignore next */
function getActiveElement(): Element {
  const el =
    document.activeElement === document.body
      ? clickTarget
      : document.activeElement;
  clickTarget = null;
  return el;
}
