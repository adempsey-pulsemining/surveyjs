<template>
  <div class="sv_q_text">
    <input type="text" @change="onChange" :value="question.value" />
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
