import {
  useBlockProps,
  InnerBlocks, BlockControls, RichText,
} from "@wordpress/block-editor";
import {useSelect} from "@wordpress/data";
import type {ComponentType} from "@wordpress/element";
import {useRef} from "@wordpress/element";
import {__} from "@wordpress/i18n";
import {SVG, Path, ToolbarItem, ToolbarDropdownMenu, ToolbarGroup} from "@wordpress/components";

// @ts-ignore
import {HeadingLevelDropdown} from "@wordpress/block-editor";

type WPBlock = {
  clientId: string;
  innerBlocks: WPBlock[];
};

interface EditProps {
  clientId: string;
  attributes: {
    title: string;
    headingLevel: number;
    hideHeading: boolean;
  };
  setAttributes: (a: Record<string, unknown>) => void;
}

const MAX_CHILDREN = 4;

export default function Edit({attributes, setAttributes, clientId}: EditProps) {
  const blockProps = useBlockProps();
  const containerRef = useRef<HTMLDivElement>(null);

  const childCount = useSelect(
    (select) => {
      const {getBlock} = select("core/block-editor") as {
        getBlock: (id: string) => WPBlock | undefined;
      };
      return getBlock(clientId)?.innerBlocks.length ?? 0;
    },
    [clientId]
  );

  /**
   * Creates an SVG icon for the hideHeading feature.
   * @param fillColor - The color to fill the SVG path with.
   * @returns         - The SVG icon.
   */
  const createXrayIcon = (fillColor = "none") => (
    <SVG xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px">
      <Path fill={fillColor} d="M420-160v-520H200v-120h560v120H540v520H420Z"/>
    </SVG>
  );

  // Define inactive and active hideHeading icons
  const inactiveHeadingIcon = createXrayIcon("#D3D3D3");
  const ActiveHeadingIcon = createXrayIcon("#000");

  const ConditionalAppender: ComponentType = (props) =>
    childCount < MAX_CHILDREN ? (
      <InnerBlocks.ButtonBlockAppender {...props} />
    ) : null;

  return (
    <div {...blockProps}>
      <BlockControls>
        <HeadingLevelDropdown
          onChange={(headingLevel: number) => {
            setAttributes({headingLevel})
          }}
          options={[
            2,
            3,
            4,
            5,
            6
          ]}
          value={attributes.headingLevel}
        />
        <ToolbarGroup>
          <ToolbarItem>
            {() => (
              <ToolbarDropdownMenu
                icon={!attributes.hideHeading ? ActiveHeadingIcon : inactiveHeadingIcon}
                label={__("Display options for the Title", "rrze-elements-blocks")}
                controls={[
                  {
                    title: __(
                      "Add a Section Title for the Facts Grid.",
                      "rrze-elements-blocks",
                    ),
                    icon: ActiveHeadingIcon,
                    onClick: () => setAttributes({hideHeading: false}),
                  },
                  {
                    title: __(
                      "Hide the Section Title for the Facts Grid.",
                      "rrze-elements-blocks",
                    ),
                    icon: inactiveHeadingIcon,
                    onClick: () => setAttributes({hideHeading: true}),
                  },
                ]}
              />
            )}
          </ToolbarItem>
        </ToolbarGroup>
      </BlockControls>
      {!attributes.hideHeading && (
        <div className={"wp-block-fau-elemental-fau-meta-headline"}>
          <RichText
            tagName="span"
            value={attributes.title}
            onChange={(title) => setAttributes({title})}
            allowedFormats={[]}
            placeholder={__("Section Heading", "rrze-elements-blocks")}
          />
        </div>
      )}
      <ul className={"facts"}>
        <InnerBlocks
          renderAppender={ConditionalAppender}
          orientation="horizontal"
          template={[
            ["rrze-elements/fact"],
            ["rrze-elements/fact"],
            ["rrze-elements/fact"],
            ["rrze-elements/fact"],
          ]}
          allowedBlocks={["rrze-elements/fact"]}
        />
      </ul>
    </div>
  );
}
