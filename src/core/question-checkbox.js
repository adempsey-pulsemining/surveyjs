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
			{ name: "choices", type: "array", default: [] },
			{ name: "inline", type: "boolean" }
    ]);
  }

  constructor(question) {
    super(question, metaData.getProperties("checkbox"));
    this.value = [];
	}
	
	isAnswered() {
		return this.hasValue();
	}

	hasValue() {
		return !!this.value && this.value.length;
	}
}

metaData.addClass(Checkbox.definition);
