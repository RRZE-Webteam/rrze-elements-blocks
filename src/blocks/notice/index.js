import { registerBlockType } from '@wordpress/blocks';

import Edit from './edit';
import save from './save';
import metadata from './block.json';
import './editor.scss';
import variations from './variations';

registerBlockType( metadata.name, {
	icon: {
		src: <svg id="Ebene_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><rect x="141.15" y="231.31" width="300.46" height="49.39" rx="5.73" ry="5.73" fillRule="evenodd" strokeWidth="0"/><rect x="70.38" y="231.31" width="50.4" height="49.39" rx="24.69" ry="24.69" fillRule="evenodd" strokeWidth="0"/></svg>
	},
	variations,
	// @see ./edit.js
	edit: Edit,
	// @see ./save.js
	save,
} );
