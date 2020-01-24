<template>
  <div class="sv_q_boolean">
    <input type="checkbox" v-model="question.value" :disabled="question.isReadOnly()" />
  </div>
</template>

<script>
  export default {
    props: {
      question: Object
    }
  }
</script>
