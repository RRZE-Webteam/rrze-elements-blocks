import {BlockAttributes} from '@wordpress/blocks';

export const attributes: BlockAttributes = {
  register: {
    type: "boolean",
    default: false
  },
  title: {
    type: "string",
    default: ""
  },
  icon: {
    type: "string",
    default: ""
  },
  svgString: {
    type: "string",
    default: ""
  },
  order: {
    type: "integer",
    default: 0
  },
  active: {
    type: "boolean",
    default: true
  },
  xray: {
    type: "boolean",
    default: false
  },
  labelSettings: {
    type: "boolean",
    default: true
  },
  blockId: {
    type: "string",
    default: ""
  },
  tabsUid: {
    type: "string",
    default: ""
  }
}

export interface AttributesV1_0_19 {
  register: boolean;
  title: string;
  icon: string;
  svgString: string;
  order: number;
  active: boolean;
  xray: boolean;
  labelSettings: boolean;
  blockId: string;
  tabsUid: string;
}
