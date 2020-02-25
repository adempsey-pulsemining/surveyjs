import { Question } from "./question";
import { metaData } from "./base";
import moment from "moment";

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
      { name: "inputType", default: "text" },
      "placeHolder"
    ])
  }

  constructor(question) {
    super(question, metaData.getProperties("text"));
    this.value = "";
	}

	get value() {
    let value = this.__value;
    if (this.inputType === "date" && this.placeHolder) {
      value = moment(new Date(this.placeHolder)).format("YYYY-MM-DD");
    }
    return value;
  }

  set value(val) {
    this.__value = val;
  }
}

metaData.addClass(Text.definition);
