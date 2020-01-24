import { metaData } from "./base";
import { Question } from "./question";

export class Widget extends Question {
  constructor(element) {
    super(element, metaData.getProperties(element.type));
  }

  get isWidget() {
    return true;
  }
}

export default {
  props: {
    question: Object
  }
}
