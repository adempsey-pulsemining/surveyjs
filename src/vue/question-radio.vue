<template>
  <div class="sv_q_radio">
    <b-form-radio-group v-model="question.value"
                        :stacked="!question.inline"
                        size="lg"
                        :style="styleObject">
      <b-form-radio
              v-for="(item) in choices"
              :value="item.name"
              :disabled="question.isReadOnly() && item.name != question.value">
        {{item.title}}
      </b-form-radio>
    </b-form-radio-group>
  </div>
</template>

<script>
	import { BFormRadioGroup } from "bootstrap-vue/src/components/form-radio";
  import { BFormRadio } from "bootstrap-vue/src/components/form-radio";
	import QuestionMixin from "./mixins/question";

  export default Vue.extend({
		mixins: [QuestionMixin],
		name: "survey-radio",
    components: {
      BFormRadioGroup,
      BFormRadio
    },
    computed: {
      styleObject() {
        if (this.question.inline || this.question.colCount <= 0) {
          return;
        }
        return {
          display: "grid",
          gridTemplateColumns: `repeat(${this.question.colCount}, minmax(100px, 1fr))`,
          gridGap: "1rem"
        }
      }
    },
  })
</script>
