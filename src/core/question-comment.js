import { Question } from "./question";
import { metaData } from "./base";

export class Comment extends Question {
  static get definition() {
    return {
      name: "Comment",
      type: "comment",
      properties: Comment.properties
    }
  }

  static get properties() {
    return Question.properties.concat([
      "placeHolder",
      { name: "rows", type: "number", default: 2 }
    ]);
  }

  constructor(question) {
    super(question, metaData.getProperties("comment"));
    this.value = "";
	}

	set value(val) {
    if (val === null) {
      val = "";
    }
    super.value = val;
  }

  get value() {
    return super.value;
  }
}

metaData.addClass(Comment.definition);
