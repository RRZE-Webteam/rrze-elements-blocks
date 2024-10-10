import { AttributesV1 } from "./attributes";

const migrate = (attributes: AttributesV1): AttributesV1 => {
  return {
    ...attributes,
  };
};

export default migrate;