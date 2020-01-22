<template>
  <div class="sv_q">
    <div class="sv_q_header">
      <span>{{question.no}}. {{question.title}}</span>
    </div>
    <div class="sv_q_body">
      <component :is="componentName" :question="question" />
    </div>
  </div>
</template>

<script>
  import TextVue from "./text.vue";
  import QuestionVue from "./question.vue";

  export default {
    components: {
      "survey-text": TextVue,
      "survey-question": QuestionVue
    },
    props: {
      question: Object
    },
    computed: {
      componentName() {
        return "survey-" + this.question.getType();
      }
    }
  }
</script>
