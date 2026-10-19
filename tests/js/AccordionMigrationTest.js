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
 * Loads historical TS/TSX definitions with WordPress's real inner-block serializer.
 *
 * @param {string} relativePath Source file relative to src/.
 * @param {string} blockName Name used for the historical wrapper class.
 * @returns {object} Module exports.
 */
function loadHistorical(relativePath, blockName) {
  const filename = path.resolve(__dirname, "../../src", relativePath);
  const source = fs.readFileSync(filename, "utf8");
  const { outputText } = ts.transpileModule(source, {
    fileName: filename,
    compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX, target: ts.ScriptTarget.ES2020 },
  });
  const realRequire = createRequire(filename);
  const localRequire = (name) => {
    if (name === "@wordpress/block-editor") {
      return {
        useBlockProps: { save: () => ({ className: blocks.getBlockDefaultClassName(blockName) }) },
        InnerBlocks: { Content: () => blocks.__unstableGetInnerBlocksProps().children },
      };
    }
    if (name.endsWith("/HeadingComponent")) {
      return { default: ({ level, children, ...props }) => React.createElement(`h${level}`, props, children) };
    }
    return realRequire(name);
  };
  const module = { exports: {} };
  new Function("require", "module", "exports", outputText)(localRequire, module, module.exports);
  return module.exports;
}

test("legacy accordion markup migrates before FAQ is enabled and survives another parse", (t) => {
  // Core logs successful migrations verbosely; keep warnings and errors visible.
  for (const method of ["groupCollapsed", "groupEnd", "info", "log"]) {
    t.mock.method(console, method, () => {});
  }
  const names = ["collapse", "collapsibles"];
  const definitions = names.map((name) => {
    const metadata = require(`../../src/blocks/${name}/block.json`);
    const prefix = `blocks/${name}/v1.0.19`;
    return {
      metadata,
      legacy: {
        attributes: loadHistorical(`${prefix}/attributes.ts`, metadata.name).attributes,
        save: loadHistorical(`${prefix}/save.tsx`, metadata.name).default,
        migrate: loadHistorical(`${prefix}/migrate.ts`, metadata.name).default,
      },
    };
  });
  blocks.registerBlockType("core/paragraph", {
    apiVersion: 3, title: "Paragraph", category: "text", attributes: { content: { type: "string", source: "html", selector: "p" } },
    save: ({ attributes }) => React.createElement("p", { dangerouslySetInnerHTML: { __html: attributes.content } }),
  });
  for (const { metadata, legacy } of definitions) {
    blocks.registerBlockType(metadata.name, { ...metadata, ...legacy });
  }
  const original = blocks.createBlock("rrze-elements/collapsibles", { hstart: 3 }, [
    blocks.createBlock("rrze-elements/collapse", { title: "A question?", jumpName: "question", hstart: 3 }, [
      blocks.createBlock("core/paragraph", { content: 'An <a href="https://example.com">answer</a>.' }),
    ]),
  ]);
  const legacyMarkup = blocks.serialize(original);
  assert.match(legacyMarkup, /class="accordion-group/);
  for (const { metadata, legacy } of definitions) {
    blocks.unregisterBlockType(metadata.name);
    blocks.registerBlockType(metadata.name, {
      ...metadata,
      save: () => blocks.__unstableGetInnerBlocksProps().children,
      deprecated: [legacy],
    });
  }

  const [migrated] = blocks.parse(legacyMarkup);
  assert.equal(migrated.isValid, true);
  assert.equal(migrated.innerBlocks[0].isValid, true);
  assert.equal(migrated.attributes.faqSchema ?? false, false);
  migrated.attributes.faqSchema = true;
  const saved = blocks.serialize(migrated);
  assert.match(saved, /"faqSchema":true/);
  assert.doesNotMatch(saved, /class="accordion/);
  const [reopened] = blocks.parse(saved);
  assert.equal(reopened.isValid, true);
  assert.equal(reopened.attributes.faqSchema, true);
  assert.equal(reopened.innerBlocks[0].attributes.title, "A question?");
  assert.equal(reopened.innerBlocks[0].innerBlocks[0].attributes.content, 'An <a href="https://example.com">answer</a>.');

  for (const { metadata } of definitions) blocks.unregisterBlockType(metadata.name);
  blocks.unregisterBlockType("core/paragraph");
});

test.after(() => dom.window.close());
