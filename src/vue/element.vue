<template>
  <div class="sv_element">
    <div v-if="element.hasTitleOnLeftTop" :class="element.hasTitleOnLeft ? 'title-left' : ''">
      <h5 v-if="element.hasTitle" class="sv_q_title">
        <span v-if="element.no" style="position: static;" class="sv_q_num">{{element.no}}</span>
        <span v-if="element.no" style="position: static;">.&nbsp</span>
        <survey-string :locString="element.locTitle"/>
      </h5>
      <div v-if="!element.locDescription.isEmpty" class="sv_q_description">
        <survey-string :locString="element.locDescription"/>
      </div>
    </div>
    <div :class="element.hasTitleOnLeft ? 'content-left' : ''">
      <survey-errors v-if="hasErrorsOnTop" :question="element" :location="'top'"/>
      <component :is="getWidgetComponentName(element)" :question="element" />
      <div v-if="element.hasComment">
        <div>{{element.commentText}}</div>
        <survey-other-choice :question="element"/>
      </div>
      <survey-errors v-if="hasErrorsOnBottom" :question="element" :location="'bottom'"/>
      <h5 v-if="element.hasTitleOnBottom" class="sv_q_title">
        <span v-if="element.no" style="position: static;" class="sv_q_num">{{element.no}}</span>
        <span v-if="element.no" style="position: static;">.&nbsp</span>
        <survey-string :locString="element.locTitle"/>
      </h5>
      <div v-if="!element.locDescription.isEmpty" v-show="element.hasTitleOnBottom">
        <survey-string :locString="element.locDescription"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { IQuestion } from "../base";
import { Question } from "../question";

export default {
  props: {
    survey: Object,
    element: Object,
  },
  computed: {
    hasErrorsOnTop() {
      return !this.element.isPanel && this.survey.questionErrorLocation === "top";
    },
    hasErrorsOnBottom() {
      return (!this.element.isPanel && this.survey.questionErrorLocation === "bottom");
    }
  },
  methods: {
    getWidgetComponentName(element: Question) {
      return element.customWidget ? "survey-customwidget" : "survey-" + element.getTemplate();
    }
  },
  mounted() {
    if (this.survey && !this.element.isPanel) {
      this.survey.afterRenderQuestion(<IQuestion>this.element, this.$el);
    }
  }
}
</script>
