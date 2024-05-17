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
import variations from './variations';

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
		src: <svg id="Ebene_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><rect x="141.15" y="231.31" width="300.46" height="49.39" rx="5.73" ry="5.73" fillRule="evenodd" strokeWidth="0"/><rect x="70.38" y="231.31" width="50.4" height="49.39" rx="24.69" ry="24.69" fillRule="evenodd" strokeWidth="0"/></svg>
	},
	variations,
	/**
	 * @see ./edit.js
	 */
	edit: Edit,

	/**
	 * @see ./save.js
	 */
	save,
} );
