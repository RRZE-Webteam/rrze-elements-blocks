import { registerBlockType } from '@wordpress/blocks';
import Edit from './edit';
import save from './save';
import metadata from './block.json';
import './editor.scss';

registerBlockType( metadata.name, {
	icon: {
		src: <svg id="Ebene_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><rect x="75.86" y="175.02" width="360.28" height="160.43" rx="5.73" ry="5.73" fill="#evenodd" strokeWidth="0"/><rect x="90.94" y="189.82" width="162.03" height="29.53" rx="5.73" ry="5.73" fill="#fff" strokeWidth="0"/><rect x="90.94" y="229.35" width="162.03" height="12.53" rx="5.73" ry="5.73" fill="#fff" strokeWidth="0"/><rect x="264.87" y="295.98" width="162.03" height="27.41" rx="5.73" ry="5.73" fill="#fff" strokeWidth="0"/></svg>
	},
	// @see ./edit.js
	edit: Edit,

	// @see ./save.js
	save,
} );
