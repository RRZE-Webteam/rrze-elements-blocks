import { __ } from "@wordpress/i18n";
import {
  ToolbarDropdownMenu,
  ToolbarItem,
  ToolbarGroup,
  SVG,
  Path,
  __experimentalToggleGroupControl as ToggleGroupControl,
  __experimentalToggleGroupControlOptionIcon as ToggleGroupControlOptionIcon,
} from "@wordpress/components";
import {
  drawerLeft,
  drawerRight
} from "@wordpress/icons";

type ViewRatioSelectorProps = {
  attributes : {
    viewRatio: "2:1" | "1:2";
  };
  setAttributes: (newAttributes: { viewRatio: "2:1" | "1:2"}) => void
};


/**
 * Creates the SVG Icon for the ViewRatioSelector Toolbar
 * @param fillColor : Fillcolor Value
 * @param viewRatio : Either 2:1 or 1:2
 */
const createViewRatioIcon = (fillColor = "none", viewRatio: "2:1" | "1:2") => {
  switch (viewRatio) {
    case '1:2':
      return (<SVG xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"
                   fill={fillColor}><Path
        d="M500-640v320l160-160-160-160ZM200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm120-80v-560H200v560h120Zm80 0h360v-560H400v560Zm-80 0H200h120Z"/></SVG>);
    case '2:1':
      return (<SVG xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"
                   fill={fillColor}><Path
        d="M460-320v-320L300-480l160 160ZM200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm440-80h120v-560H640v560Zm-80 0v-560H200v560h360Zm80 0h120-120Z"/></SVG>);
  };
}

const largeImageIcon = createViewRatioIcon("evenodd", "2:1");
const smallImageIcon = createViewRatioIcon("evenodd", "1:2");

/**
 * ViewRatioSelector component - Displays a Selector for the BlockControls Toolbar to switch between 2fr|1fr or 2fr|1fr display mode.
 * @param props - React props
 * @returns     - The rendered ViewRatioSelector component
 */
const ViewRatioSelectorToolbar = ({ attributes, setAttributes }: ViewRatioSelectorProps ) => {
  const {viewRatio} = attributes;

  const toggleViewRatio = (newViewRatio: "2:1" | "1:2") => {
    setAttributes({ viewRatio: newViewRatio })
  };

  return (
    <ToolbarGroup>
      <ToolbarItem>
        {() => (
          <ToolbarDropdownMenu
            icon={(viewRatio === '2:1') ? drawerRight : drawerLeft}
            label={__("Control the Image to Content ratio", "rrze-elements-blocks")}
            controls={[
              {
                title: __(
                  "Expand content area",
                  "rrze-elements-blocks",
                ),
                icon: smallImageIcon,
                onClick: () => toggleViewRatio("2:1"),
                isDisabled: (viewRatio !== "1:2")
              },
              {
                title: __(
                  "Shrink content area",
                  "rrze-elements-blocks",
                ),
                icon: largeImageIcon,
                onClick: () => toggleViewRatio("1:2"),
                isDisabled: (viewRatio === "1:2")
              },
            ]}
          />
        )}
      </ToolbarItem>
    </ToolbarGroup>
  )
}

/**
 * ViewRatioSelector component for the InspectorControl Area - Displays a Selector to switch between 1:2 and 2:1 views
 * @param props - React props
 * @returns     - The rendered ViewRatioSelector component
 */
const ViewRatioSelectorPanel = ({attributes, setAttributes}: ViewRatioSelectorProps ) => {
  const {viewRatio} = attributes;

  const toggleViewRatio = (newViewRatio: "2:1" | "1:2") => {
    setAttributes({ viewRatio: newViewRatio })
  };


  return (
    <ToggleGroupControl
      label={__("Control the Content to Image ratio", "rrze-elements-blocks")}
      value={viewRatio}
      isBlock
      onChange={toggleViewRatio}
      >
      {/* @ts-ignore - Reason: Icon-Feature missing*/}
      <ToggleGroupControlOptionIcon value={"1:2"} label={__("1:2", "rrze-elements-blocks")} icon={drawerLeft}
      />
      {/* @ts-ignore - Reason: icon-Feature missing in Types */}
      <ToggleGroupControlOptionIcon value={"2:1"} label={__("2:1", "rrze-elements-blocks")} icon={drawerRight}
      />
    </ToggleGroupControl>
  );
}

export { ViewRatioSelectorToolbar, ViewRatioSelectorPanel };
