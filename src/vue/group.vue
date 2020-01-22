<template>
  <div class="sv_group">
    <div class="sv_group_title">{{group.title}}</div>
    <component v-for="(question, index) in group.questions" is="survey-question" :question="question" :key="index"></component>
  </div>
</template>

<script>
  import QuestionVue from "./question.vue";

  export default {
    components: {
      "survey-question": QuestionVue
    },
    props: {
      survey: Object,
      group: Object
    }
  }
</script>
