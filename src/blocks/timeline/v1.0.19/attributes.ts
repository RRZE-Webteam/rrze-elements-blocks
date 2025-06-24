import {BlockAttributes} from '@wordpress/blocks';

export const attributes: BlockAttributes = {
  hstart: {
    type: "integer",
    default: 3
  }
}

export interface AttributesV1_0_19 {
  hstart: number;
}
