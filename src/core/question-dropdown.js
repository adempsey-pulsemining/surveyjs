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

  constructor(question) {
    super(question, metaData.getProperties("dropdown"));
    this.value = "";
	}
	
	isAnswered() {
		return !!this.value;
	}
}

metaData.addClass(Dropdown.definition);
