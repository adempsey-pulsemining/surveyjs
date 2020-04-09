import { Page } from "./page";
import { metaData, Base } from "./base";
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
      { name: "singlePage", type: "boolean", default: false, writable: true },
      { name: "displayMode", type: "string", default: "edit", writable: true },
    ]);
  }

  constructor(template) {
    super(template, metaData.getProperties("survey"));
    this.pages = [];
    this.currentPageIndex = 0;
    this._renderSurvey(template);
    this._createEventListeners();
    this.proxy = this.__getSurveyProxy();
    this.proxy.currentPageIndex = 0;
    if (this.isPdfRender) {
      this.singlePage = true;
    }
  }

  __getSurveyProxy() {
    var that = this;
    return new Proxy(this, {
      set(obj, prop, val) {
        return that.__onSurveyPropertyChanged(obj, prop, val);
      },
      get(obj, prop) {
        return obj[prop];
      }
    });
  }

  __onSurveyPropertyChanged(obj, prop, val) {
    let oldVal = obj[prop];
    obj[prop] = val;
    if (prop === "currentPageIndex") {
      this.pageChanging(oldVal, val);
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
        this._setData(question, data[question.questionId]);
      }
    }
  }

  _setData(question, data) {
    question.comment = data ? data.comment : "";
    question.value = data ? data.value : null;
    question.changedBy = data ? data.changedBy : "";
    question.changedOn = data ? data.changedOn : null;
    if (question.type === "multipletext" && data) {
      question.setMetadata(data.items);
    } else if (question.isMatrix() && data) {
      question.setMetadata(data.cells);
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
    return data;
	}

	isDisplayMode(mode) {
    return this.displayMode === mode;
  }

  isFirstPage() {
    return this.proxy.currentPageIndex === 0 || this.singlePage;
  }

  isLastPage() {
    return this.proxy.currentPageIndex === this.visiblePages.length - 1 || this.singlePage;
  }

  canComplete() {
    for (let page of this.visiblePages) {
      if (page.hasErrors()) {
        return false;
      }
    }
    return true;
  }

  canGoToPage(pageIndex) {
    for (let i = this.currentPageIndex; i < pageIndex; ++i) {
      if (this.visiblePages[i].hasErrors()) {
        return false;
      }
    }
    return true;
  }

  canContinue() {
    if (this.currentPage.hasErrors()) {
      this.showErrors();
      return;
    }
    return true;
  }

  getFirstPageWithErrors() {
    for (let i = 0; i < this.visiblePages.length; ++i) {
      if (this.visiblePages[i].hasErrors()) {
        return i;
      }
    }
  }

  showErrors() {
    setTimeout(() => {
      this.currentPage.showErrors = true;
      this.scrollToFirstError();
    },1);
  }

  scrollToFirstError() {
    for (let question of this.currentPage.visibleQuestions) {
      if (question.hasErrors) {
        let element = document.getElementById(question.elementId);
        if (!element) continue;
        element.scrollIntoView({ behavior: "smooth" });
        return;
      }
    }
  }

  changePage(index) {
    let currentPageIndex = this.proxy.currentPageIndex;
    for (let i = this.proxy.currentPageIndex; i < index; ++i) {
      this.doTriggers(this, this.visiblePages[i]);
      if (this.visiblePages[i].hasErrors()) {
        this.proxy.currentPageIndex = i;
        this.showErrors();
        return;
      }
    }
    this.proxy.currentPageIndex = index;
    this.pageChanged(currentPageIndex, index);
  }

  nextPage() {
    if (this.isLastPage()) return;
    if (!this.canContinue()) return;
    this.changePage(this.proxy.currentPageIndex + 1);
  }

  prevPage() {
    if (this.isFirstPage()) return;
    this.changePage(this.proxy.currentPageIndex - 1);
  }

  clear() {
    this.__clearing = true;
    if (this.onClear) {
      this.onClear();
    }
    this.doTriggersForAllPages(this);
    this.__clearing = false;
  }

  complete() {
    if (this.onComplete) {
      this.onComplete();
    }
  }

  savePage(exit) {
    if (this.onSaveButtonClicked) {
      this.onSaveButtonClicked(exit);
    }
  }

  get currentPage() {
    return this.visiblePages[this.proxy.currentPageIndex];
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

  indexOfQuestion(question, visible = false) {
    return visible ? this.visibleQuestions.indexOf(question) : this.questions.indexOf(question);
	}
	
	indexOfElement(element, visible = false) {
		return visible ? this.visibleElements.indexOf(element) : this.elements.indexOf(element);
	}

  valueChanged(question, newVal, obj) {
    if (this.onValueChanged) {
      if (!this.__clearing) {
        this.doTriggers(this, this.currentPage);
      }
      this.onValueChanged(question, newVal, obj);
    }
  }

  valueChanging(question, newVal) {
    if (this.onValueChanging) {
      this.onValueChanging(question, newVal);
    }
  }

  commentChanged(question, val) {
    if (this.onCommentChanged) {
      this.onCommentChanged(question, val);
    }
  }

  pageChanged(oldVal, newVal) {
    if (this.pageChanged) {
      this.onPageChanged(this.pages[oldVal], this.pages[newVal]);
    }
    this.doTriggers(this, this.currentPage);
  }

  pageChanging(oldVal, newVal) {
    this.currentPage.showErrors = false;
    if (this.onPageChanging) {
      this.onPageChanging(this.pages[oldVal], this.pages[newVal]);
    }
  }

  /**
   * Private methods
   */

  _createEventListeners() {
    this.onComplete = function() {};
    this.onValueChanged = function() {};
    this.onValueChanging = function() {};
    this.onCommentChanged = function() {};
    this.onSaveButtonClicked = function() {};
    this.onPageChanging = function() {};
    this.onPageChanged = function() {};
    this.onClear = function() {};
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
