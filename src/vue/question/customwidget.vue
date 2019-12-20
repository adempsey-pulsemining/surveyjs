<template>
  <div :class="getClass()">
    <div v-if="hasHtml" v-html="customHtml"></div>
    <component v-if="hasDefaultRender" :is="componentName" :question="question" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Question } from "../../question";

export default {
  props: {
    question: Object as () => Question
  },
  computed: {
    hasDefaultRender() {
      return this.question.customWidget.isDefaultRender || this.hasVueComponent;
    },
    hasHtml() {
      return !!this.question.customWidget.htmlTemplate;
    },
    customHtml() {
      return this.question.customWidget.htmlTemplate;
    },
    hasVueComponent() {
      var options = (<any>Vue)["options"];
      if (!options) return false;
      return (options.components && options.components[this.question.customWidget.name]);
    },
    componentName() {
      if (this.hasVueComponent) return this.question.customWidget.name;
      return "survey-" + this.question.getTemplate();
    }
  },
  methods: {
    getClass() {
      return "sv_q_" + this.componentName;
    }
  },
  mounted() {
    this.question.customWidget.afterRender(this.question, this.$el);
  },
  beforeDestroy(): void {
    this.question.customWidget.willUnmount(this.question, this.$el);
  }
}
</script>
