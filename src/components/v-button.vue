<template>
  <b-button :style="buttonStyle" :variant="variant" @click="clicked">
    <font-awesome-icon v-if="!positionRight" :icon="icon" :size="size" style="margin-right: 5px" />
    <slot></slot>
    <font-awesome-icon v-if="positionRight" :icon="icon" :size="size" style="margin-left: 5px" />
  </b-button>
</template>

<script>
  import { BButton } from "bootstrap-vue/src/components/button";
  import { library } from '@fortawesome/fontawesome-svg-core';
  import { faChevronLeft, faChevronRight, faSave, faCheck } from '@fortawesome/free-solid-svg-icons';
  library.add(faChevronLeft, faChevronRight, faSave, faCheck );

  const props = {
    size: { type: String, default: "8x" },
    icon: String,
    variant: String,
    position: String
  };

  const computed = {
    buttonStyle() {
      return "display: inline-flex; align-items: center;"
    },
    positionRight() {
      return this.position === "right";
    },
  };

  const methods = {
    clicked(event) {
      this.$emit("click", event);
    }
  };

  export default {
    name: "v-button",
    components: { BButton },
    props: props,
    computed: computed,
    methods: methods
  }
</script>
