<template>
  <div class="sv_q_widget">
    <component v-if="!hasHtml" :is="widgetName" :question="question" />
    <div :class="getClass" ref="customElement" v-else v-html="question.html" />
  </div>
</template>

<script>
  import QuestionMixin from "./mixins/question";

  export default Vue.extend({
    mixins: [QuestionMixin],
    name: "survey-widget",
    computed: {
      widgetName() {
        return this.question.widgetName || "";
      },
      hasHtml() {
        return !!this.question.html;
      },
      widget() {
        return this.question.widget
      },
      webComponent() {
        return this.question.webComponent;
      },
      getClass() {
        return "sv_q_" + this.question.type;
      }
    },
    mounted() {
      let customElement = this.$refs["customElement"];
      if (customElement) {
        this.question.element = customElement.querySelector(this.webComponent);
      } else {
        this.question.element = this.$el;
      }
      if (!this.question.element) return;
      this.question.ready();
    }
  })
</script>
