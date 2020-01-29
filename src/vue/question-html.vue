<template>
  <div class="sv_q_html">
    <div v-if="hasHtml" v-html="question.html"></div>
  </div>
</template>

<script>
  import QuestionMixin from "./mixins/question";

  export default Vue.extend({
    mixins: [QuestionMixin],
    name: "survey-html",
    computed: {
      hasHtml() {
        return !!this.question.html;
      }
    }
  });
</script>
