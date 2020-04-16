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

  getItem(name) {
    for (let item of this.items) {
      if (item.name === name) {
        return item;
      }
    }
  }

  setMetadata(items) {
    for (let item of items) {
      this.getItem(item.name).changedBy = item.changedBy;
      this.getItem(item.name).changedOn = item.changedOn;
    }
  }

  get data() {
    if (!this.items) return {};
    let data = super.data;
    let items = [];
    this.items.forEach((item, index) => {
      if (!item.value) return;
      let obj = item.data;
      obj.sequence = this.getSequenceCharacter(index).toUpperCase();
      items.push(obj);
    });
    data.items = items;
    return data;
  }

  set value(val) {
    if (!this.items) return;
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
    if (!this.items) return {};
    let value = {};
    for (let item of this.items) {
      if (item.value) {
        value[item.name] = item.value;
      }
    }
    return value;
  }

  isAnswered() {
    if (!this.items) return;
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

  get data() {
    return {
      name: this.name,
      title: this.title || this.name,
      value: this.value || "",
      changedBy: this.changedBy || "",
      changedOn: this.changedOn || ""
    }
  }

  set value(val) {
    this.__value = val;
    this.question.valueChanged(this.question.value, {
      name: this.name
    });
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
    this.changedBy = "";
    this.changedOn = null;
    this.value = "";
  }
}

metaData.addClass(MultipleText.definition);
metaData.addClass(MultipleTextItem.definition);
