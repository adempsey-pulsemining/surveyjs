import { Element } from "./element";
import { metaData } from "./base";

export class Group extends Element {
  static get definition() {
    return {
      name: "Group",
      type: "group",
      properties: Group.properties
    }
  }

  static get properties() {
    return Element.properties.concat([]);
  }

  constructor(element) {
    super(element, metaData.getProperties("group"));
    this.elements = [];
  }

  get visibleElements() {
    return this.elements.filter(x => x.visible);
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
    newQuestion.group = this;
    this.elements.push(newQuestion);
  }
}

metaData.addClass(Group.definition);
