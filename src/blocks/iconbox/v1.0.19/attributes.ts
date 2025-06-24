import {BlockAttributes} from '@wordpress/blocks';

export const attributes: BlockAttributes = {
  title: {
    type: "string",
    default: ""
  },
  description: {
    type: "string",
    default: ""
  },
  buttonText: {
    type: "string",
    default: ""
  },
  duration: {
    type: "number",
    default: 1
  },
  stagger: {
    type: "number",
    default: 0.5
  },
  fontSize: {
    type: "string",
    default: "medium"
  },
  buttonUrl: {
    type: "string"
  },
  buttonOpensInNewTab: {
    type: "boolean",
    default: false
  },
  target: {
    type: "string",
    default: "_self"
  },
  icon: {
    type: "string",
    default: "solid icons"
  },
  svgString: {
    type: "string",
    default: ""
  }
};

export interface AttributesV1_0_19 {
  title: string;
  description: string;
  buttonText: string;
  duration: number;
  stagger: number;
  fontSize: string;
  buttonUrl: string;
  buttonOpensInNewTab: boolean;
  target: string;
  icon: string;
  svgString: string;
}
