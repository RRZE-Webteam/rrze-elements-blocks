import {BlockAttributes} from '@wordpress/blocks';

export const attributes: BlockAttributes = {
  style: {
    type: "string",
    default: "default"
  },
  color: {
    type: "string",
    default: "#e9edf2"
  },
  border_color: {
    type: "string",
    default: ""
  },
  title: {
    type: "string",
    default: ""
  },
  textColor: {
    type: "string",
    default: "#000000"
  },
  borderColor: {
    type: "string",
    default: ""
  }
}

export interface AttributesV1_0_19 {
  style: string;
  color: string;
  border_color: string;
  title: string;
  textColor: string;
  borderColor: string;
}
