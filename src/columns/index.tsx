/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/#registering-a-block
 */
import { registerBlockType } from '@wordpress/blocks';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * All files containing `style` keyword are bundled together. The code used
 * gets applied both to the front of your site and to the editor. All other files
 * get applied to the editor only.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */

/**
 * Internal dependencies
 */
import Edit from './edit';
import save from './save';
import metadata from './block.json';
import './editor.scss';
import { __, sprintf } from '@wordpress/i18n';

/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/#registering-a-block
 */
registerBlockType( metadata.name as any, {
	/**
	 * Used to construct a preview for the block to be shown in the block inserter.
	 */
	icon: {
		src: <svg id="Ebene_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><rect x="60.05" y="115.69" width="112.94" height="280.62" rx="5.73" ry="5.73" fill="evenodd" strokeWidth="0"/><rect x="199.53" y="115.69" width="112.94" height="280.62" rx="5.73" ry="5.73" fill="evenodd" strokeWidth="0"/><rect x="339.01" y="115.69" width="112.94" height="280.62" rx="5.73" ry="5.73" fill="evenodd" strokeWidth="0"/></svg>
	},
	__experimentalLabel: (attributes: any, { context }: any) => {
		const { title } = attributes;

		// In the list view, use the block's title as the label.
		// If the title is empty, fall back to the default label.
		if (context === 'list-view' && title) {
			return title;
		}
	},
	/**
	 * @see ./edit.js
	 */
	edit: Edit,

	/**
	 * @see ./save.js
	 */
	save,
} as any );
