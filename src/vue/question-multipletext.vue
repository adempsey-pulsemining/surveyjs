<template>
  <div class="sv_q_multipletext">
    <div role="group" :style="getStyle(question.inline)">
      <div v-for="(item, index) in question.items" :key="index">
        <label :for="getUniqueId(index)">{{getTitle(item, index)}}</label>
        <b-form-input :id="getUniqueId(index)"
                      :disabled="isReadOnly(item)"
                      :placeholder="item.placeHolder"
                      :type="item.inputType"
                      v-if="!isReadMode"
                      v-model="item.value" lazy>
        </b-form-input>
        <div class="text_display" v-else>{{item.value || item.placeHolder}}</div>
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
    computed: {
      isReadMode() {
        return this.question.survey && this.question.survey.isDisplayMode('read');
      },
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
      },
      getTitle(item, index) {
        return this.question.getSequenceCharacter(index).toUpperCase() + ". " + (item.title || item.name);
      }
    },
    mounted() {
      this.id = this.question.newGuid();
    }
  });
</script>

<style>
  .sv_q_multipletext label {
    margin: 0;
    margin-bottom: .5rem;
  }

	.sv_q_multipletext > div {
		grid-gap: .75rem;
	}
</style>
