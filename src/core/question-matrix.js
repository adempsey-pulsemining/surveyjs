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
  }

  get value() {
		let value = {};
		for (const row of this.rows) {
			for (const column of this.columns) {
				if (row.value === column.name) {
					value[row.name] = column.name;
				}
			}
		}
		return value;
  }

  isAnswered() {
    return Object.keys(this.value).length === this.rows.length;
  }

  hasValue() {
    return Object.keys(this.value).length > 0;
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
		this.name = typeof item === "string" ? item : item.name;
		this.title = typeof item === "string" ? item : (item.title || item.name);
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
    return Base.properties.concat([]);
  }

  constructor(item) {
		super(item, metaData.getProperties("matrixcolumn"));
		this.name = typeof item === "string" ? item : item.name;
		this.title = typeof item === "string" ? item : (item.title || item.value);
  }
}

metaData.addClass(Matrix.definition);
metaData.addClass(MatrixRow.definition);
metaData.addClass(MatrixColumn.definition);
