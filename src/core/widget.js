import { metaData } from "./base";
import { Question } from "./question";

export class Widget extends Question {
  constructor(element) {
    super(element, metaData.getProperties(element.type));
    if (metaData.getWidget(element.type)) {
      this.widget = metaData.getWidget(element.type);
    }
    for (let key in this.widget) {
      if (metaData.getProperties(element.type).findIndex(x => x.name === key) < 0) {
        this[key] = this.widget[key];
      }
    }
    this.value = null;
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
    if (typeof this.setValue === "function") {
      this.setValue(this.value);
    } else if (this.element && this.isWebComponent) {
      this.element.value = this.value;
    }
    this.element.addEventListener("value-changed", (e) => {
      super.value = e.detail.value;
    });
    if (this.isWebComponent) {
      this.__setElementProperties();
    }
  }

  __setElementProperties() {
    let properties = metaData.getProperties(this.type) || [];
    for (let property of properties) {
      if (this.element && property.name in this.element.constructor.properties && property.name !== "value") {
        this.element[property.name] = this[property.name];
      }
    }
  }
}
