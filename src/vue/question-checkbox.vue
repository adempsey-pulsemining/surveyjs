<template>
  <div class="sv_q_checkbox">
    <b-form-checkbox-group v-model="value"
                           :options="choices"
                           value-field="name"
                           text-field="title"
                           size="lg"
                           :stacked="!question.inline"
                           :style="styleObject"
                           :disabled="question.isReadOnly()">
    </b-form-checkbox-group>
  </div>
</template>

<script>
  import { BFormCheckboxGroup } from "bootstrap-vue/src/components/form-checkbox";
  import QuestionMixin from "./mixins/question";

  export default Vue.extend({
    mixins: [QuestionMixin],
    name: "survey-checkbox",
    components: {
      BFormCheckboxGroup
    },
    computed: {
      value: {
        set(val) { this.question.value = val || [] },
        get() { return this.question.value || [] }
      },
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
