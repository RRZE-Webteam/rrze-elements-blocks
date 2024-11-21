import { BlockDeprecation } from "@wordpress/blocks";

import saveV1 from "./v1/save";
import migrateV1 from "./v1/migrate";
import {attributes as attributesV1, AttributesV1 } from "./v1/attributes";

import saveV1_0_3 from "./v1.0.3/save";
import saveV1_0_8 from "./v1.0.8/save";

const deprecated: BlockDeprecation<AttributesV1>[] = [
  {
    attributes: attributesV1,
    save: saveV1,
    migrate: migrateV1,
  },
  {
    attributes: attributesV1,
    save: saveV1_0_3,
    migrate: migrateV1,
  },
  {
    attributes: attributesV1,
    save: saveV1_0_8,
    migrate: migrateV1,
  }
];

export default deprecated;
