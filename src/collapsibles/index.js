/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/#registering-a-block
 */
import { registerBlockType } from '@wordpress/blocks';
import { createBlock } from '@wordpress/blocks';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * All files containing `style` keyword are bundled together. The code used
 * gets applied both to the front of your site and to the editor. All other files
 * get applied to the editor only.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './style.scss';
import './editor.scss';

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
	/**
	 * Used to construct a preview for the block to be shown in the block inserter.
	 */
	transforms: {
		from: [
			{
				type: 'shortcode',
				tag: 'collapsibles',
				attributes: {
					hstart: {
						type: 'integer',
						shortcode: attributes => {
							return attributes.named.hstart || 2;
						}
					}
				},
				transform: (attributes, data) => {
					const blocks = [];
					const innerBlocks = [];
					
					const cleanData = data.shortcode?.content.replace(/<\/?p>/g, '');
					const regexCollapse = /\[collapse(?=\s)((?:\s+\w+=(?:'[^']*'|"[^"]*"|“[^”]*”))*)\]([\s\S]*?)\[\/collapse\]/g;
					const matchesCollapseContent = [...cleanData.matchAll(regexCollapse)];
				
					const collapseContent = matchesCollapseContent.map(match => {
						const attributesString = match[1];
						const content = match[2].trim();
				
						// Extract attributes
						const attributeMatches = attributesString.match(/(\w+)=('[^']*'|"[^"]*"|“[^”]*”)/g);
						let collapseAttributes = {};
				
						attributeMatches?.forEach(attr => {
							const [key, fullValue] = attr.split('=');
							const actualValue = fullValue.slice(1, -1); // This trims the surrounding quotes
							collapseAttributes[key] = actualValue;
						});
						
				
						return {
							...collapseAttributes,
							content
						};
					});
					console.log('collapseContent', collapseContent);
				
					if (data.shortcode?.content !== undefined) {
						// For simplicity, we're just using the cleaned up content. 
						// You might want to create separate blocks or use the captured attributes as needed.
						collapseContent.forEach(item => {
							console.log(item.content);
							innerBlocks.push(
								createBlock('rrze-elements/collapse', 
									{ title: item.title || 'Enter a title', color: item.color || '', jumpName: item.name || '' }, 
									[createBlock('core/freeform', { content: item.content })]
								)
							);
						});
				
						console.log(data.shortcode.content);
						console.log(cleanData);
					}
					const hstart = parseInt(attributes.named.hstart, 10) || 2;
					console.log(attributes);
					blocks.push(createBlock('rrze-elements/collapsibles', {hstart: hstart}, innerBlocks));
				
					return blocks;
				}
				
				
				
			},
			
		]
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