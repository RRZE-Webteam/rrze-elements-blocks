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
					const globalInnerBlocks = [];
					
					const cleanData = data.shortcode?.content.replace(/<\/?p>/g, '');
					const regexCollapse = /\[collapse(?=\s)((?:\s+\w+=(?:'[^']*'|"[^"]*"|“[^”]*”))*)\]([\s\S]*?)\[\/collapse\]/g;
					const matchesCollapseContent = [...cleanData.matchAll(regexCollapse)];
					let collapseAttributes = {};
					matchesCollapseContent.forEach(match => {
						const collapseAttributesString = match[1];
						const contentInsideCollapse = match[2].trim();
						
						let collapseInnerBlocks = [];
						
						const accordionRegex = /\[accordions\]([\s\S]*?)\[\/accordions\]/g;
						const splitContents = contentInsideCollapse.split(accordionRegex);
						splitContents.forEach((splitContent, index) => {
							if (index % 2 === 0) {
								// This should be freeform content outside of the accordions
								if (splitContent.trim()) {
									collapseInnerBlocks.push(createBlock('core/freeform', { content: splitContent.trim() }));
								}
							} else {
								// This should be content inside an accordion
								const accordionItemsRegex = /\[accordion-item(?=\s)((?:\s+\w+=(?:'[^']*'|"[^"]*"|“[^”]*”))*)\]([\s\S]*?)\[\/accordion-item\]/g;
								const accordionItemMatches = [...splitContent.matchAll(accordionItemsRegex)];
								
								let innerAccordionBlocks = [];
								
								accordionItemMatches.forEach(accordionItem => {
									const accordionAttributesString = accordionItem[1];
									const accordionContent = accordionItem[2].trim();
									
									const accordionAttributeMatches = accordionAttributesString.match(/(\w+)=('[^']*'|"[^"]*"|“[^”]*”)/g);
									let accordionAttributes = {};
									
									accordionAttributeMatches?.forEach(attr => {
										const [key, fullValue] = attr.split('=');
										const actualValue = fullValue.slice(1, -1);
										accordionAttributes[key] = actualValue;
									});
									
									innerAccordionBlocks.push(
										createBlock('rrze-elements/accordion',
											{ title: accordionAttributes.title || 'Enter a title' },
											[createBlock('core/freeform', { content: accordionContent })]
										)
									);
								});
								
								if (innerAccordionBlocks.length) {
									collapseInnerBlocks.push(createBlock('rrze-elements/accordions', {}, innerAccordionBlocks));
								}
							}
						});
						
						globalInnerBlocks.push(
							createBlock('rrze-elements/collapse',
								{ title: collapseAttributes.title || 'Enter a title', color: collapseAttributes.color || '', jumpName: collapseAttributes.name || '' },
								collapseInnerBlocks
							)
						);
					});
					
					const hstart = parseInt(attributes.named.hstart, 10) || 2;
					blocks.push(createBlock('rrze-elements/collapsibles', { hstart: hstart }, globalInnerBlocks));
					
					return blocks;
				}
			}
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