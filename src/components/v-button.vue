<template>
  <b-button :disabled="disabled" :style="buttonStyle" :variant="variant" @click="clicked">
    <font-awesome-icon v-if="!positionRight && icon" :icon="icon" :size="size" style="margin-right: 5px" />
    <slot></slot>
    <font-awesome-icon v-if="positionRight && icon" :icon="icon" :size="size" style="margin-left: 5px" />
  </b-button>
</template>

<script>
  import { BButton } from "bootstrap-vue/src/components/button";

  export default {
    name: "v-button",
    components: { BButton },
    props: {
      size: {
        type: String,
        default: "8x"
      },
      icon: String,
      variant: String,
      position: String,
      disabled: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      buttonStyle() {
        return "display: inline-flex; align-items: center;"
      },
      positionRight() {
        return this.position === "right";
      },
    },
    methods: {
      clicked(event) {
        this.$emit("click", event);
      }
    }
  }
</script>
