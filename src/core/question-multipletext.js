import { Question } from "./question";
import { metaData, Base } from "./base";
import moment from "moment";

export class MultipleText extends Question {
  static get definition() {
    return {
      name: "MultipleText",
      type: "multipletext",
      properties: MultipleText.properties
    }
  }

  static get properties() {
    return Question.properties.concat([
			{ name: "inline", type: "boolean", default: true }
    ]);
  }

  constructor(question) {
    super(question, metaData.getProperties("multipletext"));
    this.items = [];
    for (let item of question.items || []) {
      this.items.push(new MultipleTextItem(this, item));
    }
  }

  set value(val) {
    for (let item of this.items) {
      if (val[item.name]) {
        item.value = val[item.name];
      }
    }
  }

  get value() {
    let value = {};
    for (let item of this.items) {
      if (item.value) {
        value[item.name] = item.value;
      }
    }
    return value;
  }

  isAnswered() {
    return this.value && Object.keys(this.value).length === this.items.length;
  }

  hasValue() {
    return this.value && Object.keys(this.value).length > 0;
  }
}

class MultipleTextItem extends Base {
  static get definition() {
    return {
      name: "MultipleTextItem",
      type: "multipletext_item",
      properties: MultipleTextItem.properties
    }
  }

  static get properties() {
    return [
      "!name",
      "title",
      "placeHolder",
      "readOnly:boolean",
      { name: "inputType", type: "string", default: "text" }
    ];
  }

  set value(val) {
    this.__value = val;
    this.question.valueChanged(this.question.value);
  }

  get value() {
    let value = this.__value;
    if (this.inputType === "date" && this.placeHolder) {
      value = moment(new Date(this.placeHolder)).format("YYYY-MM-DD");
    }
    return value;
  }

  constructor(q, item) {
    super(item, metaData.getProperties("multipletext_item"));
    this.question = q;
  }
}

metaData.addClass(MultipleText.definition);
metaData.addClass(MultipleTextItem.definition);
