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
    for (let element of survey.getAllElements().filter(x => x.visibleIf)) {
      this._processTrigger(survey, element);
    }
  }

  _processTrigger(survey, element) {
    if (!element.visibleIf) return;
    let expression = grammar.parse(element.visibleIf);
    console.log(expression);
    do {
      expression = this.__parseExpression(survey, expression);
      expression = expression.consumer(expression.left.value, expression.right.value);
    } while (typeof expression === "object");
    console.log(expression);
    element.visible = !!expression;
  }

  __parseExpression(survey, expression) {
    if (expression.left.getType() === "variable") {
      expression.left.value = this.getVariableValue(survey, expression.left.variableName);
    }
    if (expression.right.getType() === "variable") {
      expression.right.value = this.getVariableValue(survey, expression.right.variableName);
    }
    return expression;
  }

  getVariableValue(survey, variableName) {
    for (let element of survey.getAllElements()) {
      if (element.name === variableName) {
        return element.value;
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
