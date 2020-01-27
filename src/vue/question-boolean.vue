<template>
  <div class="sv_q_boolean">
    <input type="checkbox" v-model="question.value" :disabled="question.isReadOnly()" />
  </div>
</template>

<script>
	import QuestionMixin from "./mixins/question";

  export default Vue.extend({
		mixins: [QuestionMixin],
		name: "survey-boolean"
  });
</script>
