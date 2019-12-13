<template>
  <div class="sv_progress">
    <div class="sv_progress_bar" :style="{width: progress}" role="progressbar" aria-valuemin="0" aria-valuemax="100">
      <span>{{survey.progressText}}</span>
    </div>
  </div>
</template>

<script lang="ts">

export default {
  props: {
    survey: null,
  },
  computed: {
    progress: {
      get() {
        return this.survey.getProgress() + '%';
      }
    }
  }
}
</script>
