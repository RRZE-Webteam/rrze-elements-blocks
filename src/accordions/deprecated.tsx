import { BlockDeprecation } from "@wordpress/blocks";
import { useBlockProps, InnerBlocks } from "@wordpress/block-editor";
import HeadingComponent from "../components/HeadingComponent";

import saveV1_0_3 from "./v1.0.3/save";
import migrateV1_0_3 from "./v1.0.3/migrate";
import {attributes as attributesV1, AttributesV1 } from "./v1.0.3/attributes";

// interface AttributesV2 extends AttributesV1 {
//   newAttribute: string;
// }

// interface AttributesV3 extends AttributesV2 {
//   anotherNewAttribute: string;
// }

const deprecated: BlockDeprecation<AttributesV1>[] = [
  {
    attributes: attributesV1,
    save: saveV1_0_3,
    migrate: migrateV1_0_3,
  }
];

export default deprecated;
