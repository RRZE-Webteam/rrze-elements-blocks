import { InspectorControls } from "@wordpress/block-editor";
import { PanelBody, ToggleControl } from "@wordpress/components";
import { __ } from "@wordpress/i18n";

import { IconPicker } from "./IconPicker";
import { TitleInspectorControls } from "./TitleSettings";


interface EditProps {
  attributes: {
    svgString?: string;
    directory?: string;
    icon?: string;
    title?: string;
  };

  setAttributes: (attributes: Partial<EditProps["attributes"]>) => void;
}

const CustomInspectorControls = ({
    attributes,
    setAttributes,
    }: EditProps): JSX.Element => {
    
    return (
        <>
        <InspectorControls>
        <TitleInspectorControls attributes={{title: attributes.title}} setAttributes={setAttributes} />
        <PanelBody title={__("Icon Settings", "rrze-elements-b")}>
          <IconPicker
            attributes={{
              directory: attributes.directory,
              icon: attributes.icon,
              svgString: attributes.svgString,
            }}
            setAttributes={setAttributes}
          />
        </PanelBody>
        </InspectorControls>
        </>
    );
}

export { CustomInspectorControls };