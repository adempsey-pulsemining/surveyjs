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

  static addOption(option) {
    this.options = this.options || [];
    this.options.push(option);
  }

  constructor(question, properties) {
    super(question, properties || metaData.getProperties("question"));
    this.proxy = this.__getQuestionProxy();
    this.valueChangedCallback = function() {};
    this.commentChangedCallback = function() {};
    this.elementId = "sv_" + this.newGuid();
    this.changedBy = "";
    this.changedOn = null;
	}

	isMatrix() {
    return false;
  }

	// question is considered answered
	isAnswered() {
		return !!this.value || this.isReadOnly();
	}

	// question has value but not answered
	hasValue() {
    return !!this.value;
  }

  get errors() {
    let errors = [];
    if (!this.isValid()) {
      errors.push("Please answer the question.");
    }
    return errors;
  }

  get hasErrors() {
    return this.errors && this.errors.length > 0;
  }

  get showErrors() {
    return this.page && this.page.showErrors;
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
      value: this.cloneValue,
      description: this.description || "",
      comment: this.comment || "",
      name: this.name,
      fixedName: this.name.split(".").join(" "),
      title: this.title || this.name,
      type: this.type,
			page: this.pageNumber,
			sequence: this.questionNo,
      questionId: this.questionId,
      changedOn: this.changedOn || "",
      changedBy: this.changedBy || ""
    }
	}

	get titleColour() {
    return this.question.titleColour || "";
  }

  get questionNo() {
    if (!this.survey) return;
    return this.survey.questions.filter(x => x.type !== 'html').indexOf(this) + 1;
	}
	
	get elementNo() {
		if (!this.survey) return;
    return this.survey.elements.indexOf(this) + 1;
	}

	set comment(val) {
    this.proxy.__comment = val;
  }

  get comment() {
    return this.proxy.__comment;
  }

  set value(val) {
    if (val !== this.proxy.__value) {
      this.proxy.__value = val;
    }
  }

  get cloneValue() {
    if (typeof this.value === "object") {
      return Array.isArray(this.value) ? [...this.value] : Object.assign({}, this.value);
    }
    return this.value;
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

  valueChanged(val, obj) {
    if (this.survey) {
      this.survey.valueChanging(this, val, obj);
    }
    if (this.valueChangedCallback) {
      this.valueChangedCallback(val);
    }
    if (this.survey) {
      this.survey.valueChanged(this, val, obj);
    }
  }

  commentChanged(comment) {
    if (this.commentChangedCallback) {
      this.commentChangedCallback(comment);
    }
    if (this.survey) {
      this.survey.commentChanged(this, comment);
    }
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
		obj[prop] = val;
		if (prop === "__value" && this.survey) {
      this.valueChanged(this.cloneValue);
    }
		if (prop === "__comment") {
		  this.commentChanged(val);
    }
		return true;
	}
}

metaData.addClass(Question.definition);
