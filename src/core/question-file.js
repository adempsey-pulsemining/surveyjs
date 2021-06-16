import { Question } from "./question";
import { metaData } from "./base";

export class File extends Question {
  static get definition() {
    return {
      name: "File",
      type: "file",
      properties: File.properties
    }
  }

  static get properties() {
    return Question.properties.concat([
      "maxSize",
      "imageHeight",
      "imageWidth",
      { name: "showPreview", type: "boolean", default: true },
      { name: "storeDataAsText", type: "boolean", default: true },
    ])
  }

  constructor(question) {
    super(question, metaData.getProperties("file"));
    this.value = null;
  }

  loadFiles(src) {
    let fileReader = new FileReader();
    console.log(src.files[0])
    if (this.maxSize && src.files[0].size > Number.parseInt(this.maxSize)) {
      alert("Maximum file size is " + this.maxSize + " bytes.");
      src.value = "";
      return;
    }
    fileReader.onload = e => {
      console.log(e);
      this.value = e.target.result;
    };
    fileReader.readAsDataURL(src.files[0]);
  }

  get value() {
    return this.__value;
  }

  set value(val) {
    super.value = val;
  }
}

metaData.addClass(File.definition);
