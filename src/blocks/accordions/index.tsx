import { registerBlockType } from '@wordpress/blocks';
import './editor.scss';

import Edit from './edit';
import metadata from './block.json';
import deprecated from "./deprecated";
import {InnerBlocks} from "@wordpress/block-editor";

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
	edit: Edit,
  save: () => <InnerBlocks.Content />,
	deprecated
} );
