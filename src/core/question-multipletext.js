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

  get data() {
    let data = super.data;
    let items = [];
    this.items.forEach((item, index) => {
      items.push({
        name: item.name,
        title: item.title || item.name,
        value: item.value || "",
        sequence: this.getSequenceCharacter(index).toUpperCase(),
        answeredBy: item.answeredBy
      });
    });
    data.items = items;
    return data;
  }

  set value(val) {
    if (val === null) {
      val = {};
    }
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
    let answered = true;
    this.items.forEach(item => {
      if (!item.value && !item.readOnly) {
        answered = false;
      }
    });
    return answered;
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
    this.answeredBy = this.value ? this.question.survey.getCurrentUser() : "";
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
    this.answeredBy = "";
  }
}

metaData.addClass(MultipleText.definition);
metaData.addClass(MultipleTextItem.definition);
