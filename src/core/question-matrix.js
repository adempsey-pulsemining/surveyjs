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
		this.addCells();
	}

	addCells() {
		this.cells = {};
		this.rows.forEach((row, rowIndex) => {
			this.columns.forEach((col, colIndex) => {
				this.addCell(rowIndex, colIndex, col.cellType);
			});
		});
	}

	addCell(row, col, type) {
		let cell = new MatrixCell(this, row, col, type);
		this.cells[row] = this.cells[row] || {};
		this.cells[row][col] = cell;
	}

	getCell(row, col) {
		return this.cells[row][col];
	}

  isAnswered() {
		if (!this.multipleChoice) {
			return Object.keys(this.value).length === this.rows.length;
		}
		let answered = true;
		this.rows.forEach((row, rowIndex) => {
			this.columns.forEach((column, colIndex) => {
				let val = this.cells[rowIndex][colIndex].value;
				if (!val) {
					return answered = false;
				}
			});
		});
		return answered;
  }

  hasValue() {
		if (!this.multipleChoice) {
			return Object.keys(this.value).length > 0;
		}
		let hasValue = false;
		this.rows.forEach((row, rowIndex) => {
			this.columns.forEach((column, colIndex) => {
				let val = this.cells[rowIndex][colIndex].value;
				if (val) {
					hasValue = true;
				}
			});
		});
		return hasValue;
	}

	get value() {
		let value = {};
		this.rows.forEach((row, rowIndex) => {
			value[row.name] = value[row.name] || {};
			this.columns.forEach((column, colIndex) => {
				if (this.multipleChoice) {
					let val = this.cells[rowIndex][colIndex].value;
					if (val) {
						value[row.name][column.name] = val;
					}
				} else {
					if (row.value === column.name) {
						value[row.name] = column.name;
					}
				}
			});
		});
		return value;
	}

	get data() {
		let data = super.data;
		data.columns = this.columns;
		data.rows = this.rows;
		return data;
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
			{ name: "cellType", type: "string", default: "dropdown" }
		]);
  }

  constructor(item) {
		super(item, metaData.getProperties("matrixcolumn"));
		this.name = typeof item === "object" ? item.name : item;
		this.title = typeof item === "object" ? (item.title || item.value) : item;
  }
}

class MatrixCell {
	constructor(question, rowIndex, colIndex, type) {
		this.question = question;
		this.row = rowIndex;
		this.col = colIndex;
		this.type = type;
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
