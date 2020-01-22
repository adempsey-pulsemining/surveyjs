import { Base } from "./base";
import { Page } from "./page";
import { metaData } from "./base"

export class Survey extends Base {
  static get definition() {
    return {
      name: "Survey",
      type: "survey",
      properties: Survey.properties
    }
  }

  static get properties() {
    return Base.properties.concat([
      { name: "pages", type: "array", default: [], required: true, fromTemplate: false },
      { name: "readOnly", type: "boolean", default: false }
    ])
  }

  constructor(template) {
    super(template, metaData.getProperties("survey"));
    this.currentPageIndex = 0;
    this.pages = [];
    this._createEventListeners();
    this._renderSurvey(template);
  }

  /**
   * Public methods
   */

  reset() {
    this.data = {};
  }

  set data(data) {
    data = typeof data === "string" ? JSON.parse(data) : data;
    for (let page of this.pages) {
      for (let question of page.questions) {
        question.value = data[question.id] ? data[question.id].value : "";
      }
    }
  }

  get data() {
    let data = {};
    for (let page of this.pages) {
      for (let question of page.questions) {
        if (!question.value) continue;
        data[question.id] = this.__getQuestionData(question);
      }
    }
    return data;
  }

  isFirstPage() {
    return this.currentPageIndex === 0;
  }

  isLastPage() {
    return this.currentPageIndex === this.pages.length - 1;
  }

  nextPage() {
    if (this.isLastPage()) return;
    ++this.currentPageIndex;
  }

  prevPage() {
    if (this.isFirstPage()) return;
    --this.currentPageIndex;
  }

  complete() {
    if (this.onComplete) {
      this.onComplete();
    }
  }

  savePage() {
    if (this.onSaveButtonClicked) {
      this.onSaveButtonClicked();
    }
  }

  get currentPage() {
    return this.pages[this.currentPageIndex];
  }

  getType() {
    return Survey.definition.type;
  }

  addPage(page) {
    let newPage = new Page(page);
    newPage.survey = this;
    this.pages = this.pages || [];
    this.pages.push(newPage);
    return newPage;
  }

  get questions() {
    let questions = [];
    this.pages.forEach(page => {
      questions = questions.concat(page.questions);
    });
    return questions;
  }

  indexOfQuestion(question) {
    return this.questions.indexOf(question);
  }

  /**
   * Private methods
   */

  __getQuestionData(question) {
    return {
      value: question.value,
      comment: question.comment || "",
      name: question.name,
      title: question.title,
      type: question.getType(),
      page: question.pageNumber
    }
  }

  _createEventListeners() {
    this.onComplete = function() {};
    this.onValueChanged = function() {};
    this.onSaveButtonClicked = function() {};
  }

  // Render survey from the template. ie create pages/panels/questions
  _renderSurvey(template) {
    this._createPages(template.pages);
  }

  _createPages(pages) {
    pages.forEach(page => {
      let newPage = this.addPage(page);
      newPage.addElements(page.elements);
    });
  }
}

metaData.addClass(Survey.definition);


