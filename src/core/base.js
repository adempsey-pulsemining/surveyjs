import { newGuid } from "./utilities";
import grammar from "../expressions/grammar.pegjs";

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
  addCustomWidget(type, properties, widget) {
    if (this.properties[type]) {
      throw new Error("There already exists a class with type " + type);
    }
    let newClass = {
      name: "Widget",
      type: type,
      properties: properties,
    };
    newClass.properties = this.getProperties("question").concat(newClass.properties);
    newClass.widget = widget;
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
		let prop = {
			name: name,
			type: type || "string"
		};
		if (required) {
			prop.required = true;
		}
    return prop;
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

  doTriggers(survey) {
    for (let element of survey.currentPage.getAllElements()) {
      if (element.visibleIf) {
        element.visible = this._processTrigger(survey, element.visibleIf);
      }
      if (element.enableIf) {
        element.readOnly = !this._processTrigger(survey, element.enableIf);
      }
    }
  }

  _processTrigger(survey, trigger) {
    if (!trigger) return;
    this.__expressionCache = this.__expressionCache || {};
    let expression;
    if (!this.__expressionCache[trigger]) {
      expression = grammar.parse(trigger);
    } else {
      expression = this.__expressionCache[trigger]
		}
    return !!expression.evaluate(survey.data);
  }

  getVariableValue(survey, variableName) {
    for (let element of survey.getAllElements()) {
      if (element.name === variableName) {
        return typeof element.value === "object" ? JSON.parse(JSON.stringify(element.value)) : element.value;
      }
    }
    return null;
  }


  /**
   * Private methods
   */

  // maps properties defined on the template to instance of an object
  __setProperties(object, properties) {
    for (let property of properties) {
			let value = object[property.name];
			this.__setProperty(property, property.name, value);
    }
  }

  __setProperty(property, key, value) {
		if (!property || !key) return;
		let val = value;
		if (val == null && property.default != null) {
			val = property.default;
		}
		if (!property.writable) {
		  this.__setReadonlyProp(key, val);
    } else {
      this[property.name] = val;
    }
  }

  __setReadonlyProp(key, val) {
    Object.defineProperty(this, key, {
      get() {
        return val;
      }
    });
  }
}

metaData.addClass(Base.definition);
