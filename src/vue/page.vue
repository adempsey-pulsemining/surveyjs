<template>
  <div class="sv_page">
    <div class="sv_page_title">{{page.title}}</div>
    <div class="sv_page_row" v-for="element in page.getElements()">
      <component v-if="isGroup(element)" is="survey-group" :survey="survey" :group="element"></component>
      <component v-else is="survey-question" :question="element"></component>
    </div>
  </div>
</template>

<script>
  import { Element } from "../core/element";
  import SurveyGroup from "./group.vue";
  import Question from "./question.vue";

  export default {
    components: {
      "survey-group": SurveyGroup,
      "survey-question": Question
    },
    props: {
      page: Object,
      survey: Object,
    },
    methods: {
      isGroup(question) {
        return Element.isGroup(question);
      }
    }
  }
</script>
