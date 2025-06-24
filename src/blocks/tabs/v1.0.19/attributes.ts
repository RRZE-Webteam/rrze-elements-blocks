import {BlockAttributes} from '@wordpress/blocks';

export const attributes: BlockAttributes = {
  message: {
    type: "string",
    source: "text"
  },
  expandAllLink: {
    type: "boolean",
    default: false
  },
  color: {
    type: "string",
    default: ""
  },
  innerClientIds: {
    type: "array",
    default: []
  },
  active: {
    type: "string",
    default: ""
  },
  xray: {
    type: "boolean",
    default: false
  },
  blockId: {
    type: "string",
    default: ""
  }
}

export interface AttributesV1_0_19 {
  message: string;
  expandAllLink: boolean;
  color: string;
  innerClientIds: any[];
  active: string;
  xray: boolean;
  blockId: string;
}
