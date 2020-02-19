import { Question } from "./question";
import { metaData } from "./base";

export class Radio extends Question {
  static get definition() {
    return {
      name: "Radio",
      type: "radio",
      properties: Radio.properties
    }
  }

  static get properties() {
    return Question.properties.concat([
			{ name: "inline", type: "boolean" },
			{ name: "choices", type: "array", default: [] }
    ]);
  }

  static IsAnswered(value) {
    return !!value;
  }

  constructor(question) {
    super(question, metaData.getProperties("radio"));
    this.value = "";
	}
	
	isAnswered() {
		return Radio.IsAnswered(this.value);
	}
}

metaData.addClass(Radio.definition);
