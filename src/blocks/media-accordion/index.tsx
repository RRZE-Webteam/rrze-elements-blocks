import { registerBlockType } from '@wordpress/blocks';
import Edit from './edit';
import metadata from './block.json';
import {InnerBlocks} from "@wordpress/block-editor";
import "./editor.scss";
import "./style.scss";

registerBlockType( metadata.name as any, {
  icon: {
    src: "align-center",
    background: "#00458c"
  },
  edit: Edit,
  save: () => <InnerBlocks.Content />
} );
