import { Question } from "./question";
import { metaData } from "./base";

export class Html extends Question {
  static get definition() {
    return {
      name: "Html",
      type: "html",
      properties: Html.properties
    }
  }

  static get properties() {
    return Question.properties.concat([
      "html"
    ]);
  }

  constructor(question) {
    super(question, metaData.getProperties("html"));
	}
	
	isAnswered() {
		return true;
	}

	hasValue() {
		return false;
	}
}

metaData.addClass(Html.definition);
