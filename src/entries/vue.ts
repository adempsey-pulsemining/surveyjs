// model
export * from "./chunks/model";

// localization
import "./chunks/localization";

// helpers
export * from "./chunks/helpers";
import Vue from "vue";
import { VueSurveyModel } from "../vue/surveyModel";
export { VueSurveyModel as Model };

import { default as Survey } from "../vue/survey.vue";
Vue.component("survey", Survey);
export { Survey };

import { default as CustomWidget } from "../vue/customwidget.vue";
Vue.component("survey-customwidget", CustomWidget);
export { CustomWidget };

import { default as SurveyString } from "../vue/string.vue";
Vue.component("survey-string", SurveyString);
export { SurveyString };

import { default as SurveyElementVue } from "../vue/element.vue";
Vue.component("survey-element", SurveyElementVue);
export { SurveyElementVue };

import { default as Window } from "../vue/window.vue";
Vue.component("survey-window", Window);
export { Window };

import { default as Page } from "../vue/page.vue";
Vue.component("survey-page", Page);
export { Page };

import { default as Radiogroup } from "../vue/radiogroup.vue";
Vue.component("survey-radiogroup", Radiogroup);
export { Radiogroup };

import { default as OtherChoice } from "../vue/otherChoice.vue";
Vue.component("survey-other-choice", OtherChoice);
export { OtherChoice };

import { default as Rating } from "../vue/rating.vue";
Vue.component("survey-rating", Rating);
export { Rating };

import { default as Comment } from "../vue/comment.vue";
Vue.component("survey-comment", Comment);
export { Comment };

import { default as Checkbox } from "../vue/checkbox.vue";
Vue.component("survey-checkbox", Checkbox);
export { Checkbox };

import { default as SurveyText } from "../vue/text.vue";
Vue.component("survey-text", SurveyText);
export { SurveyText };

import { default as Boolean } from "../vue/boolean.vue";
Vue.component("survey-boolean", Boolean);
export { Boolean };

import { default as Empty } from "../vue/empty.vue";
Vue.component("survey-empty", Empty);
export { Empty };

import { default as MultipleText } from "../vue/multipletext.vue";
Vue.component("survey-multipletext", MultipleText);
export { MultipleText };

import { default as Matrix } from "../vue/matrix.vue";
Vue.component("survey-matrix", Matrix);
export { Matrix };

import { default as Dropdown } from "../vue/dropdown.vue";
Vue.component("survey-dropdown", Dropdown);
export { Dropdown };

import { default as File } from "../vue/file.vue";
Vue.component("survey-file", File);
export { File };

import { default as MatrixCell } from "../vue/matrixcell.vue";
Vue.component("survey-matrixcell", MatrixCell);
export { MatrixCell };

import { default as MatrixTable } from "../vue/matrixtable.vue";
Vue.component("survey-matrixtable", MatrixTable);
export { MatrixTable };

import { default as MatrixDropdown } from "../vue/matrixdropdown.vue";
Vue.component("survey-matrixdropdown", MatrixDropdown);
export { MatrixDropdown };

import { default as MatrixDynamic } from "../vue/matrixdynamic.vue";
Vue.component("survey-matrixdynamic", MatrixDynamic);
export { MatrixDynamic };

import { default as Errors } from "../vue/errors.vue";
Vue.component("survey-errors", Errors);
export { Errors };

import { default as Html } from "../vue/html.vue";
Vue.component("survey-html", Html);
export { Html };

import { default as Expression } from "../vue/expression.vue";
Vue.component("survey-expression", Expression);
export { Expression };

import { default as ImagePicker } from "../vue/imagepicker.vue";
Vue.component("survey-imagepicker", ImagePicker);
export { ImagePicker };

import { default as PanelDynamic } from "../vue/paneldynamic.vue";
Vue.component("survey-paneldynamic", PanelDynamic);
export { PanelDynamic };

import { default as PanelDynamicProgress } from "../vue/paneldynamicprogress.vue";
Vue.component("survey-paneldynamicprogress", PanelDynamicProgress);
export { PanelDynamicProgress };

import { default as Progress } from "../vue/progress.vue";
Vue.component("survey-progress", Progress);
export { Progress };

import { default as TimerPanel } from "../vue/timerpanel.vue";
Vue.component("survey-timerpanel", TimerPanel);
export { TimerPanel };

import { default as Panel } from "../vue/panel.vue";
Vue.component("survey-panel", Panel);
export { Panel };

import { default as FlowPanel } from "../vue/flowpanel.vue";
Vue.component("survey-flowpanel", FlowPanel);
export { FlowPanel };

import { default as FlowPanelElement } from "../vue/flowpanelelement.vue";
Vue.component("survey-flowpanelelement", FlowPanelElement);
export { FlowPanelElement };

import { default as Row } from "../vue/row.vue";
Vue.component("survey-row", Row);
export { Row };
