import {
	useBlockProps,
	InnerBlocks,
	InspectorControls,
	BlockControls,
} from "@wordpress/block-editor";
import { PanelBody } from "@wordpress/components";
import { __ } from "@wordpress/i18n";
import {
	HeadingSelector,
	HeadingSelectorInspector,
} from "../../components/HeadingSelector";

type SaveProps = {
	attributes: {
		hstart: number;
	};
	setAttributes: (newAttributes: { hstart: number }) => void;
	clientId?: string;
};

export default function Edit({ attributes, setAttributes }: SaveProps) {
	const props = useBlockProps();

	return (
		<div {...props}>
			<BlockControls>
				<HeadingSelector
					attributes={attributes}
					setAttributes={setAttributes}
				/>
			</BlockControls>
			<InspectorControls>
				<PanelBody
					title={__("Heading Settings", "rrze-elements-blocks")}
					initialOpen={true}
				>
					<HeadingSelectorInspector
						attributes={attributes}
						setAttributes={setAttributes}
					/>
				</PanelBody>
			</InspectorControls>
			<ol className="timeline">
				<InnerBlocks
					allowedBlocks={["rrze-elements/timeline-item"]}
					template={[
						["rrze-elements/timeline-item", {}],
						["rrze-elements/timeline-item", {}],
					]}
				/>
			</ol>
		</div>
	);
}
