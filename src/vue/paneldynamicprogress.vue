<template>
  <div>
    <input type="range" v-if="question.isRangeShowing" min="0" :max="rangeMax" :value="question.currentIndex" style="width:25%;float:left;margin:5px" @change="changeRange" />
    <input type="button" v-if="question.isPrevButtonShowing" :value="question.panelPrevText" style="float:left;margin:5px" @click="prevPanelClick" />
    <input type="button" v-if="question.isNextButtonShowing" :value="question.panelNextText"  style="float:left;margin:5px" @click="nextPanelClick" />
    <input type="button" v-if="question.canAddPanel" :value="question.panelAddText" style="float:left;margin:5px" @click="addPanelClick"/>
  </div>
</template>

<script lang="ts">
import { QuestionPanelDynamic } from "../question_paneldynamic"

export default {
  props: {
    question: Object as () => QuestionPanelDynamic
  },
  computed: {
    rangeMax() {
      return this.question.panelCount - 1;
    }
  },
  methods: {
    addPanelClick() {
      this.question.addPanelUI();
    },
    prevPanelClick() {
      this.question.goToPrevPanel();
    },
    nextPanelClick() {
      this.question.goToNextPanel();
    },
    changeRange(event: any) {
      this.question.currentIndex = event.target.value;
    }
  }
}
</script>
