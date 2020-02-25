import { metaData } from "./base";
import { Question } from "./question";

export class Widget extends Question {
  constructor(element) {
    super(element, metaData.getProperties(element.type));
    if (metaData.getWidget(element.type)) {
      this.widget = metaData.getWidget(element.type);
    }
    this.valueChangedCallback = this.widget.valueChangedCallback || this.onValueChanged;
    this.readyCallback = this.widget.readyCallback || this.ready;
  }

  isReadOnly() {
    return this.widget.isReadOnly ? this.widget.isReadOnly() : this.isReadOnly();
  }

  get isWidget() {
    return true;
  }

  set value(value) {
    this.proxy.__value = value;
    this.onValueChanged(value);
  }

  get value() {
    return this.__value;
  }

  ready() {
    this.element.value = this.value;
    this.element.addEventListener("value-changed", (e) => {
      this.value = e.detail.value;
    });
    if (this.widget.webComponent) {
      this.__setElementProperties();
    }
  }

  onValueChanged(value) {
    if (this.element) {
      this.element.value = value;
    }
  }

  __setElementProperties() {
    let properties = metaData.getProperties(this.type) || [];
    for (let property of properties) {
      if (this.element && property.name in this.element.constructor.properties) {
        this.element[property.name] = this[property.name];
      }
    }
  }
}
