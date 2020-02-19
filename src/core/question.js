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
		if (this.isRequired()) {
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
			sequence: this.no
    }
	}

  get no() {
    if (!this.survey) return;
    return this.survey.indexOfQuestion(this) + 1;
  }

  set value(val) {
    this.__value = val;
    if (this.survey) {
      this.survey.onValueChanged(this, val);
		}
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
}

metaData.addClass(Question.definition);
