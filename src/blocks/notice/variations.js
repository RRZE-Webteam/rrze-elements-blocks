/* eslint-disable */
/**
 * WordPress dependencies
 */
import { Path, SVG } from "@wordpress/components";
import { __ } from "@wordpress/i18n";
import { WPBlockVariation } from "@wordpress/blocks";

/**
@typedef {import('@wordpress/blocks').WPBlockVariation} WPBlockVariation */

/**
 * Template option choices for predefined columns layouts.
 *
 * @type {WPBlockVariation[]}
 */
const variations = [
  {
    name: "notice-attention",
    title: __("Warning", "rrze-elements-blocks"),
    description: __("Warning", "rrze-elements-blocks"),
    iconClass: "symbol warning",
    icon: (
      <SVG xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#04316a"><Path d="m40-120 440-760 440 760H40Zm138-80h604L480-720 178-200Zm302-40q17 0 28.5-11.5T520-280q0-17-11.5-28.5T480-320q-17 0-28.5 11.5T440-280q0 17 11.5 28.5T480-240Zm-40-120h80v-200h-80v200Zm40-100Z"/></SVG>
    ),
    innerBlocks: [["core/paragraph"]],
    scope: ["block"],
  },
  {
    name: "notice-hinweis",
    title: __("Hint", "rrze-elements-blocks"),
    description: __("Notice with hint-icon", "rrze-elements-blocks"),
    iconClass: "symbol notifications",
    icon: (
      <SVG xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#04316a"><Path d="M160-200v-80h80v-280q0-83 50-147.5T420-792v-28q0-25 17.5-42.5T480-880q25 0 42.5 17.5T540-820v28q80 20 130 84.5T720-560v280h80v80H160Zm320-300Zm0 420q-33 0-56.5-23.5T400-160h160q0 33-23.5 56.5T480-80ZM320-280h320v-280q0-66-47-113t-113-47q-66 0-113 47t-47 113v280Z"/></SVG>
    ),
    isDefault: true,
    innerBlocks: [["core/column"], ["core/column"]],
    scope: ["block"],
  },
  {
    name: "notice-baustelle",
    title: __("Maintenance", "rrze-elements-blocks"),
    description: __("Notice with wrench icon", "rrze-elements-blocks"),
    iconClass: "symbol construction",
    icon: (
      <SVG xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#04316a"><Path d="M756-120 537-339l84-84 219 219-84 84Zm-552 0-84-84 276-276-68-68-28 28-51-51v82l-28 28-121-121 28-28h82l-50-50 142-142q20-20 43-29t47-9q24 0 47 9t43 29l-92 92 50 50-28 28 68 68 90-90q-4-11-6.5-23t-2.5-24q0-59 40.5-99.5T701-841q15 0 28.5 3t27.5 9l-99 99 72 72 99-99q7 14 9.5 27.5T841-701q0 59-40.5 99.5T701-561q-12 0-24-2t-23-7L204-120Z"/></SVG>
    ),
    innerBlocks: [["core/paragraph"]],
    scope: ["block"],
  },
  {
    name: "notice-question",
    title: __("Question", "rrze-elements-blocks"),
    description: __("Questionmark", "rrze-elements-blocks"),
    iconClass: "symbol question_mark",
    icon: (
      <SVG xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#04316a"><Path d="M424-320q0-81 14.5-116.5T500-514q41-36 62.5-62.5T584-637q0-41-27.5-68T480-732q-51 0-77.5 31T365-638l-103-44q21-64 77-111t141-47q105 0 161.5 58.5T698-641q0 50-21.5 85.5T609-475q-49 47-59.5 71.5T539-320H424Zm56 240q-33 0-56.5-23.5T400-160q0-33 23.5-56.5T480-240q33 0 56.5 23.5T560-160q0 33-23.5 56.5T480-80Z"/></SVG>
    ),
    innerBlocks: [["core/paragraph"]],
    scope: ["block"],
  },
  {
    name: "notice-minus",
    title: __("Negative", "rrze-elements-blocks"),
    description: __("Minus icon", "rrze-elements-blocks"),
    iconClass: "symbol block",
    icon: (
      <SVG xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#04316a"><Path d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q54 0 104-17.5t92-50.5L228-676q-33 42-50.5 92T160-480q0 134 93 227t227 93Zm252-124q33-42 50.5-92T800-480q0-134-93-227t-227-93q-54 0-104 17.5T284-732l448 448Z"/></SVG>
    ),
    innerBlocks: [["core/paragraph"]],
    scope: ["block"],
  },
  {
    name: "notice-plus",
    title: __("Positive", "rrze-elements-blocks"),
    description: __("Plus-icon", "rrze-elements-blocks"),
    iconClass: "symbol add",
    icon: (
      <SVG xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#04316a"><Path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/></SVG>
    ),
    innerBlocks: [["core/paragraph"]],
    scope: ["block"],
  },
  {
    name: "notice-idea",
    title: __("Idea", "rrze-elements-blocks"),
    description: __("Lightbulb icon", "rrze-elements-blocks"),
    iconClass: "symbol emoji_objects",
    icon: (
      <SVG xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#04316a"><Path d="M480-80q-26 0-47-12.5T400-126q-33 0-56.5-23.5T320-206v-142q-59-39-94.5-103T190-590q0-121 84.5-205.5T480-880q121 0 205.5 84.5T770-590q0 77-35.5 140T640-348v142q0 33-23.5 56.5T560-126q-12 21-33 33.5T480-80Zm-80-126h160v-36H400v36Zm0-76h160v-38H400v38Zm-8-118h58v-108l-88-88 42-42 76 76 76-76 42 42-88 88v108h58q54-26 88-76.5T690-590q0-88-61-149t-149-61q-88 0-149 61t-61 149q0 63 34 113.5t88 76.5Zm88-162Zm0-38Z"/></SVG>
    ),
    innerBlocks: [["core/paragraph"]],
    scope: ["block"],
  },
  {
    name: "notice-download",
    title: __("Download", "rrze-elements-blocks"),
    description: __("Download-icon", "rrze-elements-blocks"),
    iconClass: "symbol download",
    icon: (
  <SVG xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#04316a"><Path d="M480-320 280-520l56-58 104 104v-326h80v326l104-104 56 58-200 200ZM240-160q-33 0-56.5-23.5T160-240v-120h80v120h480v-120h80v120q0 33-23.5 56.5T720-160H240Z"/></SVG>
    ),
    innerBlocks: [["core/paragraph"]],
    scope: ["block"],
  },
  {
    name: "notice-audio",
    title: __("Audio", "rrze-elements-blocks"),
    description: __("Loudspeaker icon", "rrze-elements-blocks"),
    iconClass: "symbol headphones",
    icon: (
      <SVG xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#04316a"><Path d="M360-120H200q-33 0-56.5-23.5T120-200v-280q0-75 28.5-140.5t77-114q48.5-48.5 114-77T480-840q75 0 140.5 28.5t114 77q48.5 48.5 77 114T840-480v280q0 33-23.5 56.5T760-120H600v-320h160v-40q0-117-81.5-198.5T480-760q-117 0-198.5 81.5T200-480v40h160v320Zm-80-240h-80v160h80v-160Zm400 0v160h80v-160h-80Zm-400 0h-80 80Zm400 0h80-80Z"/></SVG>
    ),
    innerBlocks: [["core/paragraph"]],
    scope: ["block"],
  },
  {
    name: "notice-video",
    title: __("Video", "rrze-elements-blocks"),
    description: __("Video-icon", "rrze-elements-blocks"),
    iconClass: "symbol video_library",
    icon: (
      <SVG xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#04316a"><Path d="m460-380 280-180-280-180v360ZM320-240q-33 0-56.5-23.5T240-320v-480q0-33 23.5-56.5T320-880h480q33 0 56.5 23.5T880-800v480q0 33-23.5 56.5T800-240H320Zm0-80h480v-480H320v480ZM160-80q-33 0-56.5-23.5T80-160v-560h80v560h560v80H160Zm160-720v480-480Z"/></SVG>
    ),
    innerBlocks: [["core/paragraph"]],
    scope: ["block"],
  },
  {
    name: "notice-thumbs-up",
    title: __("Thumbs up", "rrze-elements-blocks"),
    description: __("Thumps up icon", "rrze-elements-blocks"),
    iconClass: "symbol thumb_up",
    icon: (
      <SVG xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#04316a"><Path d="M720-120H280v-520l280-280 50 50q7 7 11.5 19t4.5 23v14l-44 174h258q32 0 56 24t24 56v80q0 7-2 15t-4 15L794-168q-9 20-30 34t-44 14Zm-360-80h360l120-280v-80H480l54-220-174 174v406Zm0-406v406-406Zm-80-34v80H160v360h120v80H80v-520h200Z"/></SVG>
    ),
    innerBlocks: [["core/paragraph"]],
    scope: ["block"],
  },
  {
    name: "notice-thumbs-down",
    title: __("Thumbs down", "rrze-elements-blocks"),
    description: __("Thumbs down icon", "rrze-elements-blocks"),
    iconClass: "symbol thumb_down",
    icon: (
      <SVG xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#04316a"><Path d="M240-840h440v520L400-40l-50-50q-7-7-11.5-19t-4.5-23v-14l44-174H120q-32 0-56-24t-24-56v-80q0-7 2-15t4-15l120-282q9-20 30-34t44-14Zm360 80H240L120-480v80h360l-54 220 174-174v-406Zm0 406v-406 406Zm80 34v-80h120v-360H680v-80h200v520H680Z"/></SVG>
    ),
    innerBlocks: [["core/paragraph"]],
    scope: ["block"],
  },
];

export default variations;
