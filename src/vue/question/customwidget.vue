<template>
  <div :class="className">
    <component v-if="hasVueComponent"
               :is="componentName"
               :question="question"
               :value="question.value"
               :readonly="question.survey.isDisplayMode"
               :customProps="customProps"
               @change="valueChanged"
    />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Question } from "../../question";

export default {
  props: {
    question: Object as () => Question,
  },
  data() {
    return {
      customProps: <Object>[]
    }
  },
  computed: {
    className() {
      return "sv_q_" + this.name.replace("-", "_");
    },
    name() {
      return this.question.customWidget.name;
    },
    hasVueComponent() {
      var options = (<any>Vue)["options"];
      if (!options) return false;
      return (options.components && options.components["survey-" + this.name]);
    },
    componentName() {
      if (this.hasVueComponent) return "survey-" + this.name;
      return "survey-" + this.question.getTemplate();
    }
  },
  methods: {
    valueChanged(value: any) {
      this.question.value = value;
    }
  },
  mounted() {
    this.question.customWidget.afterRender(this.question, this);
  },
  beforeDestroy(): void {
    this.question.customWidget.willUnmount(this.question, this.$el);
  }
}
</script>
