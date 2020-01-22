import { Base } from "./base";
import { metaData } from "./base";

export class Element extends Base {
  constructor(object, properties) {
    super(object, Element.definition.properties.concat(properties));
  }

  static isGroup(element) {
    return element && element.type === "group";
  }

  getType() {
    return Element.definition.type;
  }
}

const definition = {
  name: "Element",
  type: "element",
  properties: [
    { name: "id", required: true, type: "string", readOnly: true },
    { name: "name", required: true, type: "string" },
    { name: "title", required: false, type: "string" },
    { name: "type", required: true, type: "string", readOnly: true },
  ]
};

Element.definition = definition;
metaData.addClass(definition);
