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

import saveV1_0_19 from "./v1.0.19/save";
import migrateV1_0_19 from "./v1.0.19/migrate";
import {attributes as attributesV1_0_19 } from "./v1.0.19/attributes";

const deprecated: BlockDeprecation<AttributesV1>[] = [
  {
    attributes: attributesV1_0_19,
    save: saveV1_0_19,
    migrate: migrateV1_0_19
  },
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
