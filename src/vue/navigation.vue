<template>
  <div class="sv_nav">
    <b-pagination v-model="currentPage"
                  first-text="First"
                  last-text="Last"
                  next-text="Next"
                  prev-text="Prev"
                  align="fill"
                  :total-rows="totalPages"
                  :per-page="1">
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

  export default {
    components: {
      "b-pagination": BPagination
    },
    props: {
      survey: Object
    },
    computed: computed
  }
</script>
