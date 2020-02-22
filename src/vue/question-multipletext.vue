<template>
  <div class="sv_q_multipletext">
    <div role="group" :style="getStyle(question.inline)">
      <div v-for="(item, index) in question.items" :key="index">
        <label :for="getUniqueId(index)">{{item.title || item.name}}</label>
        <b-form-input :id="getUniqueId(index)"
                      :disabled="isReadOnly(item)"
                      :type="item.inputType"
                      v-model="item.value" lazy>
        </b-form-input>
      </div>
    </div>
  </div>
</template>

<script>
  import QuestionMixin from "./mixins/question";
  import { BFormInput } from "bootstrap-vue/src/components/form-input";

  export default Vue.extend({
    mixins: [QuestionMixin],
    name: "survey-multipletext",
    components: {
      BFormInput
    },
    data() {
      return {
        id: "",
      }
		},
    methods: {
			getStyle(inline) {
				let colCount = inline ? "auto-fit" : 1;
				return `display: grid; grid-template-columns: repeat(${colCount}, minmax(200px, 1fr))`;
			},
      isReadOnly(item) {
        return item.readOnly || this.question.isReadOnly();
      },
      getUniqueId(index) {
        return "sv_" + this.id + "_multipletext_" + index;
      }
    },
    mounted() {
      this.id = this.question.newGuid();
    },
    watch: {
      "question.value": function(newVal, oldVal) {
        this.question.survey.valueChanged(this.question, newVal, oldVal);
      }
    }
  });
</script>

<style>
  .sv_q_multipletext label {
    margin: 0;
  }

	.sv_q_multipletext > div {
		grid-gap: .75rem;
	}
</style>
