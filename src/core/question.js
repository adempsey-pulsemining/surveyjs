import { Element } from "./element";
import { metaData } from "./base";

export class Question extends Element {
  static get definition() {
    return {
      name: "Question",
      type: "question",
      properties: Question.properties
    }
  }

  static get properties() {
    return Element.properties.concat([]);
  }

  constructor(question, properties) {
    super(question, properties || metaData.getProperties("question"));
  }

  getType() {
    return Question.definition.type;
  }

  get no() {
    if (!this.survey) return;
    return this.survey.indexOfQuestion(this) + 1;
  }

  set value(val) {
    this.__value = val;
    if (this.survey) {
      this.survey.onValueChanged(this, val);
    }
  }

  get value() {
    return this.__value;
  }

  get pageNumber() {
    return this.page.pageNumber;
  }
}

metaData.addClass(Question.definition);
