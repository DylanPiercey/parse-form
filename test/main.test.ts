import * as assert from "assert";
import { parse } from "../src";

describe("Parse Form", () => {
  it("should error on non forms", () => {
    assert.throws(() => parse(document.body as any));
  });

  it("should parse all inputs on a form", () => {
    document.body.innerHTML = `
      <form action="" id="form">
        <textarea name="field1">text-area text</textarea>
        <select name="field2">
          <option value="1">Option 1</option>
          <option selected value="2">Option 2</option>
        </select>
        <select name="field3" multiple>
          <option value="1">Option 1</option>
          <option value="2">Option 2</option>
          <option selected value="3">Option 3</option>
        </select>
        <input type="file" name="field4"/>
        <input type="checkbox" name="field5" checked value="true"/>
        <input type="radio" name="field6" value="1"/>
        <input type="radio" name="field6" value="2" checked/>
        <input type="text" name="field7" value="input text"/>
        <input type="checkbox" name="field8" checked value="1"/>
        <input type="checkbox" name="field8" value="2"/>
        <input type="checkbox" name="field8" checked value="3"/>
        <input id="submit" type="submit" name="field9" value="1"/>
        <input type="submit" name="field9" value="2"/>
        <input type="text" value="no name"/>
        <input type="text" name="invalid" value="disabled" disabled/>
        <input type="text" name="nested[field10]" value="input text"/>
        <select name="nooptions">
        </select>
      </form>
    `;

    document.getElementById("submit").focus();

    // Deep parse.
    assert.deepEqual(
      parse(document.getElementById("form") as HTMLFormElement).body,
      {
        field1: "text-area text",
        field2: "2",
        field3: ["3"],
        field5: "true",
        field6: "2",
        field7: "input text",
        field8: ["1", "3"],
        field9: "1",
        nested: {
          field10: "input text"
        }
      }
    );

    // Shallow parse.
    assert.deepEqual(
      parse(document.getElementById("form") as HTMLFormElement, true).body,
      {
        field1: "text-area text",
        field2: "2",
        field3: ["3"],
        field5: "true",
        field6: "2",
        field7: "input text",
        field8: ["1", "3"],
        field9: "1",
        "nested[field10]": "input text"
      }
    );
  });
});
