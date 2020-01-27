import { Question } from "./question";
import { metaData } from "./base";

export class Text extends Question {
  static get definition() {
    return {
      name: "Text",
      type: "text",
      properties: Text.properties
    }
  }

  static get properties() {
    return Question.properties.concat([
      { name: "inputType", default: "text" }
    ])
  }

  constructor(question) {
    super(question, metaData.getProperties("text"));
    this.value = "";
	}
}

metaData.addClass(Text.definition);
