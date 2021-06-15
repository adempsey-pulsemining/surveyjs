<template>
  <div class="sv_results">
    <h2>Results</h2>
    <b-table class="sv_results_table"
             responsive
             striped
             :items="surveyResults"
             :fields="fields">
    </b-table>
    <div class="sv_results_actions">
      <v-button variant="primary" @click="survey.downloadPdfClick()">Download PDF</v-button>
      <v-button id="sv_restart_btn" variant="primary" @click="survey.restart()">Restart</v-button>
    </div>
  </div>
</template>

<script>
  import VButton from "../components/v-button.vue";
  import { BTable } from "bootstrap-vue/src/components/table/table"

  export default {
    name: "survey-results",
    props: {
      survey: {
        type: Object
      }
    },
    data() {
      return {
        fields: [
          { key: "page", sortable: true },
          { key: "name", sortable: true },
          "title", "description", "comment", "value"
        ]
      }
    },
    components: {
      BTable,
      VButton
    },
    computed: {
      surveyResults() {
        return this.survey.getSurveyResults();
      },
    }
  }
</script>

<style>
  .sv_results {
    padding: 1rem;
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  .sv_results_table {
    flex: 1;
    overflow-y: scroll;
    margin-top: 1rem;
  }

  .sv_results_actions {
    display: flex;
    justify-content: flex-end;
    padding-top: 1rem;
    border-top: thin solid #d3d3d3;
  }

  #sv_restart_btn {
    margin-left: .5rem;
  }
</style>
