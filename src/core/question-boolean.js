import { Question } from "./question";
import { metaData } from "./base";

export class Boolean extends Question {
  static get definition() {
    return {
      name: "Boolean",
      type: "boolean",
      properties: Boolean.properties
    }
  }

  static get properties() {
    return Question.properties.concat([]);
  }

  constructor(question) {
    super(question, metaData.getProperties("boolean"));
    this.value = false;
  }
}

metaData.addClass(Boolean.definition);
