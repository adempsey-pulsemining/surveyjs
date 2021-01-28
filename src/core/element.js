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
      "!name",
      "!type",
      "title",
			"isRequired:boolean",
			"pageBreakBefore:boolean",
			"pageBreakAfter:boolean",
      "hideInPdf:boolean",
      "hideInPdfIfEmpty:boolean",
      "visibleIf",
      "enableIf",
      "titleColour",
      "titleLocation",
      { name: "readOnly", type: "boolean", writable: true },
      { name: "visible", type: "boolean", default: true, writable: true }
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
	
	required() {
		return this.isRequired || (this.group && this.group.isRequired);
	}
}

metaData.addClass(Element.definition);
