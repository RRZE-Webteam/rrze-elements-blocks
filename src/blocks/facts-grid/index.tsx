import { registerBlockType } from '@wordpress/blocks';

import Edit from './edit';
import metadata from './block.json';
import './editor.scss';
import { InnerBlocks } from '@wordpress/block-editor';

registerBlockType( metadata.name as any, {
	icon: {
		src: <svg id="a" xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512"><rect x="68.16" y="74.26" width="171.82" height="188.56" rx="5.73" ry="5.73" transform="translate(322.61 14.48) rotate(90)" fill="evenodd"/><rect x="68.16" y="261.61" width="171.82" height="188.56" rx="5.73" ry="5.73" transform="translate(509.96 201.83) rotate(90)" fill="evenodd"/><rect x="274.84" y="74.26" width="171.82" height="188.56" rx="5.73" ry="5.73" transform="translate(529.29 -192.2) rotate(90)" fill="evenodd"/><rect x="274.84" y="263.87" width="171.82" height="188.56" rx="5.73" ry="5.73" transform="translate(718.9 -2.59) rotate(90)" fill="evenodd"/></svg>
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
