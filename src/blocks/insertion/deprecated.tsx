import { BlockDeprecation } from "@wordpress/blocks";
import { attributes as attributesV1_0_19, AttributesV1_0_19} from "./v1.0.19/attributes";
import saveV1_0_19 from "./v1.0.19/save";
import migrateV1_0_19 from "./v1.0.19/migrate";

const deprecated: BlockDeprecation<AttributesV1_0_19>[] = [
  {
    attributes: attributesV1_0_19,
    save: saveV1_0_19,
    migrate: migrateV1_0_19
  }
]

export default deprecated;
