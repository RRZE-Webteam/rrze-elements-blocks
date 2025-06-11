import { BlockAttributes } from "@wordpress/blocks";

export const attributes: BlockAttributes = {
  expandAllLink: {
    type: "boolean",
    default: false
  },
  hstart: {
    type: "integer",
    default: 2
  },
  expandLabel: {
    type: "string",
    default: "Expand All"
  }
};

export interface AttributesV1_0_19 {
  expandAllLink: boolean;
  hstart: number;
  expandLabel: string;
  setAttributes: (newAttributes: {
    expandAllLink?: boolean;
    hstart?: number;
    expandLabel?: string;
  }) => void;
  clientId?: string;
}
