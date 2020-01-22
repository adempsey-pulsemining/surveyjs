<template>
  <div class="sv_navigation">
    <input type="button" :value="survey.pagePrevText" v-show="!survey.isFirstPage && survey.isShowPrevButton" class="sv_prev_btn" @click="prevPage"/>
    <input type="button" :value="survey.pageNextText" v-show="!survey.isLastPage" class="sv_next_btn" @click="nextPage"/>
    <input v-if="survey.isEditMode" type="button" :value="survey.completeText" v-show="survey.isLastPage" class="sv_complete_btn" @click="completeLastPage"/>
  </div>
</template>

<script lang="ts">
  import { VueSurveyModel } from "./surveyModel";

  export default {
    props: {
      survey: Object as () => VueSurveyModel
    },
    methods: {
      prevPage() {
        this.survey.prevPage();
      },
      nextPage() {
        this.survey.nextPage();
      },
      completeLastPage() {
        this.survey.completeLastPage();
      }
    }
  }
</script>
