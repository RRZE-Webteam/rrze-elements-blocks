import {BlockAttributes} from '@wordpress/blocks';

export const attributes: BlockAttributes = {
  stagger: {
    type: "number",
    default: 0
  },
  columns: {
    type: "number",
    default: 5
  },
  startValue: {
    type: "number",
    default: 0
  }
}

export interface AttributesV1_0_19 {
  stagger: number;
  columns: number;
  startValue: number;
}
