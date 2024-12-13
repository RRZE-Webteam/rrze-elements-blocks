// TODO: Add interface for the resizeObserver instead of any
import {
	useBlockProps,
	InnerBlocks,
	BlockControls,
} from "@wordpress/block-editor";

import { ResizableBox } from "@wordpress/components";

import { __ } from "@wordpress/i18n";
import { useState } from "@wordpress/element";
import { AlignmentBar } from "../../components/Alignment";

/////////// Interfaces ///////////
interface EditProps {
	blockProps: any;
	attributes: {
		width: number;
		alignment: string;
	};
	setAttributes: (attributes: Partial<EditProps["attributes"]>) => void;
}

interface MouseEvent {
	clientX: number;
	clientY: number;
}

interface HTMLElement {
	offsetWidth: number;
}

/**
 * Edit component for the Content Width Limiter block.
 *
 * Provides controls for customizing the Content Width Limiter-block and renders the block inside the editor.
 *
 * @param props - The properties passed to the component.
 * @returns     - The JSX representation of the component.
 */
export default function Edit({ attributes, setAttributes }: EditProps) {
	const props = useBlockProps();
	// Initialize state with the width from attributes
	const [width, setWidth] = useState(attributes.width);
	const [background, setBackground] = useState("transparent");
	const [active, setActive] = useState(false);
	const alignment = attributes.alignment;

	const onChangeResizer = (
		event: MouseEvent,
		direction: string,
		elementRef: HTMLElement,
	): void => {
		const newWidth = elementRef.offsetWidth;

		if (newWidth >= 300 && newWidth <= 1040) {
			setWidth(newWidth);
		}
		setActive(true);

		if (
			Math.round(newWidth * 0.125) >= 50 &&
			Math.round(newWidth * 0.125) <= 75
		) {
			setBackground("#cfedd8");
		} else if (newWidth <= 300 || newWidth >= 1040) {
			setBackground("#E61607");
		} else {
			setBackground("#f2ded1");
		}
	};

	const onChangeResizerStop = (
		event: MouseEvent,
		direction: string,
		elementRef: HTMLElement,
	): void => {
		const finalWidth = elementRef.offsetWidth;
		// Finalize the width when resizing stops
		if (finalWidth >= 300 && finalWidth <= 1040) {
			setWidth(finalWidth);
			setAttributes({ width: finalWidth });
		}
		setBackground("transparent");
		setActive(false);
	};

	let hint = "";
	if (Math.round(width * 0.125) >= 50 && Math.round(width * 0.125) <= 75) {
		hint = __(" (Ideale Leselänge)", "rrze-elements-blocks");
	} else if (width <= 300 || width >= 1040) {
		hint = __(" (Außerhalb des sichtbaren Bereichs)", "rrze-elements-blocks");
	} else {
		hint = "";
	}

	let showHandleLeft = false;
	let showHandleRight = false;
	if (alignment === "right") {
		showHandleLeft = true;
		showHandleRight = false;
	} else if (alignment === "center") {
		showHandleLeft = true;
		showHandleRight = true;
	} else {
		showHandleLeft = false;
		showHandleRight = true;
	}

	return (
		<div {...props} className={`${props.className}`}>
			<BlockControls>
				<AlignmentBar
					attributes={{ alignment }}
					setAttributes={setAttributes}
					showCenterAlign={true}
				/>
			</BlockControls>
			{active &&
				__("Ca. ") +
					Math.round(width * 0.125) +
					__(" Zeichen", "rrze-elements-blocks") +
					hint}
			<ResizableBox
				className={`limit-width cwl-${alignment}`}
				enable={{
					bottom: false,
					bottomLeft: false,
					bottomRight: false,
					left: showHandleLeft,
					right: showHandleRight,
					top: false,
					topLeft: false,
					topRight: false,
				}}
				onResizeStop={onChangeResizerStop as any}
				onResize={onChangeResizer as any}
				size={{
					height: "auto",
					width: width,
				}}
			>
				<div
					style={{
						alignItems: "center",
						background: background,
						display: "flex",
						height: "100%",
						justifyContent: "left",
						width: Math.round(width * 0.125) + "ch",
					}}
				>
					<InnerBlocks template={[["core/paragraph"]]} />
				</div>
			</ResizableBox>
		</div>
	);
}
