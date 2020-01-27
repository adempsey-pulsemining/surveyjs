<template>
  <div class="sv_nav">
    <b-pagination v-model="currentPage"
									align="fill"
                  first-text="First"
                  last-text="Last"
                  next-text="Next"
                  prev-text="Prev"
                  :total-rows="totalPages"
                  :per-page="1">
      <template v-slot:page="{ page, active, index }">
        <div class="sv_nav_page">
					<span>{{getPageTitle(index)}}</span>
					<font-awesome-icon v-if="isPageCompleted(index)" icon="check" size="8x" style="margin-left: 5px" />
				</div>
      </template>
    </b-pagination>
  </div>
</template>

<script>
  import { BPagination } from "bootstrap-vue/src/components/pagination";

  export default {
		name: "survey-navigation",
    components: {
      BPagination
    },
    props: {
      survey: {
				type: Object,
				required: true
			}
    },
    computed: {
      currentPage: {
        get() { return this.survey.currentPageIndex + 1 },
        set(val) { this.survey.currentPageIndex = val - 1 }
      },
      totalPages() {
        return this.survey.pages.length;
			}
    },
    methods: {
      getPageTitle(index) {
				let page = this.survey.pages[index];
				if (!page) return;
        return page.title || page.name;
			},
			isPageCompleted(index) {
				let page = this.survey.pages[index];
				return page && page.completed;
			}
    }
  }
</script>
