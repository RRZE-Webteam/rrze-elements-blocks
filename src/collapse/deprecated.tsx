import { BlockDeprecation } from "@wordpress/blocks";
import { useBlockProps, InnerBlocks } from "@wordpress/block-editor";
import HeadingComponent from "../components/HeadingComponent";

interface AttributesV1 {
  message: string;
  loadOpen: boolean;
  expandAllLink: boolean;
  hstart: number;
  register: boolean;
  sameBlockCount: number;
  title: string;
  color: string;
  totalChildrenCount: number;
  childrenCount: number;
  jumpName: string;
  icon: string;
  svgString: string;
}

// interface AttributesV2 extends AttributesV1 {
//   newAttribute: string;
// }

// interface AttributesV3 extends AttributesV2 {
//   anotherNewAttribute: string;
// }

const deprecated: BlockDeprecation<
  AttributesV1
>[] = [
  {
    attributes: {
      message: {
        type: "string",
        source: "text",
        selector: "div",
      },
      loadOpen: {
        type: "boolean",
        default: false,
      },
      expandAllLink: {
        type: "boolean",
        default: false,
      },
      hstart: {
        type: "number",
        default: 2,
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
        default: "",
      },
      color: {
        type: "string",
        default: "",
      },
      totalChildrenCount: {
        type: "number",
        default: 0,
      },
      childrenCount: {
        type: "number",
        default: 0,
      },
      jumpName: {
        type: "string",
        default: "",
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
        jumpName,
        svgString,
        loadOpen,
        hstart,
      } = attributes;

      let output = "";
      if (jumpName === "") {
        output = `collapse_${sameBlockCount + totalChildrenCount}`;
      } else {
        output = `${jumpName}`;
      }

      let loadOnPageLoad = "";
      let activeOnPageLoad = "";

      if (loadOpen) {
        loadOnPageLoad = "open";
        activeOnPageLoad = "active";
      }

      return (
        <div {...blockProps}>
          {" "}
          <>
            <div className={`accordion-group ${color}`}>
              <HeadingComponent level={hstart} className="accordion-heading">
                <span className="read-mode-only">{title}</span>
                <button
                  className={`accordion-toggle ${activeOnPageLoad}`}
                  data-toggle="collapse"
                  data-name={output}
                  //@ts-ignore
                  href={`#${output}`}
                >
                  {svgString && <span className={svgString}></span>}
                  {title || "…"}
                </button>
              </HeadingComponent>
              <div
                id={`collapse_${sameBlockCount + totalChildrenCount}`}
                className={`accordion-body ${loadOnPageLoad}`}
                //@ts-ignore
                name={output}
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
