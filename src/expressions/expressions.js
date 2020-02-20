import { isEqual } from "lodash";

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

  getCorrectValue(value) {
    if (!value || typeof value != "string") return value;
    if (this.isBooleanValue(value)) return value.toLowerCase() === "true";
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

OperandMaker.binaryFunctions = {
  arithmeticOp(operatorName) {
    return function(a, b) {
      if (OperandMaker.isValueEmpty(a) && !OperandMaker.isSpaceString(a)) {
        a = typeof b === "string" ? "" : 0;
      }
      if (OperandMaker.isValueEmpty(b) && !OperandMaker.isSpaceString(b)) {
        b = typeof a === "string" ? "" : 0;
      }
      let consumer = OperandMaker.binaryFunctions[operatorName];
      return consumer == null ? null : consumer.call(this, a, b);
    };
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
    return isEqual(left, right);
  },
  notequal: function(left, right) {
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
    var rightArray = Array.isArray(right) ? right : [right];
    for (var rIndex = 0; rIndex < rightArray.length; rIndex++) {
      var i = 0;
      right = rightArray[rIndex];
      for (; i < left.length; i++) {
        if (isEqual(left[i], right)) {
          break;
        }
      }
      if (i == left.length) {
        return !isContains;
      }
    }
    return isContains;
  }
};
