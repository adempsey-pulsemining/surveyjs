import { Page } from "./page";
import { metaData, Base } from "./base";
import { isEqual } from "lodash";
import { Element } from "./element";

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
			"readOnly:boolean",
			{ name: "showProgressBar", type: "boolean", default: true },
			{ name: "showQuestionNumbers", type: "boolean", default: true },
			{ name: "breakAfterPage", type: "boolean", default: true },
			"isPdfRender:boolean",
			"singlePage:boolean",
    ]);
  }

  constructor(template) {
    super(template, metaData.getProperties("survey"));
    this.pages = [];
    this.currentPageIndex = 0;
    this._renderSurvey(template);
    this._createEventListeners();
    this.pageIndexProxy = this.__getSurveyProxy();
    this.pageIndexProxy.currentPageIndex = 0;
  }

  __getSurveyProxy() {
    var that = this;
    return new Proxy(this, {
      set(obj, prop, val) {
        return that.__onSurveyPropertyChanged(obj, prop, val);
      },
      get(obj, prop) {
        return obj[prop]
      }
    });
  }

  __onSurveyPropertyChanged(obj, prop, val) {
    let oldVal = obj[prop];
    obj[prop] = val;
    if (prop === "currentPageIndex") {
      this.pageChanged(oldVal, val);
    }
    return true;
  }

  /**
   * Public methods
   */

  get visiblePages() {
    return this.pages.filter(page => page.visible);
  }

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
        if (!question.hasValue() && !question.comment) continue;
        data[question.questionId] = question.data;
      }
    }
    if (typeof data.value === "object") {
      data.value = JSON.parse(JSON.stringify(data.value));
    }
    return data;
	}

  isFirstPage() {
    return this.pageIndexProxy.currentPageIndex === 0 || this.singlePage;
  }

  isLastPage() {
    return this.pageIndexProxy.currentPageIndex === this.visiblePages.length - 1 || this.singlePage;
  }

  nextPage() {
    if (this.isLastPage()) return;
    ++this.pageIndexProxy.currentPageIndex;
  }

  prevPage() {
    if (this.isFirstPage()) return;
    --this.pageIndexProxy.currentPageIndex;
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
    return this.visiblePages[this.pageIndexProxy.currentPageIndex];
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

  get visibleQuestions() {
    let questions = [];
    this.visiblePages.forEach(page => {
      questions = questions.concat(page.questions);
    });
    return questions;
  }

  get elements() {
    let elements = [];
    this.pages.forEach(page => {
      elements = elements.concat(page.getElements());
    });
    return elements;
  }

  get visibleElements() {
    let elements = [];
    this.visiblePages.forEach(page => {
      elements = elements.concat(page.visibleElements);
    });
    return elements;
  }

  getAllElements() {
    let elements = [];
    this.pages.forEach(page => {
      elements = elements.concat(page.getAllElements());
    });
    return elements;
  }

  indexOfQuestion(question) {
    return this.questions.indexOf(question);
  }

  valueChanged(question, newVal, oldVal) {
    newVal = typeof newVal === "object" ? JSON.parse(JSON.stringify(newVal)) : newVal;
    oldVal = typeof oldVal === "object" ? JSON.parse(JSON.stringify(oldVal)) : oldVal;
    if (this.onValueChanged && !isEqual(newVal, oldVal)) {
      this.doTriggers(this);
      this.onValueChanged(question, newVal, oldVal);
    }
  }

  pageChanged(oldVal, newVal) {
    this.doTriggers(this);
  }

  /**
   * Private methods
   */

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
