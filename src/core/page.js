import { Element } from "./element";
import { metaData } from "./base";

export class Page extends Element {
  static get definition() {
    return {
      name: "Page",
      type: "page",
      properties: Page.properties
    }
  }

  static get properties() {
    return Element.properties.concat([
      { name: "elements", type: "array", default: [], fromTemplate: false }
    ])
  }

  constructor(page) {
    super(page, metaData.getProperties("page"));
    this.elements = [];
  }

  getType() {
    return Page.definition.type;
  }

  get pageNumber() {
    return this.survey.pages.indexOf(this) + 1;
  }

  // Get all questions in the page including inside groups
  get questions() {
    return this.getQuestions(true);
  }

  // Get all questions in the page excluding questions in groups
  getElements() {
    return this.getQuestions(false);
  }

  getQuestions(flatten = false) {
    return flatten ? this.__getQuestionsNoGroup() : this.__getQuestions();
  }

  addElements(elements) {
    elements = elements || [];
    this.elements = this.elements || [];
    elements.forEach(element => {
      this.__addElement(element);
    });
  }

  __getQuestionsNoGroup() {
    let questions = [];
    for (let element of this.elements) {
      if (Element.isGroup(element)) {
        questions = questions.concat(element.questions);
      } else {
        questions.push(element);
      }
    }
    return questions;
  }

  __getQuestions() {
    return this.elements || [];
  }

  __addElement(element) {
    let newElement;
    let myClass = metaData.getClassName(element.type);
    if (!metaData.hasClass(element.type)) return;
    if (Element.isGroup(element)) {
      newElement = new window.Survey[myClass](element);
      newElement.survey = this.survey;
      newElement.page = this;
      newElement.addQuestions(element.elements);
    } else {
      newElement = new window.Survey[myClass](element);
      newElement.survey = this.survey;
      newElement.page = this;
    }
    this.elements.push(newElement);
  }
}

metaData.addClass(Page.definition);
