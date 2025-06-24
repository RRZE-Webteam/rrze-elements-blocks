import {BlockAttributes} from '@wordpress/blocks';

export const attributes: BlockAttributes = {
  title: {
    type: "number",
    default: 0
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
  fontSize: {
    type: "string",
    default: "large"
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
  }
};

export interface AttributesV1_0_19 {
  title: number;
  description: string;
  buttonText: string;
  duration: number;
  fontSize: string;
  buttonUrl: string;
  buttonOpensInNewTab: boolean;
  target: string;
  stagger?: number;
}
