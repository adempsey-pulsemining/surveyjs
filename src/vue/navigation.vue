<template>
  <div class="sv_nav">
    <b-pagination v-model="currentPage"
                  first-text="First"
                  last-text="Last"
                  next-text="Next"
                  prev-text="Prev"
                  :total-rows="totalPages"
                  :per-page="1">
      <template v-slot:page="{ page, active, index }">
        <span>{{getPageTitle(index)}}</span>
      </template>
    </b-pagination>
  </div>
</template>

<script>
  import { BPagination } from "bootstrap-vue/src/components/pagination";

  const computed = {
    currentPage: {
      get() { return this.survey.currentPageIndex + 1 },
      set(val) { this.survey.currentPageIndex = val - 1 }
    },
    totalPages() {
      return this.survey.pages.length;
    }
  };

  const methods = {
    getPageTitle(index) {
      return this.survey.pages[index].title;
    }
  };

  export default {
    components: {
      "b-pagination": BPagination
    },
    props: {
      survey: Object
    },
    computed: computed,
    methods: methods
  }
</script>
