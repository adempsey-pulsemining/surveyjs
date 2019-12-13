<template>
  <div v-show="surveyWindow.isShowing" style="position: fixed; bottom: 3px; right: 10px; max-width: 60%;" class="sv_window">
    <div class="sv_window_title">
      <span @click="doExpand" style="width: 100%; cursor: pointer;">
        <span style="padding-right:10px"><survey-string :locString="windowSurvey.locTitle"/></span>
        <span aria-hidden="true"></span>
      </span>
      <span v-if="isExpandedSurvey" @click="doExpand" style="float: right; cursor: pointer;">
        <span style="padding-right:10px">X</span>
      </span>
    </div>
    <div v-show="isExpandedSurvey" class="sv_window_content">
      <survey :survey="windowSurvey"></survey>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { VueSurveyWindowModel } from "./surveyModel";

export default {
  props: {
    window: Object,
    survey: Object,
    isExpanded: Boolean,
    isexpanded: Boolean,
    closeOnCompleteTimeout: Object
  },
  data() {
    return {
      surveyWindow: <any>null
    }
  },
  created(): void {
    if (this.window) {
      this.surveyWindow = this.window;
    } else {
      this.surveyWindow = new VueSurveyWindowModel(null, this.survey);
    }
    if (this.isexpanded !== undefined) {
      this.surveyWindow.isExpanded = this.isexpanded;
    }
    if (this.isExpanded !== undefined) {
      this.surveyWindow.isExpanded = this.isExpanded;
    }
    if (this.closeOnCompleteTimeout !== undefined) {
      this.surveyWindow.closeOnCompleteTimeout = this.closeOnCompleteTimeout;
    }
    this.surveyWindow.isShowing = true;
    var self = this;
    this.surveyWindow.closeWindowOnCompleteCallback = function() {
      self.doHide();
    };
  },
  computed: {
    windowSurvey: {
      get() {
        return this.surveyWindow.survey;
      }
    },
    isExpandedSurvey: {
      get() {
        return this.surveyWindow.isExpanded;
      },
      set(val: boolean) {
        this.surveyWindow.isExpanded = val;
      }
    }
  },
  methods: {
    doExpand() {
      this.surveyWindow.isExpanded = !this.surveyWindow.isExpanded;
    },
    doHide() {
      Vue.set(this.surveyWindow, "isShowing", false);
    }
  }
}
</script>
