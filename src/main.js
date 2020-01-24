export { Survey } from "./core/survey";
export { Page } from "./core/page";
export { metaData } from "./core/base";
export { Question } from "./core/question";
export { Group } from "./core/group";
export { Text } from "./core/question-text";
export { Element } from "./core/element";
export { Widget } from "./core/widget";
export { Boolean } from "./core/question-boolean";
export { Checkbox } from "./core/question-checkbox";

import Vue from "vue";
import VueSurvey from "./vue/survey.vue";
Vue.component("survey", VueSurvey);

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
Vue.component('font-awesome-icon', FontAwesomeIcon);

export { default as VueWidget } from "./core/widget";
