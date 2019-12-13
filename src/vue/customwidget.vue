<template>
  <div>
    <div v-if="hasHtml" v-html="customHtml"></div>
    <component v-if="hasDefaultRender" :is="componentName" :question="question" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { default as Question } from "./question";

export default {
  mixins: [Question],
  computed: {
    hasDefaultRender: {
      get() {
        return this.question.customWidget.isDefaultRender || this.hasVueComponent;
      }
    },
    hasHtml: {
      get() {
        return this.question.customWidget.htmlTemplate ? true : false;
      }
    },
    customHtml: {
      get() {
        return this.question.customWidget.htmlTemplate;
      }
    },
    hasVueComponent: {
      get() {
        var options = (<any>Vue)["options"];
        if (!options) return false;
        return (options.components && options.components[this.question.customWidget.name]);
      }
    },
    componentName: {
      get() {
        if (this.hasVueComponent) return this.question.customWidget.name;
        return "survey-" + this.question.getTemplate();
      }
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
