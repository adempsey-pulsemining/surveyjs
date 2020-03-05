import { Question } from "./question";
import { metaData } from "./base";

export class Dropdown extends Question {
  static get definition() {
    return {
      name: "Dropdown",
      type: "dropdown",
      properties: Dropdown.properties
    }
  }

  static get properties() {
    return Question.properties.concat([
			{ name: "choices", type: "array", default: [] }
    ]);
  }

  static IsAnswered(value) {
    return !!value;
  }

  constructor(question) {
    super(question, metaData.getProperties("dropdown"));
    this.value = "";
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
	
	isAnswered() {
		return Dropdown.IsAnswered(this.value);
	}
}

metaData.addClass(Dropdown.definition);
