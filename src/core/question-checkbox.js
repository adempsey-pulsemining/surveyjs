import { Question } from "./question";
import { metaData } from "./base";

export class Checkbox extends Question {
  static get definition() {
    return {
      name: "Checkbox",
      type: "checkbox",
      properties: Checkbox.properties
    }
  }

  static get properties() {
    return Question.properties.concat([
      { name: "choices", type: "array" }
    ]);
  }

  constructor(question) {
    super(question, metaData.getProperties("checkbox"));
    this.value = [];
  }
}

metaData.addClass(Checkbox.definition);
