<template>
  <div class="sv_q_text">
    <input @change="onChange"
           maxlength="32000"
           :value="question.value"
           :disabled="question.isReadOnly()"
           :type="question.inputType"
           :placeholder="question.placeHolder"
    />
  </div>
</template>

<script>
  export default {
    props: {
      question: Object
    },
    methods: {
      onChange(e) {
        this.question.value = e.target.value;
      }
    }
  }
</script>
