import { Question } from "./question";
import { metaData, Base } from "./base";
import { Dropdown } from "./question-dropdown";
import { Boolean } from "./question-boolean";
import { Checkbox} from "./question-checkbox";
import { Radio} from "./question-radio";

export class Matrix extends Question {
  static get definition() {
    return {
      name: "Matrix",
      type: "matrix",
      properties: Matrix.properties
    }
  }

  static get properties() {
    return Question.properties.concat([
			{ name: "cellType", type: "string", default: "dropdown" },
			{ name: "multipleChoice", type: "boolean", default: false },
		  { name: "choices", type: "array", default: []},
		  { name: "dynamic", type: "boolean", default: false}
    ]);
  }

  constructor(question) {
		super(question, metaData.getProperties("matrix"));
		this.rows = [];
		this.columns = [];
		for (let row of question.rows || []) {
			this.rows.push(new MatrixRow(this, row));
		}
		for (let column of question.columns || []) {
			this.columns.push(new MatrixColumn(column));
		}
		if (this.dynamic && !this.rowCount) {
			this.rowCount = 2;
		}
		for (let i = 0; i < this.rowCount; ++i) {
			this.rows.push(new MatrixRow(this));
		}
		if (this.multipleChoice || this.dynamic) {
			this._addCells(question);
		}
	}

	set survey(val) {
  	this.__survey = val;
		(this.cells || []).forEach(row => {
			Object.keys(row).forEach(key => {
				row[key].survey = val;
			});
		});
	}

	get survey() {
  	return this.__survey;
	}

	get data() {
		let data = super.data;
		let rows = [], columns = [];
		this.rows.forEach(row => {
			rows.push({ name: row.name, title: row.title || "" });
		});
		this.columns.forEach(col => {
			columns.push({ name: col.name, title: col.title || "" });
		});
		if (!this.dynamic) {
			data.rows = rows;
		}
		data.columns = columns;
		return data;
	}

	set value(val) {
		super.value = val;
		if (this.dynamic) {
			this.setDynamicValue(val);
		} else if (this.multipleChoice) {
			this.setCellsValue(val);
		} else {
			this.setValue(val);
		}
	}

	get value() {
  	if (this.dynamic) {
  		return this.dynamicValue();
		}
		if (this.multipleChoice) {
			return this.cellsValue();
		} else {
			return this.getValue();
		}
	}

	setDynamicValue(val) {
		val = val || [];
		val.forEach((row, rowIndex) => {
			this.columns.forEach((column, colIndex) => {
				if (!this.cells[rowIndex]) {
					this.rows.push(new MatrixRow(this));
					this._addCellsForRow(this, rowIndex);
				}
				if (val[rowIndex][column.name]) {
					this.cells[rowIndex][colIndex].value = val[rowIndex][column.name];
				}
			});
		});
	}

	setCellsValue(val) {
  	val = val || {};
  	this.rows.forEach((row, rowIndex) => {
			this.columns.forEach((column, colIndex) => {
				if (val[row.name] && val[row.name][column.name]) {
					this.cells[rowIndex][colIndex].value = val[row.name][column.name];
				}
			});
		});
	}

	setValue(val) {
  	val = val || {};
  	this.rows.forEach(row => {
			this.columns.forEach(column => {
				if (val[row.name] && column.name === val[row.name]) {
					row.value = val[row.name];
				}
			});
		});
	}

	_addCells(question) {
		this.cells = [];
		this.rows.forEach((row, rowIndex) => {
			this._addCellsForRow(question, rowIndex);
		});
	}

	_addCellsForRow(question, rowIndex) {
		this.cells.push({});
		this.columns.forEach((col, colIndex) => {
			this._addCell(question, rowIndex, colIndex, col.cellType || question.cellType);
		});
	}

	_addCell(question, row, col, type) {
		this.cells[row][col] = new MatrixCell(this, question, row, col, type);
	}

	getCell(row, col) {
		return this.cells[row][col];
	}

  isAnswered() {
		if (this.multipleChoice || this.dynamic) {
			return this.allCellsAnswered();
		} else {
			return this.rowsAnswered();
		}
	}

	rowsAnswered() {
		let answered = true;
		for (let row in this.value) {
			if (this.value[row] == null) {
				answered = false;
			}
		}
		return answered;
	}
	
	allCellsAnswered() {
		let answered = true;
		this.rows.forEach((row, rowIndex) => {
			this.columns.forEach((column, colIndex) => {
				let cell = this.cells[rowIndex][colIndex];
				if (!cell.isAnswered()) {
					answered = false;
				}
			});
		});
		return answered;
	}

  hasValue() {
		if (this.multipleChoice || this.dynamic) {
			return this.cellsHasValue();
		} else {
			return this.rowHasValue();
		}
	}

	rowHasValue() {
		for (let row in this.value) {
			if (Object.keys(this.value[row]).length) {
				return true;
			}
		}
		return false;
	}

	cellsHasValue() {
		let hasValue = false;
		this.rows.forEach((row, rowIndex) => {
			this.columns.forEach((column, colIndex) => {
				let val = this.cells[rowIndex][colIndex].value;
				if (val != null) {
					hasValue = true;
				}
			});
		});
		return hasValue;
	}

	dynamicValue() {
  	let value = [];
		this.rows.forEach((row, rowIndex) => {
			value.push({});
			this.columns.forEach((column, colIndex) => {
				let val = this.cells[rowIndex][colIndex].cloneValue;
				if (val) {
					value[rowIndex][column.name] = val;
				}
			});
		});
		return value;
	}

	getValue() {
		let value = {};
		this.rows.forEach((row) => {
			value[row.name] = value[row.name] || {};
			this.columns.forEach((column) => {
				if (row.value === column.name) {
					value[row.name] = column.name;
				}
			});
		});
		return value;
	}

	cellsValue() {
		let value = {};
		this.rows.forEach((row, rowIndex) => {
			value[row.name] = value[row.name] || {};
			this.columns.forEach((column, colIndex) => {
				let val = this.cells[rowIndex][colIndex].cloneValue;
				if (val) {
					value[row.name][column.name] = val;
				}
			});
		});
		return value;
	}

	addRow() {
  	this.cells.push({});
		this.rows.push(new MatrixRow(this));
		this.columns.forEach((col, colIndex) => {
			this._addCell(this, this.rows.length - 1, colIndex, col.cellType || this.cellType);
		});
		++this.rowCount;
	}

	removeRow(index) {
    this.cells.splice(index, 1);
		this.rows.splice(index, 1);
		--this.rowCount;
	}
}

class MatrixRow extends Base {
  static get definition() {
    return {
      name: "MatrixRow",
      type: "matrixrow",
      properties: MatrixRow.properties
    }
  }

  static get properties() {
    return Base.properties.concat([]);
  }

  constructor(question, item) {
		super(item, metaData.getProperties("matrixrow"));
		var that = this;
		this.question = question;
		var proxyHandler = {
			set(obj, prop, val) {
				return that.__rowPropChanged(obj, prop, val);
			}
		};
		this.proxy = new Proxy(this, proxyHandler);
		this.value = null;
		this.name = typeof item === "object" ? item.name : item;
		this.title = typeof item === "object" ? (item.title || item.name) : item;
  }

  set value(val) {
  	if (val !== this.proxy.__value) {
			this.proxy.__value = val;
		}
	}

	get value() {
  	return this.proxy.__value;
	}

	__rowPropChanged(obj, prop, val) {
		obj[prop] = val;
		if (prop === "__value" && !this.question.dynamic) {
			this.question.valueChanged(this.question.cloneValue);
		}
		return true;
	}
}

class MatrixColumn extends Base {
	static get definition() {
    return {
      name: "MatrixColumn",
      type: "matrixcolumn",
      properties: MatrixColumn.properties
    }
  }

  static get properties() {
    return Base.properties.concat([
			{ name: "cellType", type: "string", default: "" }
		]);
  }

  constructor(item) {
		super(item, metaData.getProperties("matrixcolumn"));
		this.name = typeof item === "object" ? item.name : item;
		this.title = typeof item === "object" ? (item.title || item.value) : item;
  }
}

class MatrixCell extends Base {
	static get definition() {
    return {
      name: "MatrixCell",
      type: "matrixcell",
      properties: MatrixCell.properties
    }
  }

  static get properties() {
    return Base.properties.concat([]);
	}
	
	constructor(q, question, rowIndex, colIndex, type) {
		super(question, metaData.getProperties(type));
		this.question = q;
		var that = this;
		var proxyHandler = {
			set(obj, prop, val) {
				return that.__cellPropChanged(obj, prop, val);
			}
		};
		this.proxy = new Proxy(this, proxyHandler);
		this.value = null;
		this.row = rowIndex;
		this.col = colIndex;
		this.cellType = type;
	}

	set value(val) {
		if (val !== this.proxy.__value) {
			this.proxy.__value = val;
		}
	}

	get value() {
		return this.proxy.__value;
	}

	get cloneValue() {
		let value = this.value;
		if (this.cellType === "checkbox" && value) {
			value = value.slice(0, value.length);
		}
		return value;
	}

	isReadOnly() {
		return this.question.isReadOnly();
	}

	isAnswered() {
		switch (this.cellType) {
			case "radio": return Radio.IsAnswered(this.value);
			case "dropdown": return Dropdown.IsAnswered(this.value);
			case "checkbox": return Checkbox.IsAnswered(this.value);
			case "boolean": return Boolean.IsAnswered(this.value);
			default: return !!this.value;
		}
	}

	get choices() {
		return this.question.choices;
	}

	__cellPropChanged(obj, prop, val) {
		obj[prop] = val;
		if (prop === "__value" && val != null) {
			this.question.valueChanged(this.question.cloneValue);
		}
		return true;
	}
}

metaData.addClass(Matrix.definition);
metaData.addClass(MatrixRow.definition);
metaData.addClass(MatrixColumn.definition);
metaData.addClass(MatrixCell.definition);
