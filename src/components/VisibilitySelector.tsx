import {__} from "@wordpress/i18n";
import {
  ToolbarDropdownMenu,
  ToolbarItem,
  ToolbarGroup,
  __experimentalToggleGroupControl as ToggleGroupControl,
  __experimentalToggleGroupControlOptionIcon as ToggleGroupControlOptionIcon,
} from "@wordpress/components";
import {seen, unseen} from "@wordpress/icons";

type WrapperVisibility = "visible" | "hidden";

type VisibilitySelectorProps = {
  attributes: {
    showImageWrapper?: boolean;
  };
  setAttributes: (newAttributes: { showImageWrapper: boolean }) => void;
};

const visibilityOptions: Array<{
  value: WrapperVisibility;
  label: string;
  icon: typeof seen;
}> = [
  {
    value: "hidden",
    label: __("Hide editor image wrapper", "rrze-elements-blocks"),
    icon: unseen,
  },
  {
    value: "visible",
    label: __("Show editor image wrapper", "rrze-elements-blocks"),
    icon: seen,
  },
];

const getVisibilityValue = (showImageWrapper = true): WrapperVisibility =>
  showImageWrapper ? "visible" : "hidden";

const getVisibilityIcon = (visibility: WrapperVisibility) =>
  visibilityOptions.find((option) => option.value === visibility)?.icon ?? seen;

/**
 * VisibilitySelector component - Displays a Selector for the BlockControls Toolbar to switch editor wrapper visibility.
 * @param props - React props
 * @returns     - The rendered VisibilitySelector component
 */
const VisibilitySelectorToolbar = ({
  attributes,
  setAttributes,
}: VisibilitySelectorProps) => {
  const visibility = getVisibilityValue(attributes.showImageWrapper);

  const toggleVisibility = (newVisibility: WrapperVisibility) => {
    setAttributes({showImageWrapper: newVisibility === "visible"});
  };

  return (
    <ToolbarGroup>
      <ToolbarItem>
        {() => (
          <ToolbarDropdownMenu
            icon={getVisibilityIcon(visibility)}
            label={__("Control editor image wrapper visibility", "rrze-elements-blocks")}
            controls={visibilityOptions.map((option) => ({
              title: option.label,
              icon: option.icon,
              onClick: () => toggleVisibility(option.value),
              isDisabled: visibility === option.value,
            }))}
          />
        )}
      </ToolbarItem>
    </ToolbarGroup>
  );
};

/**
 * VisibilitySelector component for the InspectorControl Area - Displays a selector to switch editor wrapper visibility.
 * @param props - React props
 * @returns     - The rendered VisibilitySelector component
 */
const VisibilitySelectorPanel = ({
  attributes,
  setAttributes,
}: VisibilitySelectorProps) => {
  const visibility = getVisibilityValue(attributes.showImageWrapper);

  const toggleVisibility = (newVisibility: WrapperVisibility) => {
    setAttributes({showImageWrapper: newVisibility === "visible"});
  };

  return (
    <ToggleGroupControl
      label={__("Control editor image wrapper visibility", "rrze-elements-blocks")}
      value={visibility}
      isBlock
      onChange={toggleVisibility}
    >
      {visibilityOptions.map((option) => (
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

export {VisibilitySelectorToolbar, VisibilitySelectorPanel};
