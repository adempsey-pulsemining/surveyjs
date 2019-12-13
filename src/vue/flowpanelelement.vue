<template>
  <span :style="style">
    <component v-if="!question" :is="tagName">
      <survey-flowpanelelement v-for="elNode in nodes" :key="elNode.elementId" :node="elNode" :panel="panel"/>
      {{text}}
    </component>
    <span v-if="!!question">
      <survey-element :key="question.idValue" :id="question.id" :style="{ width: question.renderWidth }" :element="question" :survey="survey"/>
    </span>
  </span>
</template>

<script lang="ts">
import { Question } from "../question";
import { SurveyModel } from "../survey";
import { FlowPanelModel } from "../flowpanel";

(<any>FlowPanelModel).idValue = 0;

export default {
  props: {
    node: <any>null,
    panel: <any>null
  },
  data() {
    return {
      elementIdValue: <string>"",
      question: <Question>null,
      tagName: <string>"span",
      nodes: <Array<Node>>[],
      text: <string>"",
      style: <any>{}
    }
  },
  methods: {
    getStyle(nodeType: string) {
      var style: any = {};
      if (nodeType.toLowerCase() === "b") {
        style.fontWeight = "bold";
      }
      if (nodeType.toLowerCase() === "i") {
        style.fontStyle = "italic";
      }
      if (nodeType.toLowerCase() === "u") {
        style.textDecoration = "underline";
      }
      return style;
    },
    getWidgetComponentName(element: Question) {
      if (element.customWidget) {
        return "survey-customwidget";
      }
      return "survey-" + element.getTemplate();
    },
    hasTextChildNodesOnly(node: Node) {
      var nodes = node.childNodes;
      for (var i = 0; i < nodes.length; i++) {
        if (nodes[i].nodeName.toLowerCase() !== "#text") return false;
      }
      return true;
    },
    getChildDomNodes(node: Node) {
      var domNodes = [];
      for (var i = 0; i < node.childNodes.length; i++) {
        domNodes.push(node.childNodes[i]);
      }
      return domNodes;
    }
  },
  computed: {
    elementId: {
      get() {
        if (!this.elementIdValue) {
          (<any>FlowPanelModel).idValue = (<any>FlowPanelModel).idValue || 0;
          (<any>FlowPanelModel).idValue++;
          this.elementIdValue = "fp_el" + (<any>FlowPanelModel).idValue;
        }
        return this.elementIdValue;
      }
    },
    survey: {
      get() {
        return <SurveyModel>this.panel.survey;
      }
    }
  },
  beforeMount(): void {
    if (!this.panel || !this.node) return;
    var nodeType = this.node.nodeName.toLowerCase();
    if (!this.hasTextChildNodesOnly(this.node)) {
      this.nodes = this.getChildDomNodes(this.node);
    } else {
      if (nodeType == "question") {
        this.question = this.panel.getQuestionByName(this.node.textContent);
      } else {
        this.text = this.node.textContent;
      }
    }
    if (nodeType == "div" && !this.question) {
      this.tagName = "div";
    }
    this.style = this.getStyle(nodeType);
  }
}
</script>
