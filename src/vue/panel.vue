<template>
  <div v-if="question.isVisible" class="sv_p_container" :style="rootStyle">
    <h4 v-show="hasTitle" :class="getTitleStyle()" v-on:click="changeExpanded">
      <survey-string :locString="question.locTitle"/>
      <span v-show="showIcon" :class="iconCss"></span>
    </h4>
    <div class="sv_p_description"><survey-string :locString="question.locDescription"/></div>
    <survey-errors :question="question"/>
    <div :style="{ paddingLeft: question.innerPaddingLeft }" v-show="!isCollapsed">
      <div v-for="(row, index) in rows" :key="question.id + '_' + index" v-if="row.visible" class="sv_row">
        <survey-row :row="row" :survey="survey"></survey-row>
      </div>
    </div>
  </div>
</template>

<script lang="ts">

export default {
  props: {
    question: Object,
    isEditMode: Boolean,
    isCollapsedValue: Boolean
  },
  mounted(): void {
    if (this.question.survey) {
      this.question.survey.afterRenderPanel(this.question, this.$el);
    }
    this.isCollapsed = this.question.isCollapsed;
    var self = this;
    this.question.registerFunctionOnPropertyValueChanged("state", function(val: any) {
      self.isCollapsed = self.question.isCollapsed;
    });
  },
  computed: {
    rootStyle: {
      get() {
        var result = {};
        if (this.question.renderWidth) {
          (<any>result)["width"] = this.question.renderWidth;
        }
        return result;
      }
    },
    showIcon: {
      get() {
        return (this.question && (this.question.isExpanded || this.question.isCollapsed));
      }
    },
    rows: {
      get() {
        return this.question.rows;
      }
    },
    hasTitle: {
      get() {
        return this.question.title.length > 0;
      }
    },
    survey: {
      get() {
        return this.question.survey;
      }
    },
    iconCss: {
      get() {
        var result = "sv_panel_icon";
        if (!this.isCollapsed) result += " sv_expanded";
        return result;
      }
    },
    isCollapsed: {
      get() {
        return this.isCollapsedValue;
      },
      set(val: boolean) {
        this.isCollapsedValue = val;
      }
    }
  },
  methods: {
    changeExpanded() {
      if (this.question.isExpanded && !this.question.isCollapsed) {
        this.question.collapse();
      } else if (this.question.isCollapsed) {
        this.question.expand();
      }
    },
    getTitleStyle() {
      var result = "sv_p_title";
      if (this.question.isCollapsed || this.question.isExpanded) {
        result += " sv_p_title_expandable";
      }
      return result;
    }
  }
}
</script>
