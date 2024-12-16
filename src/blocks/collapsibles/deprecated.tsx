import { BlockDeprecation } from "@wordpress/blocks";

import saveV1_0_3 from "./v1.0.3/save";
import migrateV1_0_3 from "./v1.0.3/migrate";
import {attributes as attributesV1, AttributesV1 } from "./v1.0.3/attributes";

import saveV1_0_13 from "./v1.0.13/save";
import migrateV1_0_13 from "./v1.0.13/migrate";
import {attributes as attributesV1_0_13 } from "./v1.0.13/attributes";

import saveV1_0_13_2 from "./v1.0.13-2/save";
import migrateV1_0_13_2 from "./v1.0.13-2/migrate";
import {attributes as attributesV1_0_13_2 } from "./v1.0.13-2/attributes";

// interface AttributesV2 extends AttributesV1 {
//   newAttribute: string;
// }

// interface AttributesV3 extends AttributesV2 {
//   anotherNewAttribute: string;
// }

const deprecated: BlockDeprecation<AttributesV1>[] = [
  {
    attributes: attributesV1_0_13_2,
    save: saveV1_0_13_2,
    migrate: migrateV1_0_13_2,
  },
  {
    attributes: attributesV1_0_13,
    save: saveV1_0_13,
    migrate: migrateV1_0_13,
  },
  {
    attributes: attributesV1,
    save: saveV1_0_3,
    migrate: migrateV1_0_3,
  }
];

export default deprecated;
