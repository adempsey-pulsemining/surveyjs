<template>
  <div class="sv_controls">
    <v-button v-if="!survey.isFirstPage()" icon="chevron-left" variant="primary" @click="survey.prevPage()">Prev</v-button>
    <div class="flex"></div>
    <v-button v-if="!survey.isLastPage()" icon="chevron-right" variant="primary" @click="survey.nextPage()" position="right">Next</v-button>
    <v-button v-if="!survey.readOnly" icon="save" variant="success" @click="survey.savePage()">Save</v-button>
    <v-button v-if="!survey.readOnly" icon="check" variant="primary" @click="survey.complete()">Complete</v-button>
  </div>
</template>

<script>
  import VButton from "../components/v-button.vue";

  export default {
    components: {
      VButton
    },
    props: {
      survey: Object
    }
  }
</script>
