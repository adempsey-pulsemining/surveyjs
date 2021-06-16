<template>
  <div class="sv_q_file">
    <input :disabled="question.isReadOnly()"
           type="file"
           @change="doChange"
           v-bind:aria-required="question.isRequired"
    />
  </div>
</template>

<script>
  import QuestionMixin from "./mixins/question";

  export default Vue.extend({
    mixins: [QuestionMixin],
    name: "survey-file",
    methods: {
      doChange(e) {
        var src = e.target || e.srcElement;
        if (!(window)["FileReader"]) return;
        if (!src || !src.files || src.files.length < 1) return;
        this.question.loadFiles(src);
      },
    }
  })
</script>
