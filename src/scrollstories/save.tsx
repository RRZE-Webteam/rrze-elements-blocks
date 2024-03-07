import { useBlockProps, InnerBlocks } from "@wordpress/block-editor";

interface SaveProps {
  attributes: {
    color: string;
    tabsUid: string;
    blockId: string;
    title: string;
  };
}

export default function save({ attributes }: SaveProps) {
  const blockProps = useBlockProps.save();
  return (
    <>
      <div {...blockProps}>
        <div id="scroll-container">
          <section className="section one">
            <p>Text</p>
          </section>
          <section className="section two">
          <InnerBlocks.Content />
          </section>
          <section className="section three">
          <p>Text</p>
          </section>
          <section className="section last">
          <p>Text</p>
          </section>
          <section className="section last">
          <p>Text</p>
          </section>
        </div>
      </div>
    </>
  );
}
