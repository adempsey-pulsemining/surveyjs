export class BinaryOperand {
  constructor(operatorName, left, right, isArithmeticOp = false) {
    this.operatorName = operatorName;
    this.left = left;
    this.right = right;
    this.isArithmeticValue = isArithmeticOp;
    if (isArithmeticOp) {
      this.consumer = OperandMaker.binaryFunctions["arithmeticOp"](operatorName);
    } else {
      this.consumer = OperandMaker.binaryFunctions[operatorName];
    }
    if (this.consumer == null) {
      OperandMaker.throwInvalidOperatorError(operatorName);
    }
  }

  getType() {
    return "binary";
  }

  get isArithmetic() {
    return this.isArithmeticValue;
  }

  get isConjunction() {
    return this.operatorName == "or" || this.operatorName == "and";
  }

  get conjunction() {
    return this.isConjunction ? this.operatorName : "";
  }

  get operator() {
    return this.operatorName;
  }

  get leftOperand() {
    return this.left;
  }

  get rightOperand() {
    return this.right;
  }

  evaluateParam(x, processValue) {
    return x == null ? null : x.evaluate(processValue);
  }

  evaluate(processValue) {
    return this.consumer.call(this, this.evaluateParam(this.left, processValue), this.evaluateParam(this.right, processValue));
  }

  toString(func) {
    if (!!func) {
      var res = func(this);
      if (!!res) return res;
    }
    return ("(" + OperandMaker.safeToString(this.left, func) + " " + OperandMaker.operatorToString(this.operatorName) + " " + OperandMaker.safeToString(this.right, func) + ")");
  }

  setVariables(variables) {
    if (this.left != null) this.left.setVariables(variables);
    if (this.right != null) this.right.setVariables(variables);
  }

  hasFunction() {
    return ((!!this.left && this.left.hasFunction()) || (!!this.right && this.right.hasFunction()));
  }
}

export class UnaryOperand {
  constructor(expressionValue, operatorName) {
    this.expressionValue = expressionValue;
    this.operatorName = operatorName;
    this.consumer = OperandMaker.unaryFunctions[operatorName];
    if (this.consumer == null) {
      OperandMaker.throwInvalidOperatorError(operatorName);
    }
  }

  get operator() {
    return this.operatorName;
  }

  get expression() {
    return this.expressionValue;
  }

  getType() {
    return "unary";
  }

  toString(func) {
    if (!!func) {
      var res = func(this);
      if (!!res) return res;
    }
    return (OperandMaker.operatorToString(this.operatorName) + " " + this.expression.toString(func));
  }

  evaluate(processValue) {
    let value = this.expression.evaluate(processValue);
    return this.consumer.call(this, value);
  }

  setVariables(variables) {
    this.expression.setVariables(variables);
  }
}

export class ArrayOperand {
  constructor(values) {
    this.values = values;
  }

  getType() {
    return "array";
  }

  toString(func) {
    if (!!func) {
      var res = func(this);
      if (!!res) return res;
    }
    return ("[" + this.values.map(function(el) {return el.toString(func);}).join(", ") + "]");
  }

  evaluate(processValue) {
    return this.values.map(function(el) {
      return el.evaluate(processValue);
    });
  }

  setVariables(variables) {
    this.values.forEach(el => {
      el.setVariables(variables);
    });
  }

  hasFunction() {
    return this.values.some(operand => operand.hasFunction());
  }
}

export class Const {
  constructor(value) {
    this.value = value;
  }

  getType() {
    return "const";
  }

  toString(func) {
    if (!!func) {
      var res = func(this);
      if (!!res) return res;
    }
    return this.value.toString();
  }

  get correctValue() {
    return this.getCorrectValue(this.value);
  }

  setVariables(variables) {}

  evaluate() {
    return this.getCorrectValue(this.value);
  }

  getCorrectValue(value) {
    if (!value || typeof value != "string") {
      return value;
    }
    if (this.isBooleanValue(value)) {
      return value.toLowerCase() === "true";
    }
    if (OperandMaker.isNumeric(value)) {
      if (value.indexOf("0x") == 0) return parseInt(value);
      return parseFloat(value);
    }
    return value;
  }

  isBooleanValue(value) {
    return (value && (value.toLowerCase() === "true" || value.toLowerCase() === "false"));
  }
}

export class Variable extends Const {
  constructor(variableName) {
    super(variableName);
    this.variableName = variableName;
  }

  getType() {
    return "variable";
  }

  toString(func) {
    if (!!func) {
      var res = func(this);
      if (!!res) return res;
    }
    return "{" + this.variableName + "}";
  }

  evaluate(processValue) {
		var value = null;
    Object.keys(processValue).forEach(key => {
      value = this.__getValue(key, processValue);
    });
    return this.getCorrectValue(value);
	}
	
	__getValue(key, processValue) {
		let value;
		if (processValue[key].name === this.variable) {
			value = processValue[key].value;
		} else if (processValue[key].name === this.variable.split(".")[0]) {
			value = this.__getObjectValue(processValue[key].value);
		}
		return value;
	}

	__getObjectValue(object) {
		let i = 1;
		let value = object[this.variable.split(".")[i++]];
		while (this.variable.split(".")[i]) {
			value = value[this.variable.split(".")[i++]];
		}
		return value;
	}

  get variable() {
    return this.variableName;
  }

  setVariables(variables) {
    variables.push(this.variableName);
  }
}

export class FunctionOperand {
  constructor(origionalValue, parameters) {
    this.origionalValue = origionalValue;
    this.isReadyValue = false;
    if (Array.isArray(parameters) && parameters.length === 0) {
      this.parameters = new ArrayOperand([]);
    }
  }

  getType() {
    return "function";
  }

  toString(func) {
    if (!!func) {
      var res = func(this);
      if (!!res) return res;
    }
    return this.origionalValue + "(" + this.parameters.toString(func) + ")";
  }

  setVariables(variables) {
    this.parameters.setVariables(variables);
  }

  get isReady() {
    return this.isReadyValue;
  }

  hasFunction() {
    return true;
  }
}

export class OperandMaker {
  static throwInvalidOperatorError(op) {
    throw new Error("Invalid operator: '" + op + "'");
  }

  static safeToString(operand, func) {
    return operand == null ? "" : operand.toString(func);
  }

  static toOperandString(value) {
    if (!!value && !OperandMaker.isNumeric(value) && !OperandMaker.isBooleanValue(value)) {
      value = "'" + value + "'";
    }
    return value;
  }

  static isSpaceString(str) {
    return !!str && !str.replace(" ", "");
  }

  static isNumeric(value) {
    if (!!value && (value.indexOf("-") > -1 || value.indexOf("+") > 1 || value.indexOf("*") > -1 || value.indexOf("^") > -1 || value.indexOf("/") > -1 || value.indexOf("%") > -1)) {
      return false;
    }
    if (OperandMaker.isSpaceString(value)) return false;
    return !isNaN(value);
  }

  static isBooleanValue(value) {
    return (!!value && (value.toLowerCase() === "true" || value.toLowerCase() === "false"));
  }

  static isValueEmpty(value) {
    if (Array.isArray(value) && value.length === 0) return true;
    if (value && (typeof value === "string" || value instanceof String)) {
      value = value.trim();
    }
    return !value && value !== 0 && value !== false;
  }

  static operatorToString(operatorName) {
    let opStr = OperandMaker.signs[operatorName];
    return opStr == null ? operatorName : opStr;
  }
}

OperandMaker.unaryFunctions = {
  empty: function(value) {
    return OperandMaker.isValueEmpty(value);
  },
  notempty: function(value) {
    return !OperandMaker.unaryFunctions.empty(value);
  },
  negate: function(value) {
    return !value;
  }
};

OperandMaker.signs = {
  less: "<",
  lessorequal: "<=",
  greater: ">",
  greaterorequal: ">=",
  equal: "==",
  notequal: "!=",
  plus: "+",
  minus: "-",
  mul: "*",
  div: "/",
  and: "and",
  or: "or",
  power: "^",
  mod: "%",
  negate: "!"
};

var toArithmeticOp = function(operatorName, a, b) {
  if (OperandMaker.isValueEmpty(a) && !OperandMaker.isSpaceString(a)) {
    a = typeof b === "string" ? "" : 0;
  }
  if (OperandMaker.isValueEmpty(b) && !OperandMaker.isSpaceString(b)) {
    b = typeof a === "string" ? "" : 0;
  }
  let consumer = OperandMaker.binaryFunctions[operatorName];
  return consumer == null ? null : consumer.call(this, a, b);
};

OperandMaker.binaryFunctions = {
  arithmeticOp(operatorName) {
    return function(a, b) { return toArithmeticOp(operatorName, a, b) }
  },
  and: function(a, b) {
    return a && b;
  },
  or: function(a, b) {
    return a || b;
  },
  plus: function(a, b) {
    return a + b;
  },
  minus: function(a, b) {
    return a - b;
  },
  mul: function(a, b) {
    return a * b;
  },
  div: function(a, b) {
    if (!b) return null;
    return a / b;
  },
  mod: function(a, b) {
    if (!b) return null;
    return a % b;
  },
  power: function(a, b) {
    return Math.pow(a, b);
  },
  greater: function(left, right) {
    if (left == null || right == null) return false;
    return left > right;
  },
  less: function(left, right) {
    if (left == null || right == null) return false;
    return left < right;
  },
  greaterorequal: function(left, right) {
    if (left == null || right == null) return false;
    return left >= right;
  },
  lessorequal: function(left, right) {
    if (left == null || right == null) return false;
    return left <= right;
  },
  equal: function(left, right) {
    if (Array.isArray(left) && Array.isArray(right) && left.length === right.length) {
      left = left.sort();
      right = right.sort();
    }
    return isEqual(left, right);
  },
  notequal: function(left, right) {
    if (Array.isArray(left) && Array.isArray(right) && left.length === right.length) {
      left = left.sort();
      right = right.sort();
    }
    return !isEqual(left, right);
  },
  contains: function(left, right) {
    return OperandMaker.binaryFunctions.containsCore(left, right, true);
  },
  notcontains: function(left, right) {
    if (!left && !OperandMaker.isValueEmpty(right)) return true;
    return OperandMaker.binaryFunctions.containsCore(left, right, false);
  },
  anyof: function(left, right) {
    if (!left && OperandMaker.isValueEmpty(right)) return true;
    if (!left || (!Array.isArray(left) && left.length === 0)) return false;
    if (OperandMaker.isValueEmpty(right)) return true;
    if (!Array.isArray(left)) {
      return OperandMaker.binaryFunctions.contains(right, left);
    }
    if (!Array.isArray(right)) {
      return OperandMaker.binaryFunctions.contains(left, right);
    }
    for (var i = 0; i < right.length; i++) {
      if (OperandMaker.binaryFunctions.contains(left, right[i])) return true;
    }
    return false;
  },
  allof: function(left, right) {
    if (!left && !OperandMaker.isValueEmpty(right)) return false;
    if (!Array.isArray(right)) {
      return OperandMaker.binaryFunctions.contains(left, right);
    }
    for (var i = 0; i < right.length; i++) {
      if (!OperandMaker.binaryFunctions.contains(left, right[i])) {
        return false;
      }
    }
    return true;
  },
  containsCore: function(left, right, isContains) {
    if (!left) return false;
    if (!left.length) {
      left = left.toString();
    }
    if (typeof left === "string" || left instanceof String) {
      if (!right) return false;
      right = right.toString();
      var found = left.indexOf(right) > -1;
      return isContains ? found : !found;
    }
    return OperandMaker.binaryFunctions.containsCoreArray(left, right, isContains);
  },
  containsCoreArray: function(left, right, isContains) {
    var rightArray = Array.isArray(right) ? right : [right];
    var leftArray = Array.isArray(left) ? left : [left];
    return isContains ? rightArray.every(x => leftArray.includes(x)) : !rightArray.every(x => leftArray.includes(x));
  }
};

// taken from https://vanillajstoolkit.com/helpers/isequal/
var isEqual = function (value, other) {

  // Get the value type
  var type = Object.prototype.toString.call(value);

  // If the two objects are not the same type, return false
  if (type !== Object.prototype.toString.call(other)) return false;

  // If items are not an object or array, return false
  if (['[object Array]', '[object Object]'].indexOf(type) < 0) return false;

  // Compare the length of the length of the two items
  var valueLen = type === '[object Array]' ? value.length : Object.keys(value).length;
  var otherLen = type === '[object Array]' ? other.length : Object.keys(other).length;
  if (valueLen !== otherLen) return false;

  // Compare two items
  var compare = function (item1, item2) {

    // Get the object type
    var itemType = Object.prototype.toString.call(item1);

    // If an object or array, compare recursively
    if (['[object Array]', '[object Object]'].indexOf(itemType) >= 0) {
      if (!isEqual(item1, item2)) return false;
    }

    // Otherwise, do a simple comparison
    else {

      // If the two items are not the same type, return false
      if (itemType !== Object.prototype.toString.call(item2)) return false;

      // Else if it's a function, convert to a string and compare
      // Otherwise, just compare
      if (itemType === '[object Function]') {
        if (item1.toString() !== item2.toString()) return false;
      } else {
        if (item1 !== item2) return false;
      }

    }
  };

  // Compare properties
  if (type === '[object Array]') {
    for (var i = 0; i < valueLen; i++) {
      if (compare(value[i], other[i]) === false) return false;
    }
  } else {
    for (var key in value) {
      if (value.hasOwnProperty(key)) {
        if (compare(value[key], other[key]) === false) return false;
      }
    }
  }

  // If nothing failed, return true
  return true;
};
