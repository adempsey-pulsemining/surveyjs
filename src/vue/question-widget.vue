<template>
  <div class="sv_q_widget">
    <component v-if="isVueComponent" :is="widgetName" :question="question" />
    <div v-else :class="getClass" ref="customElement" v-html="question.html" />
  </div>
</template>

<script>
  import Vue from "vue";
  import QuestionMixin from "./mixins/question";

  export default Vue.extend({
    mixins: [QuestionMixin],
    name: "survey-widget",
    computed: {
      isVueComponent() {
        return Vue.options && Vue.options.components[this.widgetName];
      },
      widgetName() {
        return this.question.widgetName;
      },
      getClass() {
        return "sv_q_" + this.question.type;
      }
    },
    mounted() {
      let customElement = this.$refs["customElement"];
      if (customElement) {
        this.question.element = customElement.querySelector(this.widgetName);
      } else {
        this.question.element = this.$el;
      }
      if (!this.question.element) return;
      if (this.question.webComponentLoaded) {
        this.question.webComponentLoaded.then(() => this.question.ready());
      } else {
        this.question.ready();
      }
    }
  })
</script>
