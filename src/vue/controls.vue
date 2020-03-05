<template>
  <div class="sv_controls">
    <v-button id="sv_prev_btn" v-if="!survey.isFirstPage()" icon="chevron-left" variant="primary" @click="survey.prevPage()">Prev</v-button>
    <div class="flex"></div>
    <v-button id="sv_save_btn" v-if="canSave" icon="save" variant="success" @click="survey.savePage()">Save</v-button>
    <v-button id="sv_save_exit_btn" v-if="canSave" icon="save" variant="success" @click="survey.savePage(true)">Save & Exit</v-button>
    <b-dropdown v-if="canSave" id="sv_control_options" dropup right no-caret variant="link">
      <template v-slot:button-content>
        <font-awesome-icon icon="ellipsis-h" size="6x" />
      </template>
      <b-dropdown-item-button @click="survey.savePage()">
        <font-awesome-icon icon="save" size="8x" /><span>Save</span>
      </b-dropdown-item-button>
      <b-dropdown-item-button @click="survey.savePage(true)">
        <font-awesome-icon icon="save" size="8x" /><span>Save & Exit</span>
      </b-dropdown-item-button>
    </b-dropdown>
    <v-button id="sv_next_btn" v-if="!survey.isLastPage()" icon="chevron-right" variant="primary" @click="survey.nextPage()" position="right">Next</v-button>
    <v-button id="sv_complete_btn" v-if="canSave && survey.isLastPage()" icon="check" variant="primary" @click="survey.complete()">Complete</v-button>
  </div>
</template>

<script>
  import VButton from "../components/v-button.vue";
  import { BDropdown, BDropdownItem, BDropdownItemButton } from "bootstrap-vue/src/components/dropdown";

  export default {
		name: "survey-controls",
    components: {
      VButton,
      BDropdown, BDropdownItem, BDropdownItemButton
    },
    props: {
      survey: {
				type: Object,
				required: true
			}
		},
    computed: {
		  canSave() {
		    return !this.survey.readOnly && !this.survey.isDisplayMode('read');
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
    flex-shrink: 0;
  }

  #sv_complete_btn, #sv_next_btn {
    margin-left: .5rem
  }

  #sv_prev_btn, #sv_save_btn {
    margin-right: .5rem;
  }

	@media (max-device-width: 480px) {
		#sv_control_options {
      display: block;
      margin-right: .5rem;
    }
    #sv_save_btn, #sv_save_exit_btn {
      display: none !important;
    }
	}

	@media (min-device-width: 481px) {
		#sv_control_options {
      display: none;
    }
    #sv_save_btn, #sv_save_exit_btn {
      display: inline-flex;
    }
	}
</style>

