import { registerBlockType } from '@wordpress/blocks';
import './editor.scss';
import { __, sprintf } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import Edit from './edit';
import save from './save';
import metadata from './block.json';

/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/#registering-a-block
 */
registerBlockType( metadata.name, {
	edit: Edit,
	save,
	icon: {
		src: "align-center",
		background: "#00458c"
	},
	__experimentalLabel: (attributes, { context }) => {
		const { title, hstart } = attributes;

		// In the list view, use the block's title as the label.
		// If the title is empty, fall back to the default label.
		if (context === 'list-view' && title) {
			return title;
		}

		if (context === 'accessibility') {
			return !title || title.length === 0
				? sprintf(
					/* translators: accessibility text. %s: heading level. */
					__('Level %s. Empty.'),
					hstart
				)
				: sprintf(
					/* translators: accessibility text. 1: heading level. 2: heading title. */
					__('Level %1$s. %2$s'),
					hstart,
					title
				);
		}
	}
} );
