const fs = require("node:fs");
const path = require("node:path");
const { createRequire } = require("node:module");
const { pathToFileURL } = require("node:url");
const test = require("node:test");
const assert = require("node:assert/strict");
const ts = require("typescript");
const React = require("react");
const { JSDOM } = require("jsdom");

const dom = new JSDOM("<!doctype html><html><body></body></html>");
global.window = dom.window;
global.document = dom.window.document;
global.IS_REACT_ACT_ENVIRONMENT = true;
const { createRoot } = require("react-dom/client");

test.after(() => {
  dom.window.close();
  delete global.window;
  delete global.document;
  delete global.IS_REACT_ACT_ENVIRONMENT;
});

/** Loads actual TSX/SVG components with React while substituting WordPress host services. */
function loadComponent(relativePath, mocks) {
  const filename = path.resolve(__dirname, "../../src", relativePath);
  let source = fs.readFileSync(filename, "utf8").replaceAll(
    "import.meta.url",
    JSON.stringify(pathToFileURL(filename).href),
  );
  if (filename.endsWith(".svg")) {
    source = require("@svgr/core").transform.sync(source, { plugins: ["@svgr/plugin-jsx"] });
  }
  const { outputText } = ts.transpileModule(source, {
    fileName: filename.endsWith(".svg") ? `${filename}.tsx` : filename,
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      jsx: ts.JsxEmit.ReactJSX,
      target: ts.ScriptTarget.ES2020,
      esModuleInterop: true,
    },
  });
  const realRequire = createRequire(filename);
  const module = { exports: {} };
  // Styles are bundled by webpack; they do not execute in these DOM tests.
  /** Resolves local TSX/SVG dependencies just as the webpack loaders do. */
  const localRequire = (name) => {
    if (Object.hasOwn(mocks, name)) return mocks[name];
    if (name.endsWith(".scss")) return {};
    const localPath = path.resolve(path.dirname(filename), name);
    const component = name.endsWith(".svg") ? localPath : `${localPath}.tsx`;
    if (name.startsWith(".") && fs.existsSync(component)) {
      return loadComponent(path.relative(path.resolve(__dirname, "../../src"), component), mocks);
    }
    return realRequire(name);
  };
  new Function("require", "module", "exports", outputText)(
    localRequire, module, module.exports,
  );
  return module.exports;
}

function mount(t) {
  const container = document.createElement("div");
  document.body.append(container);
  const root = createRoot(container);
  t.after(() => {
    React.act(() => root.unmount());
    container.remove();
  });
  return {
    container,
    render: (element) => React.act(() => root.render(element)),
  };
}

for (const name of ["StandardColorSwitcher", "StandardColorSwitcherToolbar"]) {
  test(`${name} can toggle theme colors and receive palette updates`, (t) => {
    let palette = [{ color: "#123456", slug: "theme", name: "Theme color" }];
    const listeners = new Set();
    const subscribe = (listener) => {
      listeners.add(listener);
      return () => listeners.delete(listener);
    };
    const getSnapshot = () => palette;
    const wrap = ({ children }) => React.createElement("div", null, children);
    const components = loadComponent("components/CustomColorSwitcher.tsx", {
      "@wordpress/i18n": { __: (text) => text },
      "@wordpress/icons": { color: null },
      "@wordpress/block-editor": {
        useSettings: () => [React.useSyncExternalStore(subscribe, getSnapshot)],
      },
      "@wordpress/components": {
        PanelBody: wrap,
        ToolbarGroup: wrap,
        ToolbarItem: ({ children }) => children(),
        ColorPalette: ({ colors, onChange }) => React.createElement("div", null,
          colors.map((color) => React.createElement("button", {
            key: color.slug,
            onClick: () => onChange(color.color),
          }, color.name)),
        ),
        ToolbarDropdownMenu: ({ controls }) => React.createElement("div", null,
          controls.map((control) => React.createElement("button", {
            key: control.key,
            onClick: control.onClick,
          }, control.title)),
        ),
      },
    });
    const { container, render } = mount(t);
    const changes = [];
    const show = (overwriteThemeColors) => render(React.createElement(components[name], {
      attributes: { color: "theme" },
      setAttributes: (attributes) => changes.push(attributes),
      overwriteThemeColors,
    }));

    show(true);
    assert.match(container.textContent, /Central institution/);
    assert.equal(listeners.size, 1, "keep the theme hook subscribed when overriding colors");

    show(false);
    assert.equal(container.textContent, "Theme color");
    React.act(() => container.querySelector("button").click());
    assert.equal(changes.at(-1).color, "theme");

    React.act(() => {
      palette = [{ color: "#654321", slug: "updated", name: "Updated color" }];
      listeners.forEach((listener) => listener());
    });
    assert.equal(container.textContent, "Updated color");

    show(true);
    assert.match(container.textContent, /Central institution/);
    assert.equal(listeners.size, 1);
    show(false);
    assert.equal(container.textContent, "Updated color");
  });
}

for (const type of ["symbol", "solid"]) {
  test(`${type} icon actions use named native buttons; decorative icons do not`, (t) => {
    const { IconMarkComponent } = loadComponent("components/IconPicker.tsx", {
      "@wordpress/i18n": { __: (text) => text },
      "@wordpress/components": {},
      "@wordpress/element": React,
      "@wordpress/a11y": { speak: () => {} },
    });
    const { container, render } = mount(t);
    let clicks = 0;
    let submits = 0;
    const show = (onClick) => render(React.createElement("form", {
      onSubmit: (event) => { event.preventDefault(); submits++; },
    }, React.createElement(IconMarkComponent, { type, iconName: "star", onClick })));

    show(() => clicks++);
    const button = container.querySelector("button");
    assert.ok(button);
    assert.equal(button.type, "button");
    assert.equal(button.tabIndex, 0);
    assert.equal(button.getAttribute("aria-label"), "Select an icon");
    assert.equal(button.closest('[aria-hidden="true"]'), null);
    button.focus();
    assert.equal(document.activeElement, button);
    React.act(() => button.click());
    assert.equal(clicks, 1);
    assert.equal(submits, 0);

    show(undefined);
    assert.equal(container.querySelector("button"), null);
    assert.ok(container.querySelector('[aria-hidden="true"]'));
  });
}

test("EU labels render as actual SVGs in block previews and retain native selection buttons", (t) => {
  const { IconMarkComponent } = loadComponent("components/IconPicker.tsx", {
    "@wordpress/i18n": { __: (text) => text },
    "@wordpress/components": {},
    "@wordpress/element": React,
    "@wordpress/a11y": { speak: () => {} },
  });
  const { container, render } = mount(t);
  for (const materialSymbol of ["eu-ai", "eu-ai-generated", "eu-ai-modified"]) {
    let clicks = 0;
    render(React.createElement(IconMarkComponent, {
      type: "symbol", iconName: materialSymbol, materialSymbol, onClick: () => clicks++,
    }));
    const button = container.querySelector("button");
    assert.equal(button.type, "button");
    assert.equal(button.getAttribute("aria-label"), "Select an icon");
    const svg = button.querySelector("svg");
    assert.ok(svg.querySelector("path"));
    assert.equal(svg.getAttribute("aria-hidden"), "true");
    assert.equal(svg.style.width, "auto");
    assert.equal(svg.style.fill, "rgb(0, 0, 0)");
    assert.equal(svg.querySelector("style"), null);
    assert.equal(container.querySelector(".material-symbols-outlined"), null);
    React.act(() => button.click());
    assert.equal(clicks, 1);
  }
});

test("shared picker finds, selects and removes EU AI labels alongside Material Symbols", async (t) => {
  /** Models the WordPress button's accessible name and selection state. */
  const Button = ({children, label, isPressed, onClick, className}) => React.createElement("button", {
    type: "button", "aria-label": label, "aria-pressed": isPressed, onClick, className,
  }, children);
  /** Models only the search field events needed by this integration test. */
  const SearchControl = ({value, onChange, onKeyDown, ref}) => React.createElement("input", {
    value, onInput: (event) => onChange(event.target.value), onKeyDown, ref,
  });
  const { MaterialSymbolPicker } = loadComponent("components/MaterialSymbolPicker.tsx", {
    "@wordpress/i18n": { __: (text) => text },
    "@wordpress/element": React,
    "@wordpress/a11y": { speak: () => {} },
    "@wordpress/components": { Button, SearchControl, Spinner: () => null },
  });
  const { container, render } = mount(t);
  const changes = [];
  /** Renders the controlled picker with the selection supplied by its parent block. */
  const show = async (materialSymbol = "") => {
    await React.act(async () => render(React.createElement(MaterialSymbolPicker, {
      attributes: {materialSymbol}, setAttributes: (attributes) => changes.push(attributes),
    })));
  };
  /** Submits the same explicit search action used in the editor. */
  const search = async (query) => {
    await React.act(async () => {
      const input = container.querySelector("input");
      input.value = query;
      input.dispatchEvent(new window.Event("input", {bubbles: true}));
    });
    await React.act(async () => [...container.querySelectorAll("button")]
      .find((button) => button.textContent === "Search for Icons").click());
  };

  await show();
  assert.doesNotMatch(container.textContent, /EU AI labels/);
  for (const name of ["eu-ai", "eu-ai-generated", "eu-ai-modified"]) {
    assert.equal(container.querySelector(`button[aria-label="${name}"]`), null);
  }
  assert.ok(container.querySelector(".material-symbols-outlined"));

  for (const query of ["ai", "ki", "eu-ai"]) {
    await search(query);
    assert.equal(container.querySelectorAll("button.rrze-editor-eu-ai-button").length, 3);
  }

  let aiResults;
  for (const query of ["ai", "ki", " KI "]) {
    await search(query);
    const results = [...container.querySelectorAll("button.elements-blocks-icon-Button")]
      .map((button) => button.getAttribute("aria-label"));
    for (const relevant of ["smart_toy", "model_training", "robot_2"]) {
      assert.ok(results.includes(relevant), `${query} should find ${relevant}`);
    }
    for (const unrelated of ["mail", "air", "payments", "kitchen", "local_parking", "settings"]) {
      assert.ok(!results.includes(unrelated), `${query} must not find unrelated ${unrelated}`);
    }
    if (aiResults) assert.deepEqual(results, aiResults, "AI and its German alias must return the same Material icons");
    aiResults = results;
  }

  await search("mail");
  assert.ok(container.querySelector('button[aria-label="mail"]'), "ordinary keyword searches keep working");
  await search("zzzz-no-such-icon");
  assert.equal(container.querySelectorAll("button.elements-blocks-icon-Button, button.rrze-editor-eu-ai-button").length, 0,
    "a search without matches must not show the default icons");

  for (const query of ["mail", "", "generated"]) {
    await search(query);
    assert.equal(container.querySelectorAll("button.rrze-editor-eu-ai-button").length, 0);
  }
  await search("ai-modified");
  assert.equal(container.querySelectorAll("button.rrze-editor-eu-ai-button").length, 1);
  const selectedButton = container.querySelector('button[aria-label="eu-ai-modified"]');
  React.act(() => selectedButton.click());
  assert.deepEqual(changes.at(-1), {materialSymbol: "eu-ai-modified"});
  await show("eu-ai-modified");
  assert.equal(container.querySelector('button[aria-label="eu-ai-modified"]').getAttribute("aria-pressed"), "true");
  React.act(() => container.querySelector('button[aria-label="eu-ai-modified"]').click());
  assert.deepEqual(changes.at(-1), {materialSymbol: ""});

  await React.act(async () => {
    const input = container.querySelector("input");
    input.value = "";
    input.dispatchEvent(new window.Event("input", {bubbles: true}));
  });
  await show("eu-ai-generated");
  assert.ok(container.querySelector("svg.elements-blocks-icon-selector-display path"));
  React.act(() => [...container.querySelectorAll("button")].find((button) => button.textContent === "Remove Icon").click());
  assert.deepEqual(changes.at(-1), {materialSymbol: ""});
});

test("InputWarning preserves translated text and its display thresholds", (t) => {
  const { default: InputWarning } = loadComponent("components/InputWarning.tsx", {
    "@wordpress/i18n": { __: (text) => `translated again: ${text}` },
    "@wordpress/components": {
      Notice: ({ children }) => React.createElement("div", { role: "status" }, children),
    },
  });
  const { container, render } = mount(t);
  const show = (count, max = 7) => render(React.createElement(InputWarning, {
    warning: "Bereits übersetzte Meldung", min: 5, max, count, status: "info", className: "",
  }));
  show(4);
  assert.equal(container.textContent, "");
  show(5);
  assert.equal(container.textContent, "Bereits übersetzte Meldung");
  show(7);
  assert.equal(container.textContent, "");
  show(7, null);
  assert.equal(container.textContent, "Bereits übersetzte Meldung");
});

const EmptyComponent = () => null;
// These tests exercise editor effects; child controls are outside their scope.
const emptyControls = new Proxy({}, { get: () => EmptyComponent });
function editorMocks(blockProps, selectors = {}, actions = {}) {
  return {
    "@wordpress/element": React,
    "@wordpress/i18n": { __: (text) => text, sprintf: (text, value) => text.replace("%d", value) },
    "@wordpress/components": emptyControls,
    "@wordpress/icons": {},
    "@wordpress/block-editor": {
      useBlockProps: () => ({ ...blockProps }),
      InnerBlocks: EmptyComponent,
      BlockControls: EmptyComponent,
      InspectorControls: EmptyComponent,
      RichText: EmptyComponent,
      ContrastChecker: EmptyComponent,
      store: "core/block-editor",
    },
    "@wordpress/data": {
      useDispatch: () => ({ __unstableMarkNextChangeAsNotPersistent: () => {}, ...actions }),
      useSelect: (callback) => callback(() => selectors),
    },
    "../../components/HeadingComponent": EmptyComponent,
    "../../components/CustomColorSwitcher": emptyControls,
    "../../components/IconPicker": emptyControls,
    "../../components/MaterialSymbolPicker": emptyControls,
    "../../components/Xray": emptyControls,
    "../../components/InputWarning": EmptyComponent,
    "./InspectorControls/CustomInspectorControls": emptyControls,
    "./InspectorControls/TitleSettings": emptyControls,
  };
}

function mountBlock(t, Edit, initialAttributes) {
  const { render, container } = mount(t);
  const writes = [];
  let currentAttributes;
  function Harness(props) {
    const [attributes, setAttributes] = React.useState(initialAttributes);
    currentAttributes = attributes;
    return React.createElement(Edit, {
      ...props,
      attributes,
      // Deliberately recreate the callback to catch effects that keep writing
      // unchanged attributes when a parent rerenders.
      setAttributes: (update) => {
        assert.ok(writes.length < 30, "attribute synchronization must settle");
        writes.push(update);
        setAttributes((previous) => ({ ...previous, ...update }));
      },
    });
  }
  return {
    container,
    writes,
    get attributes() { return currentAttributes; },
    render: (props) => render(React.createElement(Harness, props)),
  };
}

const wrapControl = ({ children }) => React.createElement("div", null, children);

/**
 * Supplies registered attribute defaults to editor components, as WordPress does.
 *
 * @param {string} name Block directory name.
 * @returns {object} Default attribute values.
 */
function blockDefaults(name) {
  const metadata = require(`../../src/blocks/${name}/block.json`);
  return Object.fromEntries(Object.entries(metadata.attributes)
    .filter(([, definition]) => Object.hasOwn(definition, "default"))
    .map(([key, definition]) => [key, definition.default]));
}

/**
 * Renders editable text without loading WordPress's rich-text host.
 *
 * @param {object} props RichText properties.
 * @returns {React.ReactElement} Visible text and its semantic element.
 */
function plainRichText({ tagName = "p", value, className, id }) {
  return React.createElement(tagName, { className, id }, value);
}

test("carousel editor allows top-level and dark-group placement and clears stale warnings", (t) => {
  let parent = null;
  let innerOptions;
  const mocks = editorMocks({}, {
    getBlockRootClientId: () => parent ? "parent" : null,
    getBlock: () => parent,
  });
  mocks["@wordpress/block-editor"].useBlockProps = (props) => props;
  mocks["@wordpress/block-editor"].RichText = plainRichText;
  mocks["@wordpress/block-editor"].useInnerBlocksProps = (props, options) => {
    innerOptions = options;
    return props;
  };
  mocks["@wordpress/components"] = { ...emptyControls, Notice: wrapControl };
  const { default: Edit } = loadComponent("blocks/carousel/edit.tsx", mocks);
  const block = mountBlock(t, Edit, { ...blockDefaults("carousel"), title: "Projects", headingLevel: 4 });
  block.render({ clientId: "carousel" });
  assert.equal(block.attributes.isNestedWarning, false);
  assert.equal(block.container.querySelector("h4").textContent, "Projects");
  assert.equal(block.container.querySelector('ul[role="list"]').getAttribute("aria-labelledby"), block.container.querySelector("h4").id);
  assert.deepEqual(innerOptions.allowedBlocks, ["rrze-elements/info-card"]);
  assert.equal(innerOptions.orientation, "horizontal");

  parent = { name: "core/columns", attributes: {} };
  block.render({ clientId: "carousel" });
  assert.equal(block.attributes.isNestedWarning, true);
  assert.match(block.container.textContent, /Please move it out/);

  parent = { name: "core/group", attributes: { className: "is-style-dark" } };
  block.render({ clientId: "carousel" });
  assert.equal(block.attributes.isNestedWarning, false);
  assert.doesNotMatch(block.container.textContent, /Please move it out/);

  parent = { name: "core/group", attributes: {} };
  block.render({ clientId: "carousel" });
  assert.equal(block.attributes.isNestedWarning, true);
  parent = null;
  block.render({ clientId: "carousel" });
  assert.equal(block.attributes.isNestedWarning, false);
});

/**
 * Replaces host controls while retaining the card editor's real state and context.
 *
 * @param {object} actions Block-editor actions to observe.
 * @returns {object} Module substitutes for the existing component loader.
 */
function infoCardEditorMocks(actions = {}) {
  const mocks = editorMocks({}, {
    getBlock: () => ({ innerBlocks: [{ name: "core/paragraph" }] }),
  }, actions);
  Object.assign(mocks["@wordpress/block-editor"], {
    useBlockProps: (props) => props,
    RichText: plainRichText,
    InspectorControls: wrapControl,
    BlockControls: wrapControl,
    MediaReplaceFlow: EmptyComponent,
    InnerBlocks: () => React.createElement("p", { "data-inner-content": true }, "Saved details"),
  });
  mocks["../../utility/color"] = { getImageBrightness: async () => 128 };
  mocks["../../components/ProgressBar"] = emptyControls;
  mocks["../../components/EditControl"] = {
    EditControl: ({ attributes, setAttributes }) => React.createElement("button", {
      "aria-label": "Edit details",
      onClick: () => setAttributes({ isEditView: !attributes.isEditView }),
    }, "Edit details"),
  };
  for (const name of ["CardSettingsPanel", "ImageSettingsPanel", "TextColorPanel", "BackgroundColorPanel", "LayoutPanel", "EffectsPanel"]) {
    mocks[`./inspectorControls/${name}`] = EmptyComponent;
  }
  return mocks;
}

test("content slider editor accepts reusable cards and changes only its shared height", (t) => {
  let innerOptions;
  let heightControl;
  const mocks = editorMocks({}, {
    getBlockOrder: () => ["one", "two"],
    getSelectedBlockClientId: () => null,
  });
  Object.assign(mocks["@wordpress/block-editor"], {
    useBlockProps: (props) => props,
    useInnerBlocksProps: (props, options) => { innerOptions = options; return props; },
    HeadingLevelDropdown: EmptyComponent,
    InspectorControls: wrapControl,
  });
  mocks["@wordpress/components"] = {
    PanelBody: wrapControl,
    RangeControl: (props) => { heightControl = props; return null; },
  };
  const { default: Edit } = loadComponent("blocks/content-slider/edit.tsx", mocks);
  const block = mountBlock(t, Edit, blockDefaults("content-slider"));
  block.render({ clientId: "slider" });
  assert.deepEqual(innerOptions.allowedBlocks, ["rrze-elements/info-card"]);
  assert.equal(innerOptions.template.length, 3);
  assert.equal(innerOptions.orientation, "horizontal");
  assert.equal(block.container.querySelectorAll("button").length, 2);
  assert.equal(heightControl.value, 480);
  React.act(() => heightControl.onChange(560));
  assert.equal(block.attributes.cardHeight, 560);
  assert.equal(block.attributes.cardListLayout, false);
  assert.equal(block.container.querySelectorAll("[data-slider-clone]").length, 0);
});

test("info card editor follows generic container context without changing parent attributes", (t) => {
  let settings;
  const mocks = infoCardEditorMocks({
    updateBlockAttributes: () => assert.fail("cards must not write attributes of other blocks"),
  });
  mocks["./inspectorControls/CardSettingsPanel"] = (props) => { settings = props; return null; };
  const { default: Edit } = loadComponent("blocks/info-card/edit.tsx", mocks);
  const { container, render } = mount(t);
  const attributes = { ...blockDefaults("info-card"), title: "Card title", scientificText: "Scientific caption" };
  const show = (context) => render(React.createElement(Edit, {
    attributes, context, setAttributes: () => assert.fail("inherited layout must not rewrite the card"), clientId: "card", isSelected: false,
  }));
  show({ "rrze-elements/card-height": 420, "rrze-elements/card-list-layout": true });
  assert.equal(container.firstElementChild.tagName, "LI");
  assert.equal(container.querySelector(".rrze-elements-blocks__carousel_feature_card-content").style.minHeight, "420px");
  assert.ok(container.querySelector(".rrze-elements-blocks__carousel_feature_card_scientific-text"));
  assert.equal(settings.isVisible, false);
  show({ "rrze-elements/card-height": 520, "rrze-elements/card-list-layout": true, "rrze-elements/card-container-style": "is-style-marketing" });
  assert.equal(container.querySelector(".rrze-elements-blocks__carousel_feature_card-content").style.minHeight, "520px");
  assert.equal(container.querySelector(".rrze-elements-blocks__carousel_feature_card_text").textContent, "Card title");
  assert.equal(container.querySelector(".rrze-elements-blocks__carousel_feature_card_scientific-text"), null);
});

test("standalone info cards control their own height and restore it after leaving a container", (t) => {
  let settings;
  const mocks = infoCardEditorMocks();
  mocks["./inspectorControls/CardSettingsPanel"] = (props) => { settings = props; return null; };
  const { default: Edit } = loadComponent("blocks/info-card/edit.tsx", mocks);
  const block = mountBlock(t, Edit, blockDefaults("info-card"));
  const show = (context = {}) => block.render({ clientId: "card", isSelected: false, context });
  show();
  assert.equal(block.container.firstElementChild.tagName, "DIV");
  assert.equal(settings.isVisible, true);
  React.act(() => settings.onChange(480));
  assert.equal(block.attributes.cardHeight, 480);
  show({ "rrze-elements/card-height": 600 });
  assert.equal(settings.isVisible, false);
  assert.equal(block.attributes.cardHeight, 480);
  show();
  assert.equal(settings.cardHeight, 480);
  assert.equal(block.container.firstElementChild.dataset.cardAppearance, "marketing");
});

test("slider style switches show captions below the image without rewriting card text", (t) => {
  const metadata = require("../../src/blocks/content-slider/block.json");
  const { default: Edit } = loadComponent("blocks/info-card/edit.tsx", infoCardEditorMocks());
  const { container, render } = mount(t);
  const attributes = {
    ...blockDefaults("info-card"), className: "is-style-marketing",
    title: "Stored title", subtitle: "Stored subtitle", scientificText: "Scientific caption",
  };
  /**
   * Passes the parent attributes through its actual registered context mapping.
   *
   * @param {string} className Selected slider style.
   */
  const show = (className) => {
    const parent = { ...blockDefaults("content-slider"), className };
    const context = Object.fromEntries(Object.entries(metadata.providesContext)
      .map(([key, attribute]) => [key, parent[attribute]]));
    render(React.createElement(Edit, {
      attributes, context, clientId: "card", isSelected: false,
      setAttributes: () => assert.fail("style inheritance must preserve the saved card"),
    }));
  };
  show("is-style-scientific");
  assert.equal(container.firstElementChild.dataset.cardAppearance, "scientific");
  const caption = container.querySelector(".rrze-elements-blocks__carousel_feature_card_scientific-text");
  assert.equal(caption.textContent, "Scientific caption");
  assert.equal(caption.closest(".rrze-elements-blocks__carousel_feature_card-content"), null);
  assert.equal(container.querySelector(".rrze-elements-blocks__carousel_feature_card_text"), null);
  show("is-style-marketing");
  assert.equal(container.firstElementChild.dataset.cardAppearance, "marketing");
  assert.equal(container.querySelector(".rrze-elements-blocks__carousel_feature_card_text").textContent, "Stored title");
  assert.equal(container.querySelector(".rrze-elements-blocks__carousel_feature_card_subtitle").textContent, "Stored subtitle");
  assert.equal(container.querySelector(".rrze-elements-blocks__carousel_feature_card_scientific-text"), null);
});

test("adding a link closes the info card's detail editor without deleting saved content", (t) => {
  const mocks = infoCardEditorMocks();
  const { default: Edit } = loadComponent("blocks/info-card/edit.tsx", mocks);
  const { container, render } = mount(t);
  const writes = [];
  const show = (url) => render(React.createElement(Edit, {
    attributes: { ...blockDefaults("info-card"), url },
    setAttributes: (values) => writes.push(values), clientId: "card", isSelected: false,
  }));
  show("");
  React.act(() => container.querySelector('[aria-label="Edit details"]').click());
  assert.ok(container.querySelector("[data-inner-content]"));
  show("https://example.com/project");
  assert.equal(container.querySelector("[data-inner-content]"), null);
  assert.ok(container.querySelector('[aria-label="Open card link"]'));
  assert.deepEqual(writes, [], "switching the view must not rewrite card attributes");
  show("");
  React.act(() => container.querySelector('[aria-label="Edit details"]').click());
  assert.equal(container.querySelector("[data-inner-content]").textContent, "Saved details");
});

test("accordion FAQ toolbar and inspector share an opt-in boolean", (t) => {
  const metadata = require("../../src/blocks/collapsibles/block.json");
  const mocks = editorMocks({}, { getBlockRootClientId: () => null });
  mocks["@wordpress/block-editor"].BlockControls = wrapControl;
  mocks["@wordpress/block-editor"].InspectorControls = wrapControl;
  mocks["../../components/HeadingSelector"] = emptyControls;
  mocks["../../components/ExpandAllLink"] = EmptyComponent;
  mocks["../../_shared/icons/symbols/person_raised_hand.svg"] = (props) =>
    React.createElement("svg", { ...props, "data-symbol": "person_raised_hand" });
  mocks["@wordpress/components"] = {
    PanelBody: wrapControl,
    ToolbarGroup: wrapControl,
    ToolbarButton: ({ icon, label, isPressed, onClick }) => React.createElement("button", {
      "aria-label": label, "aria-pressed": isPressed, onClick,
    }, icon),
    ToggleControl: ({ label, checked, onChange }) => React.createElement("input", {
      type: "checkbox", "aria-label": label, checked,
      onChange: (event) => onChange(event.target.checked),
    }),
  };
  const { default: Edit } = loadComponent("blocks/collapsibles/edit.tsx", mocks);
  const block = mountBlock(t, Edit, { faqSchema: metadata.attributes.faqSchema.default, expandLabel: "Expand All" });
  block.render({ clientId: "accordion" });
  const button = block.container.querySelector('button[aria-label="Mark as FAQ"]');
  const checkbox = block.container.querySelector('input[aria-label="Mark as FAQ"]');
  assert.equal(block.attributes.faqSchema, false);
  assert.equal(button.getAttribute("aria-pressed"), "false");
  assert.equal(checkbox.checked, false);
  assert.ok(button.querySelector('svg[data-symbol="person_raised_hand"][aria-hidden="true"]'));

  React.act(() => button.click());
  assert.equal(block.attributes.faqSchema, true);
  assert.equal(checkbox.checked, true);
  assert.equal(button.getAttribute("aria-pressed"), "true");

  React.act(() => checkbox.click());
  assert.equal(block.attributes.faqSchema, false);
  assert.equal(button.getAttribute("aria-pressed"), "false");
});

const controlMocks = {
  "@wordpress/element": React,
  "@wordpress/i18n": { __: (text) => text },
  "@wordpress/icons": {},
  "@wordpress/components": {
    PanelBody: wrapControl,
    ToolbarGroup: wrapControl,
    ToolbarItem: EmptyComponent,
    ToolbarButton: EmptyComponent,
    __experimentalToggleGroupControl: ({ label, value, children, onChange }) => React.createElement("fieldset", null,
      React.createElement("legend", null, label),
      React.Children.map(children, (option) => React.createElement("label", null,
        React.createElement("input", {
          type: "radio", value: option.props.value, checked: option.props.value === value,
          onChange: () => onChange(option.props.value),
        }), option.props.label,
      )),
    ),
    __experimentalToggleGroupControlOption: EmptyComponent,
    __experimentalToggleGroupControlOptionIcon: EmptyComponent,
    SVG: "svg",
    Path: "path",
    Button: ({ children, onClick, type, "aria-pressed": pressed }) => React.createElement("button", {
      type, onClick, "aria-pressed": pressed,
    }, children),
  },
};

const toggleGroupControls = loadComponent("components/ToggleGroupControl.ts", controlMocks);
controlMocks["./ToggleGroupControl"] = toggleGroupControls;
controlMocks["../../../components/ToggleGroupControl"] = toggleGroupControls;

test("media toggle groups preserve alignment and ratio values", (t) => {
  const { AlignmentSelectorPanel } = loadComponent("components/AlignmentSelector.tsx", controlMocks);
  const alignment = mountBlock(t, AlignmentSelectorPanel, {});
  alignment.render({});
  assert.equal(alignment.container.querySelector('input[value="top"]').checked, true);
  assert.equal(alignment.container.querySelector('input[value="bottom"]').labels[0].textContent, "Align image to bottom");
  React.act(() => alignment.container.querySelector('input[value="bottom"]').click());
  assert.equal(alignment.attributes.mediaAlignment, "bottom");
  React.act(() => alignment.container.querySelector('input[value="center"]').click());
  assert.equal(alignment.attributes.mediaAlignment, "center");

  const { ViewRatioSelectorPanel } = loadComponent("components/ViewRatioSelector.tsx", controlMocks);
  const ratio = mountBlock(t, ViewRatioSelectorPanel, { viewRatio: "2:1" });
  ratio.render({});
  assert.equal(ratio.container.querySelector('input[value="2:1"]').checked, true);
  React.act(() => ratio.container.querySelector('input[value="1:2"]').click());
  assert.equal(ratio.attributes.viewRatio, "1:2");
});

test("heading and visibility controls preserve numeric and boolean attributes", (t) => {
  const { HeadingSelectorInspector } = loadComponent("components/HeadingSelector.tsx", controlMocks);
  const heading = mountBlock(t, HeadingSelectorInspector, { hstart: 3 });
  heading.render({});
  assert.equal(heading.container.querySelector('input[value="3"]').checked, true);
  React.act(() => heading.container.querySelector('input[value="5"]').click());
  assert.equal(heading.attributes.hstart, 5);

  const { VisibilitySelectorPanel } = loadComponent("components/VisibilitySelector.tsx", controlMocks);
  const visibility = mountBlock(t, VisibilitySelectorPanel, {});
  visibility.render({});
  assert.equal(visibility.container.querySelector('input[value="visible"]').checked, true, "missing visibility defaults to visible");
  React.act(() => visibility.container.querySelector('input[value="hidden"]').click());
  assert.equal(visibility.attributes.showImageWrapper, false);
  React.act(() => visibility.container.querySelector('input[value="visible"]').click());
  assert.equal(visibility.attributes.showImageWrapper, true);
});

test("viewport selection follows parent changes and image fit keeps its saved values", (t) => {
  const { default: DeviceViewportToggle } = loadComponent("blocks/info-card/inspectorControls/DeviceViewportToggle.tsx", controlMocks);
  const { container, render } = mount(t);
  const devices = [];
  const show = (deviceType) => render(React.createElement(DeviceViewportToggle, {
    label: "Viewport", deviceType, onChange: (value) => devices.push(value),
  }));
  show("desktop");
  React.act(() => container.querySelector('input[value="tablet"]').click());
  assert.deepEqual(devices, ["tablet"]);
  show("mobile");
  assert.equal(container.querySelector('input[value="mobile"]').checked, true);
  assert.equal(container.querySelector('input[value="desktop"]').checked, false);

  const { default: ImageSettingsPanel } = loadComponent("blocks/info-card/inspectorControls/ImageSettingsPanel.tsx", {
    ...controlMocks, "./DeviceViewportToggle": EmptyComponent,
  });
  const image = mountBlock(t, ImageSettingsPanel, {});
  image.render({});
  assert.equal(image.container.querySelector('input[value="cover"]').checked, true);
  React.act(() => image.container.querySelector('input[value="contain"]').click());
  assert.equal(image.attributes.imageObjectFit, "contain");
});

test("counter start value rejects empty, invalid and negative drafts and follows undo", (t) => {
  let inputProps;
  const mocks = editorMocks({});
  mocks["@wordpress/block-editor"].InspectorControls = wrapControl;
  mocks["@wordpress/components"] = {
    ...controlMocks["@wordpress/components"],
    RangeControl: EmptyComponent,
    TextControl: (props) => { inputProps = props; return null; },
  };
  mocks.gsap = { gsap: { registerPlugin: () => {} } };
  mocks["gsap/ScrollTrigger"] = { ScrollTrigger: {} };
  const { default: Edit } = loadComponent("blocks/counter-row/edit.tsx", mocks);
  const { render } = mount(t);
  const writes = [];
  let updateAttributes;
  function Harness() {
    const [attributes, setAttributes] = React.useState({ startValue: 10, columns: 3, stagger: 0 });
    updateAttributes = setAttributes;
    return React.createElement(Edit, {
      attributes, setAttributes: (update) => {
        writes.push(update);
        setAttributes((previous) => ({ ...previous, ...update }));
      },
    });
  }
  render(React.createElement(Harness));
  assert.equal(inputProps.type, "number");
  for (const draft of ["", "-1", "1.5", "invalid", "Infinity", "1e999"]) {
    React.act(() => inputProps.onChange(draft));
    assert.equal(inputProps.value, draft);
    assert.equal(writes.length, 0);
    React.act(() => inputProps.onBlur());
    assert.equal(inputProps.value, "10", "invalid drafts revert to the saved value on blur");
  }
  for (const draft of ["0", "42", "1e3"]) {
    React.act(() => inputProps.onChange(draft));
    assert.equal(writes.at(-1).startValue, Number(draft));
  }
  React.act(() => updateAttributes((previous) => ({ ...previous, startValue: 10 })));
  assert.equal(inputProps.value, "10", "undo or external updates refresh the displayed value");
});

test("notice presets reset custom icons in both pickers without replacing content", (t) => {
  const { default: VariationPicker } = loadComponent("blocks/notice/VariationPicker.tsx", controlMocks);
  const { IconMarkComponent } = loadComponent("components/IconPicker.tsx", {
    ...controlMocks,
    "@wordpress/a11y": { speak: () => {} },
  });
  const variations = [
    { name: "notice-hinweis", title: "Hint", iconClass: "symbol notifications" },
    { name: "notice-attention", title: "Warning", iconClass: "symbol warning" },
  ];
  const mocks = editorMocks({}, { getBlockVariations: () => variations });
  mocks["@wordpress/components"] = { ...controlMocks["@wordpress/components"], Placeholder: wrapControl };
  mocks["@wordpress/block-editor"].InspectorControls = wrapControl;
  mocks["@wordpress/block-editor"].InnerBlocks = () => React.createElement("p", null, "Existing notice content");
  mocks["@wordpress/blocks"] = { store: "core/blocks" };
  mocks["./VariationPicker"] = VariationPicker;
  mocks["../../components/IconPicker"] = { IconMarkComponent };
  const { default: Edit } = loadComponent("blocks/notice/edit.tsx", mocks);
  let selectCustomIcon;
  function NoticeEditor(props) {
    // Apply the same attribute update as the custom icon picker.
    selectCustomIcon = (materialSymbol) => props.setAttributes({ materialSymbol });
    return React.createElement(Edit, props);
  }
  const block = mountBlock(t, NoticeEditor, { color: "red", materialSymbol: "star" });
  const renderedIcon = () => block.container.querySelector(".notice .material-symbols-outlined").textContent;
  block.render({});
  assert.equal(renderedIcon(), "star");
  const buttons = [...block.container.querySelectorAll("button")];
  assert.deepEqual(buttons.map((button) => button.textContent), ["Hint", "Warning", "Hint", "Warning"]);
  assert.ok(buttons.every((button) => button.type === "button"));
  React.act(() => buttons[3].click());
  assert.deepEqual(block.writes, [{ style: "notice-attention", materialSymbol: "" }]);
  assert.equal(renderedIcon(), "warning");
  assert.equal(block.attributes.color, "red");
  assert.equal(block.container.querySelectorAll("button").length, 2);
  assert.equal(block.container.querySelector('button[aria-pressed="true"]').textContent, "Warning");
  const content = block.container.querySelector(".notice p");
  React.act(() => selectCustomIcon("favorite"));
  assert.equal(renderedIcon(), "favorite");
  React.act(() => block.container.querySelector("button").click());
  assert.deepEqual(block.writes.at(-1), { style: "notice-hinweis", materialSymbol: "" });
  assert.equal(renderedIcon(), "notifications");
  React.act(() => selectCustomIcon("star"));
  assert.equal(renderedIcon(), "star");
  React.act(() => block.container.querySelector("button").click());
  assert.equal(renderedIcon(), "notifications", "reselecting the current preset also resets its icon");
  assert.equal(block.container.querySelector(".notice p"), content);
});

test("tab attributes follow parent context without repeated writes", (t) => {
  const blockProps = { "data-block": "tab-a" };
  const { default: Edit } = loadComponent("blocks/tab/edit.tsx", editorMocks(blockProps));
  const block = mountBlock(t, Edit, { blockId: "tab-a", tabsUid: "tabs", active: true, xray: false, icon: "" });
  const context = { "rrze-elements/tabs-uid": "tabs", "rrze-elements/tabs-active": "tab-a", "rrze-elements/tabs-xray": false };
  block.render({ context });
  assert.equal(block.writes.length, 0);

  block.render({ context: { ...context, "rrze-elements/tabs-active": "tab-b", "rrze-elements/tabs-xray": true } });
  assert.equal(block.attributes.active, false);
  assert.equal(block.attributes.xray, true);
  assert.equal(block.writes.length, 2);

  block.render({ context: { ...context, "rrze-elements/tabs-active": "" } });
  assert.equal(block.attributes.active, true);
  assert.equal(block.attributes.xray, false);
  const count = block.writes.length;
  block.render({ context });
  assert.equal(block.writes.length, count);

  // Duplicating a block changes its ID even if the parent's active ID is stable.
  blockProps["data-block"] = "tab-copy";
  block.render({ context });
  assert.equal(block.attributes.blockId, "tab-copy");
  assert.equal(block.attributes.active, false);
});

test("tabs store a shortened ID once and select a remaining tab after deletion", (t) => {
  const clientId = "abcdefghij-klmnopqrst";
  let children = [
    { clientId: "tab-a", attributes: { title: "First" } },
    { clientId: "tab-b", attributes: { title: "Second" } },
  ];
  const mocks = editorMocks({ "data-block": clientId }, { getBlocks: () => children });
  mocks["@wordpress/blocks"] = {};
  const { default: Edit } = loadComponent("blocks/tabs/edit.tsx", mocks);
  const block = mountBlock(t, Edit, { blockId: "old", active: "tab-a", innerClientIds: [] });
  block.render({ clientId });
  assert.equal(block.attributes.blockId, "abcdefghij");
  assert.equal(block.writes.filter((write) => "blockId" in write).length, 1);
  const count = block.writes.length;
  block.render({ clientId });
  assert.equal(block.writes.length, count);

  children = children.slice(1);
  block.render({ clientId });
  assert.equal(block.attributes.active, "tab-b");
  assert.deepEqual(block.attributes.innerClientIds.map((item) => item.clientId), ["tab-b"]);
});

for (const name of ["timeline-item", "process-step"]) {
  test(`${name} follows heading context and skips unchanged attributes`, (t) => {
    const mocks = editorMocks({}, { getBlockRootClientId: () => null });
    const { default: Edit } = loadComponent(`blocks/${name}/edit.tsx`, mocks);
    const block = mountBlock(t, Edit, { hstart: 2, title: "Title", stepLabel: "Step" });
    block.render({ clientId: "item", context: { "rrze-elements/timeline-hstart": 2 } });
    assert.equal(block.writes.length, 0);
    block.render({ clientId: "item", context: { "rrze-elements/timeline-hstart": 4 } });
    assert.equal(block.attributes.hstart, 4);
    assert.equal(block.writes.length, 1);
    block.render({ clientId: "item", context: { "rrze-elements/timeline-hstart": 4 } });
    assert.equal(block.writes.length, 1);
  });
}

test("columns synchronize color slugs without looping on callback changes", (t) => {
  const { default: Edit } = loadComponent("blocks/columns/edit.tsx", editorMocks({}));
  const block = mountBlock(t, Edit, { color: "#DFF0D8", colorSlug: "default", numberOfColumns: 2 });
  block.render({});
  assert.equal(block.attributes.colorSlug, "success");
  assert.equal(block.writes.length, 1);
  block.render({});
  assert.equal(block.writes.length, 1);
});

for (const initialURL of ["", "blob:stale-upload"]) {
  test(`media replacement clears only initial stale uploads (${initialURL || "empty"})`, (t) => {
    const revoked = [];
    const mocks = editorMocks({});
    mocks["@wordpress/notices"] = { store: "core/notices" };
    mocks["@wordpress/blob"] = {
      isBlobURL: (url) => typeof url === "string" && url.startsWith("blob:"),
      revokeBlobURL: (url) => revoked.push(url),
    };
    mocks["@wordpress/block-editor"].MediaReplaceFlow = EmptyComponent;
    const { CustomMediaReplaceFlow } = loadComponent("components/CustomMediaReplaceFlow.tsx", mocks);
    const { render } = mount(t);
    const writes = [];
    const show = (url, id = 0) => render(React.createElement(React.StrictMode, null,
      React.createElement(CustomMediaReplaceFlow, {
        attributes: { id, url, alt: "", srcset: "" },
        setAttributes: (update) => writes.push(update),
      }),
    ));
    show(initialURL);
    const expectedClears = initialURL ? 1 : 0;
    assert.equal(writes.length, expectedClears);
    if (initialURL) assert.equal(writes[0].url, undefined);

    show("blob:upload-a");
    show("blob:upload-a");
    assert.equal(writes.length, expectedClears, "keep the in-progress upload");
    assert.ok(!revoked.includes("blob:upload-a"));
    show("blob:upload-b");
    show("https://example.com/uploaded.jpg", 42);
    assert.deepEqual(revoked, [...(initialURL ? [initialURL] : []), "blob:upload-a", "blob:upload-b"]);
    assert.equal(writes.length, expectedClears);
  });
}
