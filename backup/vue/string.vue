<template>
  <span style="position: static;">
    <span style="position: static;" v-if="locString.hasHtml" v-html="locString.renderedHtml"></span>
    <span style="position: static;" v-else>{{locString.renderedHtml}}</span>
  </span>
</template>

<script lang="ts">

export default {
  props: {
    locString: Object
  }
}
</script>
