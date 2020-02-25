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

  static IsAnswered(value) {
    return this.HasValue(value);
  }

  static HasValue(value) {
    return !!value && value.length > 0;
  }

  constructor(question) {
    super(question, metaData.getProperties("checkbox"));
    this.value = [];
	}

  get cloneValue() {
    let value = [];
    for (let item of this.value) {
      value.push(item);
    }
    return value;
  }

	isAnswered() {
		return Checkbox.IsAnswered(this.value);
	}

	hasValue() {
		return Checkbox.HasValue(this.value);
	}
}

metaData.addClass(Checkbox.definition);
