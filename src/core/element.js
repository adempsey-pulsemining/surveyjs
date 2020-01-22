import { Base } from "./base";
import { metaData } from "./base";

export class Element extends Base {
  static get definition() {
    return {
      name: "Element",
      type: "element",
      properties: Element.properties
    }
  }

  static get properties() {
    return Base.properties.concat([
      { name: "id", required: true, type: "string", readOnly: true },
      { name: "name", required: true, type: "string" },
      { name: "title", required: false, type: "string" },
      { name: "type", required: true, type: "string", readOnly: true },
      { name: "readOnly", required: false, type: "boolean" },
    ])
  }

  constructor(object, properties) {
    super(object, properties || metaData.getProperties("element"));
    if (!this.title) {
      this.title = this.name;
    }
  }

  static isGroup(element) {
    return element && element.type === "group";
  }

  getType() {
    return Element.definition.type;
  }

  isReadOnly() {
    return this.readOnly || this.survey.readOnly || (this.group && this.group.readOnly) || (this.page && this.page.readOnly);
  }
}

metaData.addClass(Element.definition);
