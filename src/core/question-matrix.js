import { Question } from "./question";
import { metaData, Base } from "./base";

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
			this.rows.push(new MatrixRow(row));
		}
		for (let column of question.columns || []) {
			this.columns.push(new MatrixColumn(column));
		}
		if (this.dynamic && !this.rowCount) {
			this.rowCount = 2;
		}
		for (let i = 0; i < this.rowCount; ++i) {
			this.rows.push(new MatrixRow());
		}
		if (this.multipleChoice || this.dynamic) {
			this.addCells(question);
		}
	}

	get data() {
		let data = super.data;
		data.columns = this.columns;
		data.rows = this.rows;
		return data;
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

	addCells(question) {
		this.cells = [];
		this.rows.forEach((row, rowIndex) => {
			this.cells.push({});
			this.columns.forEach((col, colIndex) => {
				this.addCell(question, rowIndex, colIndex, col.cellType || question.cellType);
			});
		});
	}

	addCell(question, row, col, type) {
		let cell = new MatrixCell(question, row, col, type);
		cell.question = this;
		this.cells[row][col] = cell;
	}

	getCell(row, col) {
		return this.cells[row][col];
	}

  isAnswered() {
		if (this.multipleChoice) {
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
		if (this.multipleChoice) {
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
				let val = this.cells[rowIndex][colIndex].value;
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
				let val = this.cells[rowIndex][colIndex].value;
				if (val) {
					value[row.name][column.name] = val;
				}
			});
		});
		return value;
	}

	addRow() {
  	this.cells.push({});
		this.rows.push(new MatrixRow());
		this.columns.forEach((col, colIndex) => {
			this.addCell(this, this.rows.length - 1, colIndex, col.cellType || this.cellType);
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

  constructor(item) {
		super(item, metaData.getProperties("matrixrow"));
		this.value = null;
		this.name = typeof item === "object" ? item.name : item;
		this.title = typeof item === "object" ? (item.title || item.name) : item;
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
	
	constructor(question, rowIndex, colIndex, type) {
		super(question, metaData.getProperties(type));
		this.value = null;
		this.row = rowIndex;
		this.col = colIndex;
		this.cellType = type;
	}

	isReadOnly() {
		return this.question.isReadOnly();
	}

	isAnswered() {
		return !!this.value;
	}

	get choices() {
		return this.question.choices;
	}
}

metaData.addClass(Matrix.definition);
metaData.addClass(MatrixRow.definition);
metaData.addClass(MatrixColumn.definition);
metaData.addClass(MatrixCell.definition);
