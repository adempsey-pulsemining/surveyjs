<template>
  <div class="sv_q_imagepicker"
       :style="{ 'grid-template-columns': `repeat(${question.colCount ? question.colCount : 'auto-fill'}, minmax(300px, 1fr))` }">
    <div class="sv_image_container"
         v-for="(image, index) in fixedChoices"
         :key="index"
         @click="selectImage($event, index)">
      <img width="300"
           height="300"
           :src="image.imageLink || 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='"
           alt=""
           :style="{ 'background-color': question.value === image.value ? '#007bff' : 'transparent' }"
      />
    </div>
  </div>
</template>

<script>
  import QuestionMixin from "./mixins/question";

  export default {
    name: "question-imagepicker",
    mixins: [QuestionMixin],
    data() {
      return {
        selectedIndex: Number
      }
    },
    computed: {
      fixedChoices() {
        return this.question.getFixedChoices();
      }
    },
    methods: {
      selectImage(e, index) {
        if (this.question.isReadOnly()) return;
        let choice = this.question.choices[index];
        this.selectedIndex = index;
        this.question.value = typeof choice === "string" ? choice : choice.value;
      }
    }
  }
</script>

<style>
  .sv_q_imagepicker {
    display: grid;
    grid-gap: 1rem;
  }

  .sv_image_container {
    max-width: 300px;
    cursor: pointer;
  }

  .sv_image_container img {
    width: 100%;
    height: auto;
    display: block;
    padding: 5px;
    border: thin solid #d3d3d3;
  }
</style>