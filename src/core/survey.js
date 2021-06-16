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
      { name: "hideSaveButtons", type: "boolean", default: false, writable: true },
      { name: "hideCompleteButton", type: "boolean", default: false, writable: true },
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
    this.__data = {};
    this.completed = false;
    this.showResultsPage = true;
    this.loadingPage = false;
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

  _updateData(question) {
    if (question.hasValue() || question.comment) {
      this.__data[question.questionId] = question.data;
    } else {
      delete this.__data[question.questionId];
    }
  }

  get visiblePages() {
    return this.pages.filter(page => page.visible);
  }

  restart() {
    this.reset();
    this.completed = false;
    this.changePage(0);
  }

  reset() {
    this.__data = {};
    this.data = {};
  }

  doTriggersForAllPages() {
    for (let page of this.pages) {
      this.doTriggers(this, page, this.data);
    }
  }

  getSurveyResults() {
    let results = [];
    let data = this.data;
    for (let id in data) {
      results.push({
        page: data[id].page,
        name: data[id].name,
        title: data[id].title,
        description: data[id].description,
        value: typeof data[id].value === "object" ? JSON.stringify(data[id].value) : data[id].value,
        comment: data[id].comment
      })
    }
    return results;
  }

  set data(data) {
    data = typeof data === "string" ? JSON.parse(data) : data;
    this.pages.forEach(page => {
      page.questions.forEach(question => {
        this._setQuestionData(question, data);
      })
    })
    this.doTriggersForAllPages();
  }

  get data() {
    return this.__data || {};
	}

	_setQuestionData(question, data) {
    let questionData = data[question.questionId];
    if (questionData) {
      question.comment = questionData.comment;
      question.value = questionData.value;
      question.changedBy = questionData.changedBy;
      question.changedOn = questionData.changedOn;
    } else {
      question.comment = "";
      question.value = null;
      question.changedBy = "";
      question.changedOn = "";
    }
    if (question.type === "multipletext" && questionData) {
      question.setMetadata(questionData.items);
    } else if (question.isMatrix() && questionData) {
      question.setMetadata(questionData.cells);
    }
    this._updateData(question);
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
    if (this.loadingPage) return;
    this.loadingPage = true;
    setTimeout(() => {
      let currentPageIndex = this.proxy.currentPageIndex;
      for (let i = this.proxy.currentPageIndex; i < index; ++i) {
        this.doTriggers(this, this.visiblePages[i], this.data);
        if (this.visiblePages[i].hasErrors()) {
          this.proxy.currentPageIndex = i;
          this.showErrors();
          this.loadingPage = false;
          return;
        }
      }
      this.proxy.currentPageIndex = index;
      this.pageChanged(currentPageIndex, index);
      setTimeout(() => {
        this.loadingPage = false;
        let n = document.querySelector(".sv_page_container");
        if (n) n.scrollTo(0, 0);
      }, 1);
    }, 1)
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
    this.__clearing = false;
  }

  complete() {
    this.completed = true;
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
    let arr = visible ? this.visibleQuestions : this.questions;
    return arr.filter(x => x.type !== 'html').indexOf(question);
	}
	
	indexOfElement(element, visible = false) {
    let arr = visible ? this.visibleElements : this.elements;
    return arr.filter(x => x.type !== 'html').indexOf(element);
	}

  valueChanged(question, newVal, obj) {
    if (this.onValueChanged && !this.__clearing) {
      this.doTriggers(this, this.currentPage, this.data);
      this.onValueChanged(question, newVal, obj);
    }
  }

  valueChanging(question, newVal, obj) {
    question.changedOn = new Date().toISOString();
    if (this.onValueChanging) {
      this.onValueChanging(question, newVal, obj);
    }
    this._updateData(question);
  }

  commentChanged(question, val) {
    this._updateData(question);
    if (this.onCommentChanged && !this.__clearing) {
      this.onCommentChanged(question, val);
    }
  }

  pageChanged(oldVal, newVal) {
    if (this.pageChanged) {
      this.onPageChanged(this.pages[oldVal], this.pages[newVal]);
    }
    this.doTriggers(this, this.currentPage, this.data);
  }

  pageChanging(oldVal, newVal) {
    this.currentPage.showErrors = false;
    if (this.onPageChanging) {
      this.onPageChanging(this.pages[oldVal], this.pages[newVal]);
    }
  }

  downloadPdfClick() {
    if (this.onDownloadPdfClick) {
      this.onDownloadPdfClick(this.data);
    }
  }

  downloadCsvClick() {
    if (this.onDownloadCsvClick) {
      this.onDownloadCsvClick(this.data);
    }
  }

  /**
   * Private methods
   */

  _createEventListeners() {
    this.onComplete = function() {
      if (!this.canComplete()) {
        alert("You have unfinished pages. Please finish them before completing.");
      }
    };
    this.onValueChanged = function() {};
    this.onValueChanging = function() {};
    this.onCommentChanged = function() {};
    this.onSaveButtonClicked = function() {};
    this.onPageChanging = function() {};
    this.onPageChanged = function() {};
    this.onClear = function() {
      this.reset();
    };
    this.onDownloadPdfClick = function() {};
    this.onDownloadCsvClick = function() {};
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
