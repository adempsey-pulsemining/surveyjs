<template>
  <div class="sv_nav">
    <b-pagination ref="pagination"
                  v-model="currentPage"
									align="fill"
                  first-text="First"
                  last-text="Last"
                  next-text="Next"
                  prev-text="Prev"
                  @input="pageChanged"
                  :total-rows="totalPages"
                  :per-page="1">
      <template v-slot:page="{ page, active, index }">
        <div class="sv_nav_page" :class="{ completed: isPageCompleted(index) }">
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
    data() {
		  return {
		    showErrors: false
      }
    },
    computed: {
      currentPage: {
        get() {
          return this.survey.proxy.currentPageIndex + 1
        },
        set(val) {
          this.survey.changePage(val - 1);
          if (this.showErrors) {
            this.survey.showErrors();
            this.showErrors = false;
          }
        }
      },
      totalPages() {
        return this.survey.visiblePages.length;
			}
    },
    methods: {
		  pageChanged(e) {
        if (!this.survey.canGoToPage(e - 1)) {
          this.$refs["pagination"].currentPage = this.survey.getFirstPageWithErrors() + 1;
          this.showErrors = true;
        }
      },
      getPageTitle(index) {
				let page = this.survey.visiblePages[index];
				if (!page) return;
        return page.title || page.name;
			},
			isPageCompleted(index) {
				let page = this.survey.visiblePages[index];
				return page && page.completed;
			}
    }
  }
</script>

<style>
	.sv_nav > ul {
		margin-bottom: 0;
	}

	.sv_nav .flex-fill {
		flex: 1 1 0 !important;
	}

	.sv_nav .page-item {
		overflow: hidden;
	}

	.sv_nav_page {
		display: flex;
		align-items: center;
		flex-direction: row;
		justify-content: center;
	}

	.sv_nav .page-item:not(.active) .sv_nav_page.completed {
		color: green;
	}

	.sv_nav_page svg {
		flex-shrink: 0;
	}

	.sv_nav_page span {
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
		display: inline-block;
		width: 100%;
	}

	@media (max-device-width: 480px) {
		ul.b-pagination > li:nth-child(2) {
			display: none;
		}

		ul.b-pagination > li:nth-last-child(2) {
			display: none;
		}
	}

	@media (min-device-width: 481px) {
		ul.b-pagination > li:nth-child(2) {
			display: block;
		}

		ul.b-pagination > li:nth-last-child(2) {
			display: block;
		}
	}
</style>
