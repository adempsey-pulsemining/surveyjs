import { newGuid } from "./utilities";

/**
 * Defines the various classes and their properties.
 * @type {{classes: [], hasClass(*): boolean, getClassName(*): (string|*), addClass(*=): void}}
 */
export var metaData = {
  classes: [],
  properties: {},
  addClass(newClass) {
    let properties = [];
    newClass.properties = newClass.properties || [];
    for (let property of newClass.properties) {
      if (typeof property === "string") {
        property = this._createPropertyFromString(property);
      }
      properties.push(property);
    }
    newClass.properties = properties;
    this.classes.push(newClass);
    this.properties[newClass.type] = newClass.properties;
  },
  addProperty(className, property) {
    if (typeof property === "string") {
      property = this._createPropertyFromString(property);
    }
    for (let item of this.classes) {
      if (item.name === className) {
        item.properties.push(property);
      }
    }
    this.properties[className].push(property);
  },
  addProperties(className, properties) {
    for (let property of properties) {
      if (typeof property === "string") {
        property = this._createPropertyFromString(property);
      }
    }
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
  getClass(myClass) {
    return this.classes.find(x => x.type === myClass);
  },
  getClassName(type) {
    let obj = this.classes.find(x => x.type === type);
    if (!obj) return "";
    return obj.name;
  },
  addCustomWidget(type, properties) {
    if (this.properties[type]) {
      throw new Error("There already exists a class with type " + type);
    }
    let newClass = {
      name: "Widget",
      type: type,
      properties: properties,
    };
    newClass.properties = this.getProperties("question").concat(newClass.properties);
    this.addClass(newClass);
  },
  getWidget(name) {
    let myClass = this.getClass(name);
    if (myClass) {
      return myClass.widget;
    }
  },
  _createPropertyFromString(property) {
    let required = property.startsWith("!");
    if (required) {
      property = property.split("!")[1];
    }
    property = property.split(":");
    let name = property[0];
    let type = property[1];
    return { name: name, type: type || "string", required: required || false }
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
      this.__setProperty(property, property.name, object[property.name]);
    }
  }

  __setProperty(property, key, value) {
    if (!property || !key) return;
    let val = value != null ? value : property.default;
    let attributes = {
      get() {
        return val;
      }
    };
    Object.defineProperty(this, key, attributes);
  }
}

metaData.addClass(Base.definition);
