export default {
  props: {
    question: {
      type: Object,
      required: true
    }
  },
  computed: {
    choices() {
      if (!this.question.choices) {
        return;
      }
      return this.question.choices.map(function(x) {
        if (typeof x === "object") {
          return {
            name: x.name || x.value,
            title: x.title || x.text || x.name
          }
        }
        else {
          return { name: x, title: x }
        }
      });
    }
  }
}
