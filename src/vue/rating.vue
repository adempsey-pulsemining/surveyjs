<template>
  <div>
    <div class="sv_q_rating">
      <label v-for="(item, index) in question.visibleRateValues" :key="item.value" :class="getCss(question, item)">
        <input type="radio" style="display: none;" :name="question.name" :id="question.name + index" :value="item.value" :disabled="question.isReadOnly" @change="change" v-bind:aria-label="item.locText.text"/>
        <span v-if="index === 0" class="sv_q_rating_min_text"><survey-string :locString="question.locMinRateDescription"/></span>
        <span class="sv_q_rating_item_text"><survey-string :locString="item.locText"/></span>
        <span v-if="index === question.visibleRateValues.length-1" class="sv_q_rating_max_text"><survey-string :locString="question.locMaxRateDescription"/></span>
      </label>
    </div>
    <survey-other-choice v-show="question.hasOther" :question="question"/>
  </div>
</template>

<script lang="ts">
import { default as Question } from "./question";
import { QuestionRatingModel } from "../question_rating";

export default {
  mixins: [Question],
  methods: {
    getCss(question: QuestionRatingModel, item:any) {
      let css = "sv_q_rating_item";
      if (question.value == item.value) {
        css = css + " " + "active";
      }
      return css;
    },
    change(e:any) {
      this.question.value = e.target.value;
    }
  }
}
</script>
