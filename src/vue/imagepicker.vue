<template>
  <fieldset class="sv_imgsel">
    <legend v-bind:aria-label="question.locTitle.renderedHtml"></legend>
    <div v-for="(item, index) in question.visibleChoices" :key="item.value" :class="getItemClass(item)" >
      <label class="sv_q_imgsel_label">
        <input v-if="question.multiSelect" style="display: none;" type="checkbox" :name="question.name + '_' + question.id" :value="item.value" :id="question.inputId + '_' + item.value" v-model="question.value" :disabled="question.isReadOnly" v-bind:aria-label="question.locTitle.renderedHtml" class="sv_q_imgsel_control_item"/>
        <input v-else style="display: none;" type="radio" :name="question.name + '_' + question.id" :value="item.value" :id="question.inputId + '_' + item.value" v-model="question.value" :disabled="question.isReadOnly" v-bind:aria-label="question.locTitle.renderedHtml" class="sv_q_imgsel_control_item"/>
        <div>
          <img v-if="question.contentMode === 'image'" class="sv_q_imgsel_image" :src="item.imageLink" :width="question.imageWidth ? question.imageWidth + 'px' : undefined" :height="question.imageHeight ? question.imageHeight + 'px' : undefined" v-bind:style="{ objectFit: question.imageFit }"/>
          <embed v-if="question.contentMode === 'video'" class="sv_q_imgsel_image" :src="item.imageLink" :width="question.imageWidth ? question.imageWidth + 'px' : undefined" :height="question.imageHeight ? question.imageHeight + 'px' : undefined" v-bind:style="{ objectFit: question.imageFit }"/>
          <span v-if="question.showLabel" :title="item.text || item.value" class="sv_q_imgsel_text">{{item.text || item.value}}</span>
        </div>
      </label>
    </div>
  </fieldset>
</template>

<script lang="ts">
import { default as Question } from "./question";

export default {
  mixins: [Question],
  methods: {
    getItemClass(item: any) {
      var itemClass = "sv_q_imgsel" + (this.question.colCount === 0 ? " sv_q_imagepicker_inline" : " sv-q-col-" + this.question.colCount);
      if ((this.question.multiSelect && this.question.value.indexOf(item.value) !== -1) || item.value === this.question.value) {
        itemClass += " checked";
      }
      return itemClass;
    }
  }
}
</script>
