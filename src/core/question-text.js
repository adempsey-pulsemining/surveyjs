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
      "placeHolder",
      "replace"
    ])
  }

  constructor(question) {
    super(question, metaData.getProperties("text"));
    if (this.replace && this.replace === this.placeHolder) {
      this.value = this.placeHolder;
      this.readOnly = true;
    } else {
      this.value = "";
    }
	}

	get value() {
    let value = this.__value;
    if (this.inputType === "date" && this.placeHolder) {
      value = moment(new Date(this.placeHolder)).format("YYYY-MM-DD");
    }
    return value;
  }

  set value(val) {
    if (val === null) {
      val = "";
    }
    super.value = val;
  }
}

metaData.addClass(Text.definition);
