import { Question } from "./question";
import { metaData } from "./base";

export class Imagepicker extends Question {
  static get definition() {
    return {
      name: "Imagepicker",
      type: "imagepicker",
      properties: Imagepicker.properties
    }
  }

  static get properties() {
    return Question.properties.concat([
      { name: "choices", type: "array", default: [] },
      "colCount"
    ])
  }

  constructor(question) {
    super(question, metaData.getProperties("imagepicker"));
    this.value = null;
  }

  getFixedChoices() {
    let choices = this.choices || [];
    let fixed = [];
    for (let choice of choices) {
      if (typeof choice !== "object") {
        fixed.push({ value: choice, text: choice, imageLink: "" });
      } else {
        fixed.push(choice)
      }
    }
    return fixed;
  }

  get value() {
    return this.__value;
  }

  set value(val) {
    super.value = val;
  }
}

metaData.addClass(Imagepicker.definition);
