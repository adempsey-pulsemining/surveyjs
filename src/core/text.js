import { Question } from "./question";
import { Element } from "./element";
import { metaData } from "./base";

export class Text extends Question {
  constructor(question) {
    super(question, Text.definition.properties);
    this.value = "";
  }

  getType() {
    return Text.definition.type;
  }
}

const definition = {
  name: "Text",
  type: "text",
  properties: []
};

Text.definition = definition;
metaData.addClass(definition);
