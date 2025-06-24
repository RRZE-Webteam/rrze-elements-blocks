import {BlockAttributes} from '@wordpress/blocks';

export const attributes: BlockAttributes = {
  title: {
    type: "string",
    default: "Columns"
  },
  numberOfColumns: {
    type: "number",
    default: 2
  },
  rule: {
    type: "boolean",
    default: true
  },
  width: {
    type: "number",
    default: 240
  },
  borderColor: {
    type: "string",
    default: "#C3C3CB"
  },
  border: {
    type: "boolean",
    default: false
  },
  color: {
    type: "string",
    default: ""
  },
  colorSlug: {
    type: "string",
    default: ""
  }
}

export interface AttributesV1_0_19 {
  title: string;
  numberOfColumns: number;
  rule: boolean;
  width: number;
  borderColor: string;
  border: boolean;
  color: string;
  colorSlug: string;
}
