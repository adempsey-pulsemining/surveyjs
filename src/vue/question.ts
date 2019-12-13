import { Question as QuestionModel } from "../question";

export default {
  props: {
    question: Object,
    css: Object
  },
  data() {
    return {
      innerValue: <any>null
    }
  },
  watch: {
    question(newVal: QuestionModel, oldVal: QuestionModel) {
      this.innerValue = null;
    }
  }
}
