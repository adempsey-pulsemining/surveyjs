import { newGuid } from "./utilities";

/**
 * Defines the various classes and their properties.
 * @type {{classes: [], hasClass(*): boolean, getClassName(*): (string|*), addClass(*=): void}}
 */
export var metaData = {
  classes: [],
  addClass(newClass) {
    this.classes.push(newClass);
  },
  hasClass(myClass) {
    return this.classes.findIndex(x => x.type === myClass) >= 0;
  },
  getClassName(type) {
    let obj = this.classes.find(x => x.type === type);
    if (!obj) return "";
    return obj.name;
  }
};

export class Base {
  constructor(object, properties) {
    this.__setProperties(object, Base.definition.properties.concat(properties));
  }
  /**
   * Public methods
   */

  newGuid() {
    return newGuid();
  }

  /**
   * Private methods
   */

  // maps properties defined on the template to instance of an object
  __setProperties(object, properties) {
    Object.keys(object).forEach(key => {
      let property = properties.find(x => x.name === key);
      property.fromTemplate = property.fromTemplate === undefined ? true : property.fromTemplate;
      if (!property.fromTemplate) return;
      this.__setProperty(property, key, object[key]);
    });
  }

  __setProperty(property, key, value) {
    if (!property || !key) return;
    Object.defineProperty(this, key, {
      get() {
        return value != null ? value : property.default;
      }
    });
  }
}

Base.definition = {
  name: "Base",
  type: "base",
  properties: []
};
