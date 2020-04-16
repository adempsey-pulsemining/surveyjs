import { metaData } from "./base";
import { Question } from "./question";

export class Widget extends Question {
  constructor(element) {
    super(element, metaData.getProperties(element.type));
    if (metaData.getWidget(element.type)) {
      this.widget = metaData.getWidget(element.type);
    }
    for (let key in this.widget) {
      // if key is not part of properties then add it to class instance
      if (metaData.getProperties(element.type).findIndex(x => x.name === key) < 0) {
        this[key] = this.widget[key];
      }
    }
    if (typeof this.load === "function") {
      this.webComponentLoaded = this.load();
    }
  }

  get isWebComponent() {
    return typeof customElements !== "undefined" && !!customElements.get(this.widgetName);
  }

  get isWidget() {
    return true;
  }

  set value(value) {
    super.value = value;
  }

  get value() {
    return super.value;
  }

  // the element has rendered and is ready
  ready() {
    this.widget.element = this.element;
    if (typeof this.value !== "undefined" && this.value !== null) {
      this.value = this.value;
    }
    if (this.element && this.isWebComponent) {
      this.__setupCustomElement();
    }
  }

  __setupCustomElement() {
    this.element.question = this;
    this.__setupElement();
    this.element.addEventListener("value-changed", (e) => {
      super.value = e.detail.value;
    });
  }

  __setupElement() {
    let properties = metaData.getProperties(this.type) || [];
    for (let property of properties) {
      if (this.element && property.name in this.element.constructor.properties && property.name !== "value") {
        this.element[property.name] = this[property.name];
      }
    }
    if (typeof this.setupElement === "function") {
      this.setupElement(this.survey, this.element);
    }
  }
}
