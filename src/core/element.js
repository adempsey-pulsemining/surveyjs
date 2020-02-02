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
			"required:boolean",
			"pageBreakBefore:boolean",
			"pageBreakAfter:boolean"
    ])
	}
	
	static isGroup(element) {
    return element && element.type === "group";
  }

  constructor(object, properties) {
    super(object, properties || metaData.getProperties("element"));
  }

  isReadOnly() {
    return this.readOnly || this.survey.readOnly || (this.group && this.group.readOnly) || (this.page && this.page.readOnly);
	}
	
	isRequired() {
		return this.required || (this.group && this.group.required);
	}
}

metaData.addClass(Element.definition);
