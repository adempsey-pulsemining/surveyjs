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
			{ name: "inline", type: "boolean", writable: true },
      { name: "colCount", type: "number", writable: true },
			{ name: "choices", type: "array", default: [], writable: true }
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

	set value(val) {
    if (val === null) {
      val = "";
    }
    super.value = val;
  }

  get value() {
    return super.value;
  }
}

metaData.addClass(Radio.definition);
