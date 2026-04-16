import {BlockAttributes} from '@wordpress/blocks';

export const attributes: BlockAttributes = {
  style: {
    type: "string",
  },
}

export interface AttributesV1_0_19 extends Record<string, unknown> {
  style: string;
}
