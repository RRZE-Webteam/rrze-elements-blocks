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
registerBlockType( metadata.name, {
	/**
	 * Used to construct a preview for the block to be shown in the block inserter.
	 */
	icon: {
		src: <svg id="Ebene_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><rect x="77.51" y="114.93" width="153.67" height="280.62" rx="5.73" ry="5.73" fill="evenodd" strokeWidth="0"/><g opacity=".25"><rect x="175.76" y="114.93" width="271.12" height="280.62" rx="5.73" ry="5.73" fill="evenodd" strokeWidth="0"/></g><path d="m475.16,248.35v20.36c0,4.29-3.46,7.76-7.76,7.76h-173.77l40.78,40.78c3.03,3.03,3.03,7.94,0,10.96l-2.1,2.1c-3.02,3.03-7.93,3.03-10.96,0l-64.76-64.76c-2.98-2.99-3.02-7.81-.11-10.84.38-.88.92-1.71,1.64-2.42l64.76-64.76c3.03-3.02,7.93-3.02,10.96,0l2.1,2.1c3.03,3.03,3.03,7.93,0,10.96l-40.02,40.02h171.49c4.29,0,7.76,3.46,7.76,7.76Z" fill="evenodd" strokeWidth="0"/></svg>
	},
	__experimentalLabel: (attributes, { context }) => {
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
} );
