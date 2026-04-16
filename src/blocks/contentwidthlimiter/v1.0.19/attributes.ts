import {BlockAttributes} from '@wordpress/blocks';

export const attributes: BlockAttributes = {
  title: {
    type: "string",
    default: "Content Width Limiter"
  },
  width: {
    type: "integer",
    default: 600
  },
  alignment: {
    type: "string",
    default: "left"
  }
};

export interface AttributesV1_0_19 extends Record<string, unknown> {
  title: string;
  width: number;
  alignment: string;
}
