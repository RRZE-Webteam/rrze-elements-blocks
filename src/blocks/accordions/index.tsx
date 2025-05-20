import { registerBlockType } from '@wordpress/blocks';
import Edit from './edit';
import save from './save';
import metadata from './block.json';
import deprecated from "./deprecated";

registerBlockType( metadata.name as any, {
	// Used to construct a preview for the block to be shown in the block inserter.
	example: {
		attributes: {
			message: 'Accordion',
		},
	},
	icon: {
		src: "align-center",
		background: "#00458c"
	},
	// @see ./edit.js
	edit: Edit,

	// @see ./save.js
	save,
	deprecated
} );
