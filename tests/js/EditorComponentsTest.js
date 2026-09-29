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

// Exercise the actual TSX with React while substituting WordPress host services.
function loadComponent(relativePath, mocks) {
  const filename = path.resolve(__dirname, "../../src", relativePath);
  const source = fs.readFileSync(filename, "utf8").replaceAll(
    "import.meta.url",
    JSON.stringify(pathToFileURL(filename).href),
  );
  const { outputText } = ts.transpileModule(source, {
    fileName: filename,
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      jsx: ts.JsxEmit.ReactJSX,
      target: ts.ScriptTarget.ES2020,
      esModuleInterop: true,
    },
  });
  const realRequire = createRequire(filename);
  const module = { exports: {} };
  const localRequire = (name) => Object.hasOwn(mocks, name)
    ? mocks[name]
    : realRequire(name);
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
