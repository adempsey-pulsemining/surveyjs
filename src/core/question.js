import { Element } from "./element";
import { metaData } from "./base";

export class Question extends Element {
  static get definition() {
    return {
      name: "Question",
      type: "question",
      properties: Question.properties
    }
  }

  static get properties() {
    return Element.properties.concat([
			"!questionId",
			"description"
		]);
  }

  constructor(question, properties) {
    super(question, properties || metaData.getProperties("question"));
    this.proxy = this.__getQuestionProxy();
    this.valueChangedCallback = function() {};
	}

	// question is considered answered
	isAnswered() {
		return !!this.value;
	}

	// question has value but not answered
	hasValue() {
    return !!this.value;
  }

	isValid() {
		let valid = true;
		if (this.required()) {
			valid = this.isAnswered();
		}
		return valid;
	}

	get data() {
		return {
      value: this.value,
      comment: this.comment || "",
      name: this.name,
      title: this.title || this.name,
      type: this.type,
			page: this.pageNumber,
			sequence: this.questionNo
    }
	}

	get titleColour() {
    return this.question.titleColour || "";
  }

  get questionNo() {
    if (!this.survey) return;
    return this.survey.indexOfQuestion(this) + 1;
	}
	
	get elementNo() {
		if (!this.survey) return;
		return this.survey.indexOfElement(this) + 1;
	}

  set value(val) {
    this.proxy.__value = val;
  }

  get value() {
    return this.__value;
  }

  get pageNumber() {
    return this.page.pageNumber;
  }

  get isShownInPdf() {
    if (!this.survey.isPdfRender) {
      return true;
    }
    if (this.hideInPdf) {
      return false;
    }
    if (this.hideInPdfIfEmpty) {
      return !!this.hasValue();
    }
    return true;
  }

  valueChanged(val, oldVal) {
    if (this.valueChangedCallback) {
      this.valueChangedCallback(val, oldVal);
    }
    this.survey.valueChanged(this, val, oldVal);
  }

  __getQuestionProxy() {
		var that = this;
    return new Proxy(this, {
			set(obj, prop, val) {
				return that.__onQuestionPropertyChanged(obj, prop, val);
      }
		});
	}
	
	__onQuestionPropertyChanged(obj, prop, val) {
		let oldVal = typeof obj[prop] === "object" ? JSON.parse(JSON.stringify(obj[prop])) : obj[prop];
		obj[prop] = val;
		if (prop === "__value" && this.survey) {
      this.valueChanged(val, oldVal);
    }
		return true;
	}
}

metaData.addClass(Question.definition);
