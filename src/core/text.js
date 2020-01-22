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
      { name: "inputType", default: "text", required: false }
    ])
  }

  constructor(question) {
    super(question, metaData.getProperties("text"));
    this.value = "";
  }

  getType() {
    return Text.definition.type;
  }
}

metaData.addClass(Text.definition);
