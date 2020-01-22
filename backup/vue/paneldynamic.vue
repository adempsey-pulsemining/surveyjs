<template>
  <div class="sv_panel_dynamic">
    <survey-paneldynamicprogress v-if="question.isProgressTopShowing" :question="question" />
    <div v-for="panel in renderedPanels" :key="panel.id">
      <survey-panel :question="panel" />
      <div v-if="!question.isReadOnly && !panel.isCollapsed">
        <input type="button" v-if="question.canRemovePanel" :value="question.panelRemoveText" @click="removePanelClick(panel)" />
      </div>
      <hr/>
    </div>
    <survey-paneldynamicprogress v-if="question.isProgressBottomShowing" :question="question" />
    <input type="button" v-if="question.isRenderModeList && question.canAddPanel" :value="question.panelAddText" @click="addPanelClick"/>
  </div>
</template>

<script lang="ts">
import { QuestionPanelDynamic } from "../question_paneldynamic";

export default {
  props: {
    question: Object as () => QuestionPanelDynamic
  },
  computed: {
    renderedPanels() {
      if (this.question.isRenderModeList) return this.question.panels;
      return this.question.currentPanel ? [this.question.currentPanel] : [];
    }
  },
  methods: {
    removePanelClick(panel: any) {
      this.question.removePanelUI(panel);
    },
    addPanelClick() {
      this.question.addPanel();
    }
  }
}
</script>
