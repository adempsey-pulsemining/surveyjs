import { Question } from "./question";
import { metaData } from "./base";

export class Rating extends Question {
  static get definition() {
    return {
      name: "Rating",
      type: "rating",
      properties: Rating.properties
    }
  }

  static get properties() {
    return Question.properties.concat([
      "maxRateDescription",
      "minRateDescription",
      { name: "rateValues", default: ["1", "2", "3", "4", "5"] },
      "replace"
    ])
  }

  constructor(question) {
    super(question, metaData.getProperties("rating"));
    this.value = "";
  }

  getFixedValues() {
    let rateValues = this.rateValues || [];
    let fixed = [];
    for (let rateValue of rateValues) {
      if (typeof rateValue !== "object") {
        fixed.push({ value: rateValue, text: rateValue });
      } else {
        fixed.push(rateValue)
      }
    }
    if (this.maxRateDescription && fixed[fixed.length - 1]) {
      fixed[fixed.length - 1].text = this.maxRateDescription + " " + fixed[fixed.length - 1].text;
    }
    if (this.minRateDescription && fixed[0]) {
      fixed[0].text = this.minRateDescription + " " + fixed[0].text;
    }
    return fixed;
  }

  get value() {
    return this.__value;
  }

  set value(val) {
    if (val === null) {
      val = "";
    }
    super.value = val;
  }
}

metaData.addClass(Rating.definition);
