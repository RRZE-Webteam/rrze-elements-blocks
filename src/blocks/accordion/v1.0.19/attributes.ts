import { BlockAttributes } from "@wordpress/blocks";

export const attributes: BlockAttributes = {
  expandAllLink: {
    type: "boolean",
    default: false,
  },
  hstart: {
    type: "number",
    default: 3,
  },
  register: {
    type: "boolean",
    default: false,
  },
  sameBlockCount: {
    type: "number",
    default: 0,
  },
  title: {
    type: "string",
    default: "",
  },
  color: {
    type: "string",
    default: "inherit",
  },
  totalChildrenCount: {
    type: "number",
    default: 0,
  },
  ancestorCount: {
    type: "number",
    default: 0,
  },
  icon: {
    type: "string",
    default: "",
  },
  svgString: {
    type: "string",
    default: "",
  },
  jumpName: {
    type: "string",
    default: ""
  }
};

export interface AttributesV1_0_19 {
  totalChildrenCount?: number;
  sameBlockCount?: number;
  title: string;
  color: string;
  loadOpen: boolean;
  icon: string;
  hstart?: number;
  jumpName?: string;
  svgString?: string;
  ancestorCount?: number;
}
