<template>
  <div class="sv_controls">
    <input class="sv_prev_btn" v-if="!survey.isFirstPage()" type="button" value="Prev" @click="survey.prevPage()">
    <input class="sv_next_btn" v-if="!survey.isLastPage()" type="button" value="Next" @click="survey.nextPage()">
    <input class="sv_complete_btn" v-if="survey.isLastPage()" type="button" value="Complete" @click="survey.complete()">
  </div>
</template>

<script>
  export default {
    props: {
      survey: Object
    }
  }
</script>
