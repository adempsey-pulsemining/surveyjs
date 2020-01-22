import { Element } from "./element";
import { metaData } from "./base";

export class Question extends Element {
  constructor(question) {
    super(question, Question.definition.properties);
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

const definition = {
  name: "Question",
  type: "question",
  properties: []
};

Question.definition = definition;
metaData.addClass(definition);
