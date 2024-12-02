// Imports from WordPress libraries
import {
  useBlockProps,
} from "@wordpress/block-editor";

// interface EditProps {
//   blockProps: string[];
// }

export default function Edit() {
  const props = useBlockProps();

  return (
    <div {...props}>
      <h2>Hello World!</h2>
    </div>
  );
}
