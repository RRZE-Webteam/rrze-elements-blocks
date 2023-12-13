import { useBlockProps } from "@wordpress/block-editor";

interface SaveProps {
  attributes: {
    color: string;
    tabsUid: string;
    blockId: string;
    title: string;
  };
}

const liStyle: React.CSSProperties = {
  width: "100%",
  float: "left",
  marginRight: "-100%",
  position: "relative",
  opacity: 1,
  display: "block",
  zIndex: 2,
};

const liStyleInactive: React.CSSProperties = {
  width: "100%",
  float: "left",
  marginRight: "-100%",
  position: "relative",
  opacity: 0,
  display: "block",
  zIndex: 1,
};

export default function save({ attributes }: SaveProps) {
  const blockProps = useBlockProps.save();
  return (
    <>
      <div {...blockProps}>
        <section className="slider-wrapper">
          <button className="slide-arrow" id="slide-arrow-prev">
            &#8249;
          </button>
          <button className="slide-arrow" id="slide-arrow-next">
            &#8250;
          </button>
          <ul className="slides-container" id="slides-container">
            <li className="slide"></li>
            <li className="slide"></li>
            <li className="slide"></li>
            <li className="slide"></li>
          </ul>
        </section>
      </div>
    </>
  );
}
