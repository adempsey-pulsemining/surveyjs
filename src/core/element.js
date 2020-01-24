import { metaData, Base } from "./base";

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
      "!id",
      "!name",
      "!type",
      "title",
      "readOnly:boolean",
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

  isReadOnly() {
    return this.readOnly || this.survey.readOnly || (this.group && this.group.readOnly) || (this.page && this.page.readOnly);
  }
}

metaData.addClass(Element.definition);
