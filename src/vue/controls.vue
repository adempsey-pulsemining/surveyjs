<template>
  <div class="sv_controls">
    <v-button id="sv_prev_btn" v-if="!survey.isFirstPage()" icon="chevron-left" variant="primary" @click="survey.prevPage()">
			<span>Prev</span>
		</v-button>
    <div class="flex"></div>
    <v-button id="sv_save_btn" v-if="!survey.readOnly" icon="save" variant="success" @click="survey.savePage()">
			<span>Save</span>
		</v-button>
    <v-button id="sv_next_btn" v-if="!survey.isLastPage()" icon="chevron-right" variant="primary" @click="survey.nextPage()" position="right">
			<span>Next</span>
		</v-button>
    <v-button id="sv_complete_btn" v-if="!survey.readOnly && survey.isLastPage()" icon="check" variant="primary" @click="survey.complete()">
			<span>Complete</span>
		</v-button>
  </div>
</template>

<script>
  import VButton from "../components/v-button.vue";

  export default {
		name: "survey-controls",
    components: {
      VButton
    },
    props: {
      survey: {
				type: Object,
				required: true
			}
		}
  }
</script>

<style>
  .sv_controls {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 1rem;
  }

  #sv_complete_btn, #sv_next_btn {
    margin-left: 5px
  }

  #sv_prev_btn, #sv_save_btn {
    margin-right: 5px;
  }

	@media screen and (max-device-width: 480px) {
		.sv_controls button span {
			display: none;
		}

		.sv_controls button svg {
			margin: 0 !important;
		}
	}

	@media screen and (min-device-width: 481px) {
		.sv_controls button span {
			display: inline;
		}

		.sv_controls button svg {
			margin: initial;
		}
	}
</style>

