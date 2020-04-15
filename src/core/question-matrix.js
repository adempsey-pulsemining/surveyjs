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

	isMatrix() {
  	return true;
	}

	isSingleChoice() {
  	return !this.dynamic && !this.multipleChoice;
	}

	getRow(name) {
  	for (let row of this.rows) {
  		if (row.name === name) {
  			return row;
			}
		}
	}

	setRow(name, value) {
		for (let row of this.rows) {
			if (row.name === name) {
				row.value = value;
			}
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
		if (this.dynamic) {
			data.type = data.type + "_dynamic";
		} else if (this.multipleChoice) {
			data.type = data.type + "_multiple";
		}
		data.cells = this.getMatrixData();
		return data;
	}

	set value(val) {
		if (val === null) {
			if (!this.isSingleChoice()) {
				this.clearCells();
			}
		}
		super.value = val;
		if (this.dynamic) {
			this.setDynamicValue(val);
		} else if (this.multipleChoice) {
			this.setCellsValue(val);
		} else {
			this.setValue(val);
		}
	}

	setMetadata(cells) {
		cells = cells || [];
		cells.forEach(cell => {
			if (this.isSingleChoice() && cell.value) {
				this.getRow(cell.rowName).changedBy = cell.changedBy;
				this.getRow(cell.rowName).changedOn = cell.changedOn;
			} else if (this.cells && this.cells[cell.rowIndex]) {
				this.cells[cell.rowIndex][cell.columnIndex].changedBy = cell.changedBy;
				this.cells[cell.rowIndex][cell.columnIndex].changedOn = cell.changedOn;
			}
		});
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

	clearCells() {
  	if (!this.cells) return;
  	this.cells.forEach(cell => {
  		cell.value = null;
		});
	}

	getMatrixData() {
  	let cells = [];
    this.rows.forEach((row, rowIndex) => {
    	this.columns.forEach((col, colIndex) => {
    		let cellObj = this.getCellData(row, rowIndex, col, colIndex);
    		if (cellObj) {
					cells.push(cellObj);
				}
			});
		});
    return cells;
	}

	getCellData(row, rowIndex, col, colIndex) {
		let cell = this.cells && this.cells[rowIndex] && this.cells[rowIndex][colIndex] ? this.cells[rowIndex][colIndex] : {};
		let obj = {
			cellType: cell.cellType || col.cellType || "",
			rowName: row.name || "",
			rowTitle: row.title || row.name || "",
			rowSequence: this.getSequenceCharacter(rowIndex).toUpperCase(),
			rowIndex: rowIndex,
			columnName: col.name || "",
			columnTitle: col.title || col.name || "",
			columnSequence: this.getSequenceCharacter(colIndex).toUpperCase(),
			columnIndex: colIndex,
			value: cell.cloneValue || "",
			changedBy: cell.changedBy || "",
			changedOn: cell.changedOn || ""
		};
		if (this.isSingleChoice() && col.name === this.value[row.name]) {
			obj.value = this.value[row.name] || "";
			obj.changedBy = row.changedBy || "";
			obj.changedOn = row.changedOn || "";
		}
		if ((cell.isAnswered && !cell.isAnswered()) || !obj.value) {
			return null;
		}
		return obj;
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
				} else {
					this.cells[rowIndex][colIndex].value = null;
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
		if (!this.rows) return;
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
				if (Array.isArray(val) && val.length) {
					hasValue = true;
				} else if (val && typeof val === "object" && Object.keys(val).length) {
					hasValue = true;
				} else if (val != null && val !== "") {
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
		this.changedBy = "";
		this.changedOn = "";
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
			this.question.valueChanged(this.question.cloneValue, {
				name: this.name
			});
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
		this.proxy.__value = null;
		this.row = rowIndex;
		this.col = colIndex;
		if (type === "radiogroup") {
			type = "radio";
		}
		this.cellType = type;
		this.cellId = this.newGuid();
		this.changedBy = "";
		this.changedOn = null;
	}

	set value(val) {
		if (!val && !this.proxy.__value) return;
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
			case "radiogroup": return Radio.IsAnswered(this.value);
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
			this.question.valueChanged(this.question.cloneValue, {
				rowIndex: this.row,
				colIndex: this.col
			});
		}
		return true;
	}
}

metaData.addClass(Matrix.definition);
metaData.addClass(MatrixRow.definition);
metaData.addClass(MatrixColumn.definition);
metaData.addClass(MatrixCell.definition);
