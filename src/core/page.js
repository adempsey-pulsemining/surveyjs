import { Element } from "./element";
import { metaData, Base } from "./base";

export class Page extends Base {
  static get definition() {
    return {
      name: "Page",
      type: "page",
      properties: Page.properties
    }
  }

  static get properties() {
    return Base.properties.concat([
      "!name",
      "title",
      "visibleIf",
      { name: "visible", type: "boolean", default: true, writable: true }
    ])
  }

  constructor(page) {
    super(page, metaData.getProperties("page"));
		this.elements = [];
  }

  get visibleElements() {
    return this.getElements().filter(element => element.visible);
  }

  get visibleQuestions() {
    return this.questions.filter(x => x.visible);
  }

  get pageNumber() {
    return this.survey.pages.indexOf(this) + 1;
	}
	
	// Returns true if the page has no unanswered questions
	get completed() {
		return this.questions.every(question => question.isAnswered());
  }
  
  hasErrors() {
		return this.questions.some(question => !question.isValid());
	}

  // Get all questions in the page including inside groups
  get questions() {
    return this.getQuestions(true);
  }

  // Get all questions in the page excluding questions in groups
  getElements() {
    return this.getQuestions(false);
  }

  getAllElements() {
    let elements = [];
    for (let element of this.elements) {
      if (Element.isGroup(element)) {
        elements.push(element);
        elements = elements.concat(element.elements);
      } else {
        elements.push(element);
      }
    }
    return elements;
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

  __getQuestionsNoGroup(visible = false) {
    let questions = [];
    for (let element of this.elements) {
      if (Element.isGroup(element)) {
        questions = questions.concat(element.elements);
      } else {
        questions.push(element);
      }
    }
    return questions;
  }

  __getQuestions(visible = false) {
    return this.elements || [];
  }

  __addElement(element) {
    let myClass = metaData.getClassName(element.type);
    // skip elements which are not defined in the metadata
    if (!metaData.hasClass(element.type)) {
      return;
    }
    if (Element.isGroup(element)) {
      this.__addGroup(myClass, element);
    } else {
      this.__addQuestion(myClass, element);
    }
  }

  __addQuestion(myClass, element) {
    let newElement = new window.Survey[myClass](element);
    newElement.survey = this.survey;
    newElement.page = this;
    this.elements.push(newElement);
  }

  __addGroup(myClass, element) {
    let newElement = new window.Survey[myClass](element);
    newElement.survey = this.survey;
    newElement.page = this;
    newElement.addQuestions(element.elements);
    this.elements.push(newElement);
  }
}

metaData.addClass(Page.definition);
