import { Question } from "./question";
import { metaData, Base } from "./base";

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

    ]);
  }

  constructor(question) {
    super(question, metaData.getProperties("multipletext"));
    this.items = [];
    for (let item of question.items) {
      this.items.push(new MultipleTextItem(item));
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

  constructor(item) {
    super(item, metaData.getProperties("multipletext_item"));
  }
}

metaData.addClass(MultipleText.definition);
metaData.addClass(MultipleTextItem.definition);
