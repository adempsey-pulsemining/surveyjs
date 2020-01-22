import { Element } from "./element";
import { metaData } from "./base";

export class Group extends Element {
  constructor(element) {
    super(element, Group.definition.properties);
    this.questions = [];
  }

  addQuestions(questions) {
    questions = questions || [];
    for (let question of questions) {
      this.__addQuestion(question);
    }
  }

  __addQuestion(question) {
    let myClass = metaData.getClassName(question.type);
    if (!metaData.hasClass(question.type)) return;
    let newQuestion = new window.Survey[myClass](question);
    newQuestion.survey = this.survey;
    newQuestion.page = this.page;
    this.questions.push(newQuestion);
  }

  getType() {
    return Group.definition.type;
  }
}

const definition = {
  name: "Group",
  type: "group",
  properties: [
    { name: "elements", type: "array", default: [] }
  ]
};

Group.definition = definition;
metaData.addClass(definition);
