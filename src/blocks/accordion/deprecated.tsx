import { BlockDeprecation } from "@wordpress/blocks";

import saveV1 from "./v1/save";
import migrateV1 from "./v1/migrate";
import {attributes as attributesV1, AttributesV1 } from "./v1/attributes";
import {attributes as attributesV1_0_8} from "./v1.0.8/attributes";
import {attributes as attributesV1_0_19} from "./v1.0.19/attributes";

import saveV1_0_3 from "./v1.0.3/save";
import migrateV1_0_3 from "./v1.0.3/migrate";

import saveV1_0_8 from "./v1.0.8/save"
import migrateV1_0_8 from "./v1.0.8/migrate"

import saveV1_0_19 from "./v1.0.19/save"
import migrateV1_0_19 from "./v1.0.19/migrate"


// interface AttributesV2 extends AttributesV1 {
//   newAttribute: string;
// }

// interface AttributesV3 extends AttributesV2 {
//   anotherNewAttribute: string;
// }

const deprecated: BlockDeprecation<AttributesV1>[] = [
  {
    attributes: attributesV1,
    save: saveV1,
    migrate: migrateV1,
  },
  {
    attributes: attributesV1,
    save: saveV1_0_3,
    migrate: migrateV1_0_3,
  },
  {
    attributes: attributesV1_0_8,
    save: saveV1_0_8,
    migrate: migrateV1_0_8,
  },
  {
    attributes: attributesV1_0_19,
    save: saveV1_0_19,
    migrate: migrateV1_0_19
  }
];

export default deprecated;
