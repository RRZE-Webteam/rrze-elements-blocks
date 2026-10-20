const fs = require("node:fs");
const path = require("node:path");
const { createRequire } = require("node:module");
const test = require("node:test");
const assert = require("node:assert/strict");
const ts = require("typescript");
const React = require("react");
const { JSDOM } = require("jsdom");

const dom = new JSDOM("<!doctype html><html><body></body></html>", { url: "https://example.com" });
Object.assign(global, { window: dom.window, document: dom.window.document, MutationObserver: dom.window.MutationObserver });
const blocks = require("@wordpress/blocks");

/**
 * Registers the actual save function, supplementing metadata normally supplied by PHP.
 *
 * @param {string} directory Block directory name.
 * @returns {string} Registered block name.
 */
function registerActualBlock(directory) {
  const filename = path.resolve(__dirname, `../../src/blocks/${directory}/index.tsx`);
  const metadata = require(path.join(path.dirname(filename), "block.json"));
  const { outputText } = ts.transpileModule(fs.readFileSync(filename, "utf8"), {
    fileName: filename,
    compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX, target: ts.ScriptTarget.ES2020, esModuleInterop: true },
  });
  const realRequire = createRequire(filename);
  const localRequire = (name) => {
    if (name === "./edit" || name.endsWith(".scss")) return () => null;
    if (name === "@wordpress/blocks") return {
      registerBlockType: (blockName, settings) => blocks.registerBlockType(blockName, {
        ...metadata, ...settings,
        // Core's block-support hooks normally add this attribute in the editor.
        attributes: { ...metadata.attributes, className: { type: "string" } },
      }),
    };
    if (name === "@wordpress/block-editor") return {
      InnerBlocks: { Content: () => blocks.__unstableGetInnerBlocksProps().children },
    };
    return realRequire(name);
  };
  const module = { exports: {} };
  new Function("require", "module", "exports", outputText)(localRequire, module, module.exports);
  return metadata.name;
}

test("saved carousel and info cards keep their names, attributes, order and inner content", (t) => {
  blocks.registerBlockType("core/paragraph", {
    apiVersion: 3, title: "Paragraph", category: "text",
    attributes: { content: { type: "string", source: "html", selector: "p" } },
    save: ({ attributes }) => React.createElement("p", { dangerouslySetInnerHTML: { __html: attributes.content } }),
  });
  t.after(() => {
    for (const name of ["rrze-elements/carousel", "rrze-elements/info-card", "core/paragraph"]) blocks.unregisterBlockType(name);
  });
  registerActualBlock("carousel");
  registerActualBlock("info-card");
  // A saved document, independent of today's save implementation.
  const saved = `<!-- wp:rrze-elements/carousel {"title":"Projects","cardHeight":420,"headingLevel":3,"className":"is-style-marketing"} -->
<!-- wp:rrze-elements/info-card {"title":"Research","desktopImageUrl":"https://example.com/research.jpg","alt":"Our lab","desktopFocusPoint":{"x":0.25,"y":0.75},"scientificText":"H<sub>2</sub>O"} -->
<!-- wp:paragraph -->
<p>Details with <strong>formatting</strong> and a <a href="https://example.com/details">link</a>.</p>
<!-- /wp:paragraph -->
<!-- /wp:rrze-elements/info-card -->
<!-- wp:rrze-elements/info-card {"title":"Teaching","url":"https://example.com/teaching"} /-->
<!-- /wp:rrze-elements/carousel -->`;
  const [original] = blocks.parse(saved);
  const [reopened] = blocks.parse(blocks.serialize(original));
  for (const carousel of [original, reopened]) {
    assert.equal(carousel.isValid, true);
    assert.equal(carousel.name, "rrze-elements/carousel");
    assert.equal(carousel.attributes.title, "Projects");
    assert.equal(carousel.attributes.cardHeight, 420);
    assert.equal(carousel.attributes.headingLevel, 3);
    assert.equal(carousel.attributes.className, "is-style-marketing");
    assert.equal(carousel.innerBlocks.length, 2);
    const [research, teaching] = carousel.innerBlocks;
    for (const card of carousel.innerBlocks) {
      assert.equal(card.isValid, true);
      assert.equal(card.name, "rrze-elements/info-card");
    }
    assert.equal(research.attributes.title, "Research");
    assert.equal(research.attributes.desktopImageUrl, "https://example.com/research.jpg");
    assert.equal(research.attributes.alt, "Our lab");
    assert.deepEqual(research.attributes.desktopFocusPoint, { x: 0.25, y: 0.75 });
    assert.equal(research.attributes.scientificText, "H<sub>2</sub>O");
    assert.equal(research.innerBlocks.length, 1);
    assert.equal(research.innerBlocks[0].isValid, true);
    assert.equal(research.innerBlocks[0].attributes.content, 'Details with <strong>formatting</strong> and a <a href="https://example.com/details">link</a>.');
    assert.equal(teaching.attributes.title, "Teaching");
    assert.equal(teaching.attributes.url, "https://example.com/teaching");
    assert.equal(teaching.innerBlocks.length, 0);
  }
});

test("independent info cards retain their own height, style and link after saving", (t) => {
  registerActualBlock("info-card");
  t.after(() => blocks.unregisterBlockType("rrze-elements/info-card"));
  const [original] = blocks.parse('<!-- wp:rrze-elements/info-card {"title":"Independent","cardHeight":480,"className":"is-style-scientific","url":"https://example.com/details"} /-->');
  const [reopened] = blocks.parse(blocks.serialize(original));
  assert.equal(reopened.isValid, true);
  assert.equal(reopened.name, "rrze-elements/info-card");
  assert.equal(reopened.attributes.cardHeight, 480);
  assert.equal(reopened.attributes.className, "is-style-scientific");
  assert.equal(reopened.attributes.url, "https://example.com/details");
  assert.deepEqual(reopened.innerBlocks, []);
});

test("content sliders save only original info cards and retain independent card settings", (t) => {
  registerActualBlock("content-slider");
  registerActualBlock("info-card");
  t.after(() => {
    blocks.unregisterBlockType("rrze-elements/content-slider");
    blocks.unregisterBlockType("rrze-elements/info-card");
  });
  const saved = `<!-- wp:rrze-elements/content-slider {"title":"Topics","cardHeight":560,"headingLevel":3} -->
<!-- wp:rrze-elements/info-card {"title":"First","cardHeight":380,"desktopContentWidth":420,"url":"/first"} /-->
<!-- wp:rrze-elements/info-card {"title":"Second","className":"is-style-scientific"} /-->
<!-- /wp:rrze-elements/content-slider -->`;
  const [slider] = blocks.parse(blocks.serialize(blocks.parse(saved)));
  assert.equal(slider.isValid, true);
  assert.equal(slider.attributes.cardHeight, 560);
  assert.equal(slider.attributes.headingLevel, 3);
  assert.deepEqual(slider.innerBlocks.map((card) => card.attributes.title), ["First", "Second"]);
  assert.equal(slider.innerBlocks[0].attributes.cardHeight, 380);
  assert.equal(slider.innerBlocks[0].attributes.desktopContentWidth, 420);
  assert.equal(slider.innerBlocks[1].attributes.className, "is-style-scientific");
  assert.equal(slider.attributes.cardListLayout, false);
});

test("content slider styles survive saving without replacing card text or individual styles", (t) => {
  registerActualBlock("content-slider");
  registerActualBlock("info-card");
  t.after(() => {
    blocks.unregisterBlockType("rrze-elements/content-slider");
    blocks.unregisterBlockType("rrze-elements/info-card");
  });
  const type = blocks.getBlockType("rrze-elements/content-slider");
  assert.deepEqual(type.styles.map((style) => style.name), ["marketing", "scientific"]);
  for (const style of type.styles) {
    const original = blocks.createBlock("rrze-elements/content-slider", {
      className: `is-style-${style.name}`,
    }, [blocks.createBlock("rrze-elements/info-card", {
      title: "Preserved heading",
      subtitle: "Preserved topic",
      scientificText: "H<sub>2</sub>O: <strong>measurement</strong>",
      className: "is-style-marketing",
      imageObjectFit: "contain",
    })]);
    const [reopened] = blocks.parse(blocks.serialize(original));
    assert.equal(reopened.isValid, true);
    assert.equal(reopened.attributes.className, `is-style-${style.name}`);
    assert.deepEqual(reopened.innerBlocks[0].attributes, original.innerBlocks[0].attributes);
  }
});

test.after(() => {
  dom.window.close();
  delete global.window;
  delete global.document;
  delete global.MutationObserver;
});
