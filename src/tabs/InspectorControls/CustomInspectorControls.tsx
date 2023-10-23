import { InspectorControls } from "@wordpress/block-editor";
import { PanelBody, ToggleControl } from "@wordpress/components";
import { __ } from "@wordpress/i18n";

import { XrayBar } from "./Xray";
import { ColorSwitcher } from "./ColorSwitcher";

interface EditProps {
  attributes: {
    xray?: boolean;
    color?: string;
  };
  setAttributes: (attributes: Partial<EditProps["attributes"]>) => void;
}

const CustomInspectorControls = ({
    attributes,
    setAttributes,
    }: EditProps): JSX.Element => {
    const { xray } = attributes;
    
    return (
        <>
        <InspectorControls>
            <PanelBody title={__("X-ray", "rrze-elements")} initialOpen={false}>
            <ToggleControl
                label={__("Show / Hide all inactive tabs inside the editor.", "rrze-elements")}
                checked={xray}
                onChange={(xray) => setAttributes({ xray })}
            />
            </PanelBody>
            <ColorSwitcher attributes={{color: attributes.color}} setAttributes={setAttributes} />

        </InspectorControls>
        </>
    );
}

export { CustomInspectorControls };