//Imports for necessary WordPress libraries
import { __ } from "@wordpress/i18n";
import {
  ToolbarDropdownMenu,
  __experimentalDivider as Divider,
  __experimentalToggleGroupControl as ToggleGroupControl,
  __experimentalToggleGroupControlOption as ToggleGroupControlOption,
  __experimentalText as Text
} from "@wordpress/components";
import {
  headingLevel2,
  headingLevel3,
  headingLevel4,
  headingLevel5,
  headingLevel6,
} from "@wordpress/icons";

type SaveProps = {
  attributes: {
    hstart: number;
  },
  setAttributes: (newAttributes: { hstart: number }) => void;
}

/**
 * Checks the heading level and returns the corresponding icon
 * @param hstart - The heading level
 * @returns
 */
const checkHeadingLevelIcon = (hstart: number) => {
  switch (hstart) {
    case 2:
      return headingLevel2;
    case 3:
      return headingLevel3;
    case 4:
      return headingLevel4;
    case 5:
      return headingLevel5;
    case 6:
      return headingLevel6;
    default:
      return headingLevel2; // default icon if none matches
  }
};

/**
 * Creates a Selector for hstart inside the Blockeditor
 * @param props - The properties passed to the component
 * @returns JSX element
 */
const HeadingSelector = ({ attributes, setAttributes }: SaveProps) => {
  const handleToggleHeadingGroup = (newValue: number) => {
    setAttributes({ hstart: newValue });
  };

  return (
    <ToolbarDropdownMenu
      icon={checkHeadingLevelIcon(attributes.hstart)}
      label={__("Select heading level", "rrze-elements-blocks")}
      controls={[
        {
          title: "H2",
          isDisabled: attributes.hstart === 2,
          onClick: () => handleToggleHeadingGroup(2),
        },
        {
          title: "H3",
          isDisabled: attributes.hstart === 3,
          onClick: () => handleToggleHeadingGroup(3),
        },
        {
          title: "H4",
          isDisabled: attributes.hstart === 4,
          onClick: () => handleToggleHeadingGroup(4),
        },
        {
          title: "H5",
          isDisabled: attributes.hstart === 5,
          onClick: () => handleToggleHeadingGroup(5),
        },
        {
          title: "H6",
          isDisabled: attributes.hstart === 6,
          onClick: () => handleToggleHeadingGroup(6),
        },
      ]}
    />
  );
};

/**
 * Creates a Dropdown HeadingSelector for hstart inside the BlockControls
 * @param props - The properties passed to the component
 * @returns JSX element
 */
const HeadingSelectorInspector = ({ attributes, setAttributes }: SaveProps) => {
  const handleToggleHeadingGroup = (newValue: number) => {
    setAttributes({ hstart: newValue });
  };

  return (
    <>
      <ToggleGroupControl
        label={__("Heading level", "rrze-elements-blocks")}
        value={attributes.hstart}
        onChange={handleToggleHeadingGroup}
        isBlock
        __next40pxDefaultSize
        __nextHasNoMarginBottom
      >
        <ToggleGroupControlOption value={2} label="H2" />
        <ToggleGroupControlOption value={3} label="H3" />
        <ToggleGroupControlOption value={4} label="H4" />
        <ToggleGroupControlOption value={5} label="H5" />
        <ToggleGroupControlOption value={6} label="H6" />
      </ToggleGroupControl>
      <Text>
        {__("Controls the heading level of the accordion", "rrze-elements-blocks")}
    </Text>
      <Divider />
    </>
  );
};

export { HeadingSelector, HeadingSelectorInspector };
