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
		  { name: "choices", type: "array", default: []}
    ]);
  }

  constructor(question) {
		super(question, metaData.getProperties("matrix"));
		this.rows = [];
		this.columns = [];
		for (let row of question.rows) {
			this.rows.push(new MatrixRow(row));
		}
		for (let column of question.columns) {
			this.columns.push(new MatrixColumn(column));
		}
		this.addCells(question);
	}

	get data() {
		let data = super.data;
		data.columns = this.columns;
		data.rows = this.rows;
		return data;
	}
	
	get value() {
		if (this.multipleChoice) {
			return this.cellsValue();
		} else {
			return this.getValue();
		}
	}

	addCells(question) {
		this.cells = {};
		this.rows.forEach((row, rowIndex) => {
			this.columns.forEach((col, colIndex) => {
				this.addCell(question, rowIndex, colIndex, col.cellType || question.cellType);
			});
		});
	}

	addCell(question, row, col, type) {
		let cell = new MatrixCell(question, row, col, type);
		cell.question = this;
		this.cells[row] = this.cells[row] || {};
		this.cells[row][col] = cell;
	}

	getCell(row, col) {
		return this.cells[row][col];
	}

  isAnswered() {
		if (!this.multipleChoice) {
			return Object.keys(this.value).length === this.rows.length;
		} else {
			return this.allCellsAnswered();
		}
	}
	
	allCellsAnswered() {
		let answered = true;
		this.rows.forEach((row, rowIndex) => {
			this.columns.forEach((column, colIndex) => {
				let val = this.cells[rowIndex][colIndex].value;
				if (val == null) {
					answered = false;
				}
			});
		});
		return answered;
	}

  hasValue() {
		if (!this.multipleChoice) {
			return Object.keys(this.value).length > 0;
		} else {
			return this.cellsHasValue();
		}
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

	get choices() {
		return this.question.choices;
	}
}

metaData.addClass(Matrix.definition);
metaData.addClass(MatrixRow.definition);
metaData.addClass(MatrixColumn.definition);
metaData.addClass(MatrixCell.definition);
