import {BlockAttributes} from '@wordpress/blocks';

export const attributes: BlockAttributes = {
  id: {
    type: "number"
  },
  url: {
    type: "string"
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
  alt: {
    type: "string"
  },
  title: {
    type: "string"
  },
  subtitle: {
    type: "string"
  },
  buttonText: {
    type: "string"
  },
  background: {
    type: "string",
    default: ""
  },
  isSearch: {
    type: "boolean",
    default: false
  }
};

export interface AttributesV1_0_19 {
  id: number;
  url: string;
  buttonUrl: string;
  buttonOpensInNewTab: boolean;
  target: string;
  alt: string;
  title: string;
  subtitle: string;
  buttonText: string;
  background: string;
  isSearch: boolean;
}
