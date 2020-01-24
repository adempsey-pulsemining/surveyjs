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
  import TextVue from "./question-text.vue";
  import QuestionVue from "./question.vue";
  import BooleanVue from "./question-boolean.vue";
  import CheckboxVue from "./question-checkbox.vue";

  export default {
    components: {
      "survey-text": TextVue,
      "survey-question": QuestionVue,
      "survey-boolean": BooleanVue,
      "survey-checkbox": CheckboxVue
    },
    props: {
      question: Object
    },
    computed: {
      componentName() {
        return "survey-" + this.question.type;
      }
    }
  }
</script>
