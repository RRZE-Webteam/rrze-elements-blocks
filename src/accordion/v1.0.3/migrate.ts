import { AttributesV1 } from "../v1/attributes";

const migrate = (attributes: AttributesV1): AttributesV1 => {
  return {
    ...attributes,
  };
};

export default migrate;
