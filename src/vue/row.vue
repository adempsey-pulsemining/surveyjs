<template>
  <div>
    <survey-element v-if="element.visible" v-for="element in row.elements" :key="element.idValue" :id="element.id" :style="{ paddingLeft: element.paddingLeft, paddingRight: element.paddingRight, width: element.renderWidth }" :element="element" :survey="survey" :css="css"/>
  </div>
</template>

<script lang="ts">
import { VueSurveyModel } from "./surveyModel";

export default {
  props: {
    row: <any>null,
    css: <any>null,
    survey: <any>null
  },
  mounted(): void {
    if (!!this.row) {
      VueSurveyModel.updatePropertiesHash(this.row);
    }
  }
}
</script>
