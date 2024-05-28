import { BlockDeprecation } from "@wordpress/blocks";
import { useBlockProps, InnerBlocks } from "@wordpress/block-editor";
import HeadingComponent from "../components/HeadingComponent";

import saveV1 from "./v1/save";
import migrateV1 from "./v1/migrate";
import {attributes as attributesV1, AttributesV1 } from "./v1/attributes";

const deprecated: BlockDeprecation<AttributesV1>[] = [
  {
    attributes: attributesV1,
    save: saveV1,
    migrate: migrateV1,
  },
];

export default deprecated;
