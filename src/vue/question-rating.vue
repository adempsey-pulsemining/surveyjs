<template>
  <div class="sv_q_rating">
    <b-form-radio-group v-model="question.value"
                        size="lg"
                        button-variant="outline-primary"
                        buttons
                        style="display: flex">
      <b-form-radio v-for="(item) in rateValues" :value="item.value" :disabled="question.isReadOnly() && item.value != question.value">{{item.text}}</b-form-radio>
    </b-form-radio-group>
  </div>
</template>

<script>
  import { BFormRadioGroup } from "bootstrap-vue/src/components/form-radio";
  import { BFormRadio } from "bootstrap-vue/src/components/form-radio";
  import QuestionMixin from "./mixins/question";

  export default Vue.extend({
    mixins: [QuestionMixin],
    name: "survey-rating",
    components: {
      BFormRadioGroup,
      BFormRadio
    },
    computed: {
      isReadMode() {
        return this.question.survey && this.question.survey.isDisplayMode('read');
      },
      rateValues() {
        return this.question.getFixedValues();
      }
    }
  })
</script>

<style>
  .sv_q_rating input[type=radio] {
    left: 0;
  }
</style>
