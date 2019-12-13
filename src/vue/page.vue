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

export default {
  props: {
    survey: Object,
    page: Object
  },
  data() {
    return {
      isCurrentPageChanged: false
    }
  },
  mounted(): void {
    if (!this.survey) return;
    this.survey.afterRenderPage(this.$el);
    this.survey.onCurrentPageChanged.add((sender: any, options: any) => {
      this.isCurrentPageChanged = true;
    });
  },
  updated(): void {
    var self = this;
    self.survey.afterRenderPage(this.$el);
    this.$nextTick(function() {
      if (this.isCurrentPageChanged) {
        this.isCurrentPageChanged = false;
        self.survey.scrollToTopOnPageChange();
      }
    });
  },
  computed: {
    hasTitle: {
      get() {
        return !!this.page.title && this.survey.showPageTitles;
      }
    },
    num: {
      get() {
        return this.page.num > 0 ? this.page.num + ". " : "";
      }
    },
    rows: {
      get() {
        return this.page.rows;
      }
    }
  }
}
</script>
