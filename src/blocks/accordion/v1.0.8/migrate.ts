import { AttributesV1_0_8 } from "./attributes";
const migrate = (attributes: AttributesV1_0_8): AttributesV1_0_8 => {
  return {
    ...attributes,
  };
};

export default migrate;
