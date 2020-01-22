import { newGuid } from "./utilities";

/**
 * Defines the various classes and their properties.
 * @type {{classes: [], hasClass(*): boolean, getClassName(*): (string|*), addClass(*=): void}}
 */
export var metaData = {
  classes: [],
  properties: {},
  addClass(newClass) {
    this.classes.push(newClass);
    this.properties[newClass.type] = newClass.properties;
  },
  addProperty(className, property) {
    for (let item of this.classes) {
      if (item.name === className) {
        item.properties.push(property);
      }
    }
    this.properties[className].push(property);
  },
  addProperties(className, properties) {
    for (let item of this.classes) {
      if (item.name === className) {
        item.properties = (item.properties || []).concat(properties);
      }
    }
    this.properties[className].properties = (this.properties[className].properties || []).concat(properties);
  },
  getProperties(className) {
    return this.properties[className] || [];
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
  static get definition() {
    return {
      name: "Base",
      type: "base",
      properties: Base.properties
    }
  }

  static get properties() {
    return []
  }

  constructor(object, properties) {
    this.__setProperties(object, properties || metaData.getProperties("base"));
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
    for (let property of properties) {
      if (!(property.name in object) && property.default == null) continue;
      property.fromTemplate = property.fromTemplate === undefined ? true : property.fromTemplate;
      if (!property.fromTemplate) continue;
      this.__setProperty(property, property.name, object[property.name]);
    }
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

metaData.addClass(Base.definition);
