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
  width: '100%',
  float: 'left',
  marginRight: '-100%',
  position: 'relative',
  opacity: 1,
  display: 'block',
  zIndex: 2,
};

const liStyleInactive: React.CSSProperties = {
  width: '100%',
  float: 'left',
  marginRight: '-100%',
  position: 'relative',
  opacity: 0,
  display: 'block',
  zIndex: 1,
};

export default function save({ attributes }: SaveProps) {
  const blockProps = useBlockProps.save();
  return (
    <>
      <div {...blockProps}>
        <div className="example">
          <div className="content-slider flexslider clear clearfix">
            <ul className="slides">
              <li
                className="flex-active-slide"
                data-thumb-alt=""
                style={liStyle}
              >
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.
                </p>
              </li>
              <li
                data-thumb-alt=""
                className=""
                style={liStyleInactive}
              >
                <p>
                  <img
                    decoding="async"
                    className="alignleft size-thumbnail wp-image-17786"
                    src="https://www.wordpress.rrze.fau.de/files/2018/01/seitenumbruch_symbolbild-150x147.png"
                    alt="aufgeblättertes Buch als Symbolbild für den Seitenumbruch"
                    width="150"
                    height="147"
                    draggable="false"
                  />
                  Duis aute irure dolor in reprehenderit in voluptate velit esse
                  cillum dolore eu fugiat nulla pariatur. Excepteur sint
                  occaecat cupidatat non proident, sunt in culpa qui officia
                  deserunt mollit anim id est laborum.
                </p>
              </li>
            </ul>
            <ol className="flex-control-nav flex-control-paging">
              <li>
                <a href="#" className="flex-active">
                  1
                </a>
              </li>
              <li>
                <a href="#" className="">
                  2
                </a>
              </li>
            </ol>
            <ul className="flex-direction-nav">
              <li className="flex-nav-prev">
                <a className="flex-prev" href="#">
                  Previous
                </a>
              </li>
              <li className="flex-nav-next">
                <a className="flex-next" href="#">
                  Next
                </a>
              </li>
            </ul>
            <div className="flex-pauseplay">
              <a href="#" className="flex-pause">
                Pause
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
