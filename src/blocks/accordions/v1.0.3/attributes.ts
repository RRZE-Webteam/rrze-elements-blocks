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
  register: {
    type: "boolean",
    default: false
  },
  sameBlockCount: {
    type: "integer",
    default: 0
  },
  childrenCount: {
    type: "integer",
    default: 0
  },
  previousBlockIds: {
    type: "array",
    default: []
  }
};

export interface AttributesV1 {
  expandAllLink: boolean;
  sameBlockCount: number;
  previousBlockIds: string[];
  hstart: number;
  childrenCount: number;
  message: string;
  previousBlockClients: string[];
  setAttributes: (newAttributes: {
    expandAllLink?: boolean;
    sameBlockCount?: number;
    previousBlockIds?: string[];
    hstart?: number;
    childrenCount?: number;
    message?: string;
    previousBlockClients?: string[];
  }) => void;
  clientId?: string;
}
