import { BlockDeprecation } from "@wordpress/blocks";
import { useBlockProps, InnerBlocks } from "@wordpress/block-editor";
import HeadingComponent from "../components/HeadingComponent";

interface AttributesV1 {
  totalChildrenCount?: number;
  sameBlockCount?: number;
  title: string;
  color: string;
  loadOpen: boolean;
  icon: string;
  hstart?: number;
  jumpName?: string;
  svgString?: string;
  ancestorCount?: number;
}

// interface AttributesV2 extends AttributesV1 {
//   newAttribute: string;
// }

// interface AttributesV3 extends AttributesV2 {
//   anotherNewAttribute: string;
// }

const deprecated: BlockDeprecation<AttributesV1>[] = [
  {
    attributes: {
      expandAllLink: {
        type: "boolean",
        default: false,
      },
      hstart: {
        type: "number",
        default: 3,
      },
      register: {
        type: "boolean",
        default: false,
      },
      sameBlockCount: {
        type: "number",
        default: 0,
      },
      title: {
        type: "string",
        default: "Enter your Title",
      },
      color: {
        type: "string",
        default: "inherit",
      },
      totalChildrenCount: {
        type: "number",
        default: 0,
      },
      ancestorCount: {
        type: "number",
        default: 0,
      },
      icon: {
        type: "string",
        default: "",
      },
      svgString: {
        type: "string",
        default: "",
      },
    },
    save: (props) => {
      const { attributes } = props;
      const blockProps = useBlockProps.save();
      const {
        sameBlockCount,
        totalChildrenCount,
        color,
        title,
        svgString,
        ancestorCount,
        hstart,
      } = attributes;

      return (
        <div {...blockProps}>
          {" "}
          <>
            <div className={`accordion-group ${attributes.color}`}>
              <HeadingComponent
                level={hstart + 1}
                className="accordion-heading"
              >
                <span className="read-mode-only">{title}</span>
                <button
                  className="accordion-toggle"
                  data-toggle="collapse"
                  data-href={`#collapse_${
                    sameBlockCount + totalChildrenCount + ancestorCount
                  }`}
                >
                  {svgString && <span className={svgString}></span>}
                  {title || "…"}
                </button>
              </HeadingComponent>
              <div
                id={`collapse_${
                  sameBlockCount + totalChildrenCount + ancestorCount
                }`}
                className="accordion-body"
                style={{ display: "none" }}
              >
                <div className="accordion-inner clearfix">
                  <InnerBlocks.Content />
                </div>
              </div>
            </div>
          </>
        </div>
      );
    },
    migrate: (attributes) => {
      return {
        ...attributes,
      } as AttributesV1;
    },
  },
];

export default deprecated;
