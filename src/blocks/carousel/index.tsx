import { registerBlockType } from '@wordpress/blocks';

import Edit from './edit';
import metadata from './block.json';
import './editor.scss';
import { InnerBlocks } from '@wordpress/block-editor';

registerBlockType( metadata.name as any, {
	icon: {
		src: <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="evenodd"><path d="M80-360v-240q0-33 23.5-56.5T160-680q33 0 56.5 23.5T240-600v240q0 33-23.5 56.5T160-280q-33 0-56.5-23.5T80-360Zm280 160q-33 0-56.5-23.5T280-280v-400q0-33 23.5-56.5T360-760h240q33 0 56.5 23.5T680-680v400q0 33-23.5 56.5T600-200H360Zm360-160v-240q0-33 23.5-56.5T800-680q33 0 56.5 23.5T880-600v240q0 33-23.5 56.5T800-280q-33 0-56.5-23.5T720-360Zm-360 80h240v-400H360v400Zm120-200Z"/></svg>
	},
	__experimentalLabel: (attributes: any, { context }: any) => {
		const { title } = attributes;

		if (context === 'list-view' && title) {
			return title;
		}
	},
	// @see ./edit.js
	edit: Edit,

	// @see ./save.js
	save: () => <InnerBlocks.Content />,
} as any );
