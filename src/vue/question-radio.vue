<template>
  <div class="sv_q_radio">
    <b-form-radio-group v-model="question.value"
                           :options="choices"
													 :stacked="!question.inline"
													 value-field="name"
													 text-field="title"
                           size="lg"
                           :style="styleObject"
													 :disabled="question.isReadOnly()">
    </b-form-radio-group>
  </div>
</template>

<script>
	import { BFormRadioGroup } from "bootstrap-vue/src/components/form-radio";
	import QuestionMixin from "./mixins/question";

  export default Vue.extend({
		mixins: [QuestionMixin],
		name: "survey-radio",
    components: {
      BFormRadioGroup
    },
    computed: {
      styleObject() {
        if (this.question.inline) {
          return;
        }
        if (this.question.colCount <= 0) return;
        return {
          display: "grid",
          gridTemplateColumns: `repeat(${this.question.colCount}, minmax(100px, 1fr))`,
          gridGap: "1rem"
        }
      }
    },
  })
</script>
