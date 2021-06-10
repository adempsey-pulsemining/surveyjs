import { Question } from "./question";
import { metaData } from "./base";

export class File extends Question {
  static get definition() {
    return {
      name: "File",
      type: "file",
      properties: File.properties
    }
  }

  static get properties() {
    return Question.properties.concat([
    ])
  }

  constructor(question) {
    super(question, metaData.getProperties("file"));
    this.value = null;
  }

  get value() {
    return this.__value;
  }

  set value(val) {
    super.value = val;
  }
}

metaData.addClass(File.definition);
