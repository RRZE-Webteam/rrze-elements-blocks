import {BlockAttributes} from '@wordpress/blocks';

export const attributes: BlockAttributes = {
  title: {
    type: "string",
    default: "Insertion"
  },
  alignment: {
    type: "string",
    default: "left"
  }
};

export interface AttributesV1_0_19 {
  title: string;
  alignment: string;
}
