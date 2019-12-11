<template>
  <div class="sv_p_root">
    <h4 v-if="hasTitle" class="sv_page_title"><survey-string :locString="page.locTitle"/></h4>
    <div class="sv_page_description"><survey-string :locString="page.locDescription"/></div>
    <div v-for="(row, index) in rows" v-if="row.visible" :key="page.id + '_' + index" class="sv_row">
      <survey-row :row="row" :survey="survey"></survey-row>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import { SurveyModel } from "../survey";
import { PageModel } from "../page";
import { PanelModelBase, PanelModel, QuestionRowModel } from "../panel";

@Component
export class Page extends Vue {
  @Prop() survey: SurveyModel;
  @Prop() page: PageModel;

  isCurrentPageChanged: boolean = false;

  mounted() {
    if (!this.survey) return;
    this.survey.afterRenderPage(this.$el);
    this.survey.onCurrentPageChanged.add((sender, options) => {
      this.isCurrentPageChanged = true;
    });
  }

  updated() {
    var self = this;
    self.survey.afterRenderPage(this.$el);
    this.$nextTick(function() {
      if (this.isCurrentPageChanged) {
        this.isCurrentPageChanged = false;
        self.survey.scrollToTopOnPageChange();
      }
    });
  }

  get hasTitle() {
    return !!this.page.title && this.survey.showPageTitles;
  }

  get num() {
    return this.page.num > 0 ? this.page.num + ". " : "";
  }

  get rows() {
    return this.page.rows;
  }
}
Vue.component("survey-page", Page);
export default Page;
</script>
