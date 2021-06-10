<template>
  <div class="sv_q_file">
    <input type="file" />
  </div>
</template>

<script>
  import QuestionMixin from "./mixins/question";

  export default Vue.extend({
    mixins: [QuestionMixin],
    name: "survey-file",
  })
</script>
