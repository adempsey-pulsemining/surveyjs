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

  static IsAnswered(value) {
    return value != null;
  }

  constructor(question) {
    super(question, metaData.getProperties("boolean"));
    this.value = null;
	}
	
	isAnswered() {
		return Boolean.IsAnswered(this.value);
	}

	hasValue() {
		return this.isAnswered();
	}
}

metaData.addClass(Boolean.definition);
