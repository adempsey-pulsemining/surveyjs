<template>
  <div>{{text}}</div>
</template>

<script lang="ts">

export default {
  props: {
    survey: <any>null
  },
  computed: {
    text: {
      get() {
        return this.survey.timerInfoText;
      }
    }
  }
}
</script>
