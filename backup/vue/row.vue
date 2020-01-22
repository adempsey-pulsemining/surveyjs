<template>
  <div class="sv_row">
    <survey-element v-if="element.visible"
                    v-for="element in row.elements"
                    :key="element.idValue"
                    :id="element.id"
                    :style="{ paddingLeft: element.paddingLeft, paddingRight: element.paddingRight, width: element.renderWidth }"
                    :element="element"
                    :survey="survey">
    </survey-element>
  </div>
</template>

<script lang="ts">
import { VueSurveyModel } from "./surveyModel";

export default {
  props: {
    row: Object,
    survey: Object as () => VueSurveyModel
  },
  mounted(): void {
    if (!!this.row) {
      VueSurveyModel.updatePropertiesHash(this.row);
    }
  }
}
</script>
