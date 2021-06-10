import { Question } from "./question";
import { metaData } from "./base";

export class Expression extends Question {
  static get definition() {
    return {
      name: "Expression",
      type: "expression",
      properties: Expression.properties
    }
  }

  static get properties() {
    return Question.properties.concat([
      "expression",
      "displayStyle",
      "currency"
    ])
  }

  constructor(question) {
    super(question, metaData.getProperties("expression"));
    this.value = "";
  }

  getFormattedValue(val) {
    if (!val) return "";
    try {
      return val.toLocaleString(undefined, {
        style: this.displayStyle,
        currency: this.currency
      });
    } catch (e) {
      console.error(e);
      return val;
    }
  }

  get value() {
    return this.__value;
  }

  set value(val) {
    super.value = this.getFormattedValue(val);
    this.rawValue = val;
  }
}

metaData.addClass(Expression.definition);
