// import { TextControl } from "@wordpress/components";
import {
	useBlockProps,
	InnerBlocks,
	InspectorControls,
	BlockControls,
} from "@wordpress/block-editor";
import { store as blocksStore } from "@wordpress/blocks";
import { useState } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { useSelect } from "@wordpress/data";
import {
	Placeholder,
	PanelBody,
	ToolbarItem,
	ToolbarGroup,
	ToolbarButton,
	Button,
	Modal,
} from "@wordpress/components";

import { symbol } from "@wordpress/icons";
import {IconMarkComponent} from "../../components/IconPicker";
import {MaterialSymbolPicker} from "../../components/MaterialSymbolPicker";
import VariationPicker, { type NoticeVariation } from "./VariationPicker";

interface EditProps {
	attributes: {
		style?: string;
		color: string;
		textColor?: string;
		borderColor?: string;
		icon?: string;
		svgString?: string;
    materialSymbol?: string;
	};
	setAttributes: (attributes: Partial<EditProps["attributes"]>) => void;
	clientId: string;
	context: { [key: string]: any };
	blockProps: any;
}

export default function Edit({ attributes, setAttributes }: EditProps) {
	const props = useBlockProps();
	const { icon } = attributes;

	// isOpen state is used to control the opening and closing of the icon picker modal
	const [isOpen, setOpen] = useState(false);

	const blockName = "rrze-elements/notice";

	const variations: NoticeVariation[] = useSelect(
		(select) => {
			const { getBlockVariations } = select(blocksStore) as any;
			return getBlockVariations(blockName, "block");
		},
		[blockName],
	) ?? [];

	const matchedVariation = variations.find(
		(variation) => variation.name === attributes.style,
	);

  const [iconType, iconName] = matchedVariation?.iconClass?.split(" ") || [];

	const openModal = () => setOpen(true);
	const closeModal = () => setOpen(false);
	const selectVariation = (variation: NoticeVariation) => {
		// Restore the preset icon, including when reselecting the current preset.
		setAttributes({ style: variation.name, materialSymbol: "" });
	};

	return (
		<div {...props}>
			<InspectorControls>
				<PanelBody
					title={__("Style Settings", "rrze-elements-blocks")}
					initialOpen={true}
				>
					<VariationPicker
						variations={variations}
						selectedName={attributes.style}
						onSelect={selectVariation}
					/>
				</PanelBody>
			</InspectorControls>
			<BlockControls>
				<ToolbarGroup>
					<ToolbarItem>
						{() => (
							<>
								<ToolbarButton
									icon={symbol}
									label={
										icon === ""
											? __("Select a style", "rrze-elements-blocks")
											: __("Change the style", "rrze-elements-blocks")
									}
									onClick={openModal}
								/>
								{isOpen && (
									<Modal
										title={__("Select an Icon", "rrze-elements-blocks")}
										onRequestClose={closeModal}
									>
                    <MaterialSymbolPicker attributes={attributes} setAttributes={setAttributes} />
										<Button variant="primary" onClick={closeModal}>
											{__("Save changes", "rrze-elements-blocks")}
										</Button>
									</Modal>
								)}
							</>
						)}
					</ToolbarItem>
				</ToolbarGroup>
			</BlockControls>

			{!attributes.style && (
				<Placeholder
					icon="admin-plugins"
					label={__("Notice", "rrze-elements-blocks")}
				>
					<VariationPicker
						variations={variations}
						selectedName={attributes.style}
						onSelect={selectVariation}
					/>
				</Placeholder>
			)}
			<div
				className={`notice no-title ${
					attributes.style ? `${attributes.style}` : ""
				}`}
				style={
					attributes.style
						? {}
						: {
								backgroundColor: attributes.color,
								color: attributes.textColor,
								border: `1px solid ${attributes.borderColor}`,
							}
				}
			>
					<div className={"icon-container"}>
						{/* Render the icon if a matching variation is found */}
						<span
							className={`rrze-elements-icon`}
						><IconMarkComponent type={iconType} iconName={iconName} materialSymbol={attributes.materialSymbol}/></span>
					</div>
				{attributes.style && (
					<div>
						<InnerBlocks
							template={[
								[
									"core/heading",
									{
										placeholder: __("Add a Headline", "rrze-elements-blocks"),
										level: 3,
									},
								],
								[
									"core/paragraph",
									{
										placeholder: __(
											"Add a description…",
											"rrze-elements-blocks",
										),
									},
								],
							]}
							allowedBlocks={["core/heading", "core/paragraph", "core/list", "core/buttons", "core/button", "core/spacer"]}
							templateLock={false}
						/>
					</div>
				)}
			</div>
		</div>
	);
}
