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
export { Radio } from "./core/question-radio";
export { Dropdown } from "./core/question-dropdown";
export { Comment } from "./core/question-comment";
export { MultipleText } from "./core/question-multipletext";
export { Html } from "./core/question-html";
export { Matrix } from "./core/question-matrix";
export { Rating } from "./core/question-rating";
export { File } from "./core/question-file";
export { Expression } from "./core/question-expression";

import Vue from "vue";
import VueSurvey from "./vue/survey.vue";
Vue.component("survey", VueSurvey);

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
Vue.component('font-awesome-icon', FontAwesomeIcon);

import { config, library } from '@fortawesome/fontawesome-svg-core';
import { 
	faChevronLeft, 
	faChevronRight, 
	faSave, 
	faCheck,
	faEllipsisH,
	faTimes,
	faEdit,
	faExclamationTriangle,
	faCog,
	faUndo,
	faFlag,
	faComment
} from '@fortawesome/free-solid-svg-icons';
library.add(faChevronLeft, faChevronRight, faSave, faCheck, faEllipsisH, faTimes, faEdit, faExclamationTriangle, faCog, faUndo, faFlag, faComment );
config.autoAddCss = false;

export { default as VueWidget } from "./core/widget";

import "./styles/main.scss";
