
import { AttributesV1_0_19 } from "./attributes";

const migrate = (attributes: AttributesV1_0_19): AttributesV1_0_19 => {
  return {
    ...attributes,
  };
};

export default migrate;
