import {__} from "@wordpress/i18n";
import {
  ToolbarDropdownMenu,
  ToolbarItem,
  ToolbarGroup,
  __experimentalToggleGroupControl as ToggleGroupControl,
  __experimentalToggleGroupControlOptionIcon as ToggleGroupControlOptionIcon,
} from "@wordpress/components";
import {
  justifyBottom,
  justifyCenterVertical,
  justifyTop,
} from "@wordpress/icons";

export type MediaAlignment = "top" | "center" | "bottom";

type AlignmentSelectorProps = {
  attributes: {
    mediaAlignment: MediaAlignment;
  };
  setAttributes: (newAttributes: { mediaAlignment: MediaAlignment }) => void;
};

const alignmentOptions: Array<{
  value: MediaAlignment;
  label: string;
  icon: typeof justifyTop;
}> = [
  {
    value: "top",
    label: __("Align image to top", "rrze-elements-blocks"),
    icon: justifyTop,
  },
  {
    value: "center",
    label: __("Align image centered", "rrze-elements-blocks"),
    icon: justifyCenterVertical,
  },
  {
    value: "bottom",
    label: __("Align image to bottom", "rrze-elements-blocks"),
    icon: justifyBottom,
  },
];

const getAlignmentIcon = (alignment: MediaAlignment) =>
  alignmentOptions.find((option) => option.value === alignment)?.icon ??
  justifyTop;

/**
 * AlignmentSelector component - Displays a Selector for the BlockControls Toolbar to switch media alignment.
 * @param props - React props
 * @returns     - The rendered AlignmentSelector component
 */
const AlignmentSelectorToolbar = ({
  attributes,
  setAttributes,
}: AlignmentSelectorProps) => {
  const mediaAlignment = attributes.mediaAlignment ?? "top";

  const toggleAlignment = (newAlignment: MediaAlignment) => {
    setAttributes({mediaAlignment: newAlignment});
  };

  return (
    <ToolbarGroup>
      <ToolbarItem>
        {() => (
          <ToolbarDropdownMenu
            icon={getAlignmentIcon(mediaAlignment)}
            label={__("Control the image alignment", "rrze-elements-blocks")}
            controls={alignmentOptions.map((option) => ({
              title: option.label,
              icon: option.icon,
              onClick: () => toggleAlignment(option.value),
              isDisabled: mediaAlignment === option.value,
            }))}
          />
        )}
      </ToolbarItem>
    </ToolbarGroup>
  );
};

/**
 * AlignmentSelector component for the InspectorControl Area - Displays a selector to switch media alignment.
 * @param props - React props
 * @returns     - The rendered AlignmentSelector component
 */
const AlignmentSelectorPanel = ({
  attributes,
  setAttributes,
}: AlignmentSelectorProps) => {
  const mediaAlignment = attributes.mediaAlignment ?? "top";

  const toggleAlignment = (newAlignment: MediaAlignment) => {
    setAttributes({mediaAlignment: newAlignment});
  };

  return (
    <ToggleGroupControl
      label={__("Control the image alignment", "rrze-elements-blocks")}
      value={mediaAlignment}
      isBlock
      onChange={toggleAlignment}
    >
      {alignmentOptions.map((option) => (
        <ToggleGroupControlOptionIcon
          key={option.value}
          value={option.value}
          label={option.label}
          icon={option.icon}
        />
      ))}
    </ToggleGroupControl>
  );
};

export {AlignmentSelectorToolbar, AlignmentSelectorPanel};
