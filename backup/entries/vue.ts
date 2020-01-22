// model
export * from "./chunks/model";

// localization
import "./chunks/localization";

// helpers
export * from "./chunks/helpers";
import Vue from "vue";
import { VueSurveyModel } from "../vue/surveyModel";
export { VueSurveyModel as Model };

import { default as BootstrapVue, IconsPlugin } from "bootstrap-vue";
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

var context = (<any>require).context("../vue", true, /\.vue$/);
context.keys().forEach((key: any) => {
  let filename = key.substr(key.lastIndexOf("/") + 1).split(".")[0];
  filename = filename.replace(/[A-Z]/g, (m: any) => "-" + m.toLowerCase());
  Vue.component(filename === "survey" ? filename : "survey-" + filename, context(key).default);
});
