/**
 * External dependencies
 */


/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { addFilter } from '@wordpress/hooks';
import { select, dispatch } from '@wordpress/data';
import { BlockControls } from '@wordpress/block-editor';
import { ToolbarGroup, ToolbarButton } from '@wordpress/components';

/**
 * Insert a <span> with class 'fa-solid fa-icon' at the cursor position
 */
const insertTextAtCursor = () => {
	const editor = select('core/block-editor');
	const block = editor.getSelectedBlock();

	if (block && block.name === 'core/paragraph') {
		const content = block.attributes.content;
		const selection = window.getSelection();
		const range = selection.rangeCount ? selection.getRangeAt(0) : null;

		if (range) {
			const cursorPosition = range.startOffset;
			const textNode = range.startContainer;

			// Ensure the startContainer is a text node
			if (textNode.nodeType === Node.TEXT_NODE) {
				const textBefore = textNode.textContent.slice(0, cursorPosition);
				const textAfter = textNode.textContent.slice(cursorPosition);

				const newContent = `${textBefore}HELLO, WORLD!<span class="fa-solid fa-angle-up"> </span>${textAfter}`;

				// Update the text node content
				textNode.textContent = newContent;

				// Update the block attributes
				dispatch('core/block-editor').updateBlockAttributes(block.clientId, { content: textNode.textContent });

				// Reset the selection range to after the inserted text
				const newCursorPosition = cursorPosition + 'HELLO, WORLD!<span class="fa-solid fa-angle-up"> </span>'.length;
				range.setStart(textNode, newCursorPosition);
				range.collapse(true);
				selection.removeAllRanges();
				selection.addRange(range);
			}
		}
	}
};

/**
 * Add the custom button to the block toolbar
 *
 * @param {Object} BlockEdit
 */
const addCustomButton = (BlockEdit) => {
	return (props) => {
		if (props.name !== 'core/paragraph') {
			return <BlockEdit {...props} />;
		}

		return (
			<>
				<BlockEdit {...props} />
				<BlockControls>
					<ToolbarGroup>
						<ToolbarButton
							icon="editor-code"
							label={__('Insert Text', 'block-development-examples')}
							onClick={insertTextAtCursor}
						/>
					</ToolbarGroup>
				</BlockControls>
			</>
		);
	};
};

addFilter(
	'editor.BlockEdit',
	'my-custom-plugin/add-custom-button',
	addCustomButton
);
