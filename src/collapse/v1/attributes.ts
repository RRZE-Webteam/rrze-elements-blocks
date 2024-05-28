import { BlockAttributes } from "@wordpress/blocks";

export const attributes: BlockAttributes = {

  message: {
    type: "string",
    source: "text",
    selector: "div",
  },
  loadOpen: {
    type: "boolean",
    default: false,
  },
  expandAllLink: {
    type: "boolean",
    default: false,
  },
  hstart: {
    type: "number",
    default: 2,
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
    default: "",
  },
  totalChildrenCount: {
    type: "number",
    default: 0,
  },
  childrenCount: {
    type: "number",
    default: 0,
  },
  jumpName: {
    type: "string",
    default: "",
  },
  icon: {
    type: "string",
    default: "",
  },
  svgString: {
    type: "string",
    default: "",
  },
};

export interface AttributesV1 {
  message: string;
  loadOpen: boolean;
  expandAllLink: boolean;
  hstart: number;
  register: boolean;
  sameBlockCount: number;
  title: string;
  color: string;
  totalChildrenCount: number;
  childrenCount: number;
  jumpName: string;
  icon: string;
  svgString: string;
}