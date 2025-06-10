import { BlockDeprecation } from "@wordpress/blocks";

import saveV1_0_3 from "./v1.0.3/save";
import migrateV1_0_3 from "./v1.0.3/migrate";
import {attributes as attributesV1, AttributesV1 } from "./v1.0.3/attributes";

import saveV1_0_19 from "./v1.0.19/save";
import migrateV1_0_19 from "./v1.0.19/migrate";
import {attributes as attributesV1_0_19, AttributesV1_0_19 } from "./v1.0.19/attributes";

// interface AttributesV2 extends AttributesV1 {
//   newAttribute: string;
// }

// interface AttributesV3 extends AttributesV2 {
//   anotherNewAttribute: string;
// }

const deprecated: BlockDeprecation<AttributesV1 | AttributesV1_0_19>[] = [
  {
    attributes: attributesV1,
    save: saveV1_0_3,
    migrate: migrateV1_0_3,
  },
  {
    attributes: attributesV1_0_19,
    save: saveV1_0_19,
    migrate: migrateV1_0_19,
  }
];

export default deprecated;
