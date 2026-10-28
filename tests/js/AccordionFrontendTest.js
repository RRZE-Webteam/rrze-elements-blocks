const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");
const assert = require("node:assert/strict");
const { JSDOM } = require("jsdom");
const jquery = require("jquery");

const script = fs.readFileSync(path.resolve(__dirname, "../../assets/js/accordion/rrze-accordion.js"), "utf8");

/**
 * Builds the current Collapse markup with a nested legacy Accordion panel.
 * @param {string} content Inner anchor markup.
 * @returns {string} Accordion fixture, unrelated panel, and external target.
 */
function markup(content) {
  return `<a id="outside-link" href="#outside">Outside</a><h2 id="outside">Outside target</h2>
    <div class="accordion">
      <div class="accordion-group">
        <h2 class="accordion-heading" id="fach-heading"><button id="fach" class="accordion-toggle" data-href="#fach" aria-expanded="false">Outer</button></h2>
        <div class="accordion-body" id="fach-section" name="legacy-name" style="height: 400px">
          <div class="accordion-inner"><div class="accordion"><div class="accordion-group">
            <h3 class="accordion-heading" id="inner-heading"><button id="inner-button" class="accordion-toggle" data-href="#panel_2" aria-expanded="false">Inner</button></h3>
            <div class="accordion-body" id="panel_2" style="height: 200px"><div class="accordion-inner">${content}</div></div>
          </div></div></div>
        </div>
      </div>
      <div class="accordion-group">
        <h2 class="accordion-heading"><button id="other" class="accordion-toggle" data-href="#other" aria-expanded="false">Other</button></h2>
        <div class="accordion-body" id="other-section"><h3 id="other-target">Other target</h3></div>
      </div>
    </div>`;
}

/**
 * Runs the real script and jQuery; substitutes only browser layout and scrolling.
 * Animation completion and animation frames are controlled separately to check order.
 * @param {import('node:test').TestContext} t Test cleanup owner.
 * @param {object} options Initial fragment, markup, motion preference, animation mode, and script source.
 * @returns {Promise<object>} DOM, jQuery, recorded scrolls, and frame helpers.
 */
async function setup(t, { hash = "#ziel", content = '<h4 id="ziel">Target</h4>', reducedMotion = false, animate = false, source = script } = {}) {
  const dom = new JSDOM(markup(content), {
    runScripts: "outside-only", url: `https://example.test/page/?view=1${hash}`,
  });
  t.after(() => dom.window.close());
  const { window } = dom;
  const { document } = window;
  const frames = [];
  const scrolls = [];

  /** Supplies the configured motion preference. @returns {object} Media-query result. */
  window.matchMedia = () => ({ matches: reducedMotion });
  /** Queues frame callbacks without advancing animations. @param {Function} callback Frame callback. @returns {number} Frame ID. */
  window.requestAnimationFrame = (callback) => frames.push(callback);
  /** Models visibility for jQuery in jsdom's layout-free DOM. @returns {Array<object>} Visible element rectangle. */
  window.HTMLElement.prototype.getClientRects = function () {
    for (let element = this; element; element = element.parentElement) {
      if (window.getComputedStyle(element).display === "none") {
        return [];
      }
    }
    return [{ width: 100, height: 20 }];
  };
  /** Records native scrolling for assertions. @param {object} options Scroll options. @returns {void} */
  window.HTMLElement.prototype.scrollIntoView = function (options) {
    scrolls.push({ target: this, options, marginTop: window.getComputedStyle(this).scrollMarginTop });
  };
  window.wp = { i18n: {
    /** Returns the untranslated test label. @param {string} text Label. @returns {string} Label. */
    __(text) { return text; },
  } };
  const $ = jquery(window);
  $.fx.off = !animate;
  window.eval(source);
  await new Promise((resolve) => $(resolve));

  return {
    window, document, $, scrolls,
    /** Runs the next frame after pending observers have been processed. @returns {Promise<void>} */
    async frame() {
      await Promise.resolve();
      frames.splice(0).forEach((callback) => callback());
    },
    /**
     * Checks whether the script claims a click without allowing actual navigation.
     * @param {string} href Link URL.
     * @param {object} attributes Additional anchor attributes.
     * @param {object} init Mouse event options.
     * @param {boolean} alreadyPrevented Whether another handler owns the click.
     * @returns {boolean} Whether the accordion handler prevented default navigation.
     */
    click(href, attributes = {}, init = {}, alreadyPrevented = false) {
      const link = document.createElement("a");
      link.href = href;
      for (const [name, value] of Object.entries(attributes)) {
        link.setAttribute(name, value);
      }
      document.body.append(link);
      const event = new window.MouseEvent("click", { bubbles: true, cancelable: true, button: 0, ...init });
      if (alreadyPrevented) {
        event.preventDefault();
      }
      let claimed;
      // Registered after jQuery: observe its decision, then suppress jsdom navigation.
      document.addEventListener("click", (click) => {
        claimed = click.defaultPrevented;
        click.preventDefault();
      }, { once: true });
      link.dispatchEvent(event);
      return claimed;
    },
  };
}

test("initial content anchors open every ancestor and focus the content, not the heading", async (t) => {
  const f = await setup(t);
  assert.equal(f.scrolls.length, 0);
  await f.frame();
  assert.equal(f.$("#fach-section, #panel_2").filter(":visible").length, 2);
  assert.equal(f.$("#other-section").is(":visible"), false);
  assert.equal(f.$("#fach, #inner-button").filter('[aria-expanded="true"].active').length, 2);
  assert.equal(f.scrolls[0].target.id, "ziel");
  assert.equal(f.scrolls[0].options.block, "start");
  assert.ok(Math.abs(parseFloat(f.scrolls[0].marginTop) - f.window.innerHeight * 0.1) < 0.01);
  assert.equal(f.scrolls[0].target.style.scrollMarginTop, "", "temporary scrolling styles are removed");
  assert.equal(f.document.activeElement.id, "ziel");
  assert.equal(f.document.activeElement.getAttribute("tabindex"), "-1");
  f.document.getElementById("outside-link").focus();
  assert.equal(f.document.getElementById("ziel").hasAttribute("tabindex"), false);
});

test("scrolling waits until all nested panel animations have finished", async (t) => {
  const f = await setup(t, { animate: true });
  f.$("#fach-section").finish();
  await f.frame();
  assert.equal(f.scrolls.length, 0, "inner animation is still pending");
  f.$("#panel_2").finish();
  await f.frame();
  assert.equal(f.scrolls[0].target.id, "ziel");
});

test("encoded, punctuated and literal malformed IDs are resolved without selector errors", async (t) => {
  for (const id of ["überblick", "ziel.mit:zeichen[1]", "100%", "bad%E0%A4%A", "panel_2_detail"]) {
    const f = await setup(t, { hash: `#${encodeURIComponent(id)}`, content: `<h4 id="${id}">Target</h4>` });
    await f.frame();
    assert.equal(f.scrolls[0].target.id, id);
  }
  const literal = await setup(t, { hash: "#bad%E0%A4%A", content: '<h4 id="bad%E0%A4%A">Target</h4>' });
  await literal.frame();
  assert.equal(literal.scrolls[0].target.id, "bad%E0%A4%A");
});

test("legacy named anchors and direct panel links retain their targets", async (t) => {
  for (const [hash, content, scrollId, focusId] of [
    ["#alt", '<a name="alt" id="named-anchor"></a>', "named-anchor", "named-anchor"],
    ["#legacy-name", "", "fach-heading", "fach"],
    ["#fach", "", "fach-heading", "fach"],
    ["#fach-section", "", "fach-heading", "fach"],
    ["#inner-button", "", "inner-heading", "inner-button"],
    ["#panel_2", "", "inner-heading", "inner-button"],
    ["#panel_2_suffix", "", "inner-heading", "inner-button"],
  ]) {
    const f = await setup(t, { hash, content });
    await f.frame();
    assert.equal(f.scrolls[0].target.id, scrollId, hash);
    assert.equal(f.scrolls[0].options.block, "start", hash);
    assert.ok(Math.abs(parseFloat(f.scrolls[0].marginTop) - f.window.innerHeight * 0.1) < 0.01, hash);
    assert.equal(f.document.activeElement.id, focusId, hash);
  }
});

test("unknown, malformed, empty and outside fragments leave other content alone", async (t) => {
  for (const hash of ["", "#", "#missing", "#%E0%A4%A", "#outside"]) {
    const f = await setup(t, { hash });
    await f.frame();
    assert.equal(f.scrolls.length, 0, hash);
    assert.equal(f.$(".accordion-body:visible").length, 0, hash);
    // A bad initial hash must not prevent the ordinary controls from binding.
    f.$("#fach").trigger("mousedown");
    assert.equal(f.$("#fach-section").is(":visible"), true);
  }
});

test("an unchanged same-page link reopens closed panels without adding history", async (t) => {
  const f = await setup(t);
  await f.frame();
  f.$(".accordion-body").hide();
  const historyLength = f.window.history.length;
  assert.equal(f.click("https://example.test/page/?view=1#ziel"), true);
  await f.frame();
  assert.equal(f.$("#panel_2").is(":visible"), true);
  assert.equal(f.scrolls.length, 2);
  assert.equal(f.window.history.length, historyLength);
  assert.equal(f.window.location.hash, "#ziel");
});

test("modified, external, download and other-handler links are not claimed", async (t) => {
  const f = await setup(t);
  await f.frame();
  f.$(".accordion-body").hide();
  for (const init of [{ ctrlKey: true }, { metaKey: true }, { shiftKey: true }, { altKey: true }, { button: 1 }]) {
    assert.equal(f.click("#ziel", {}, init), false);
  }
  for (const attributes of [{ target: "_blank" }, { download: "" }, { class: "accordion-toggle" }]) {
    assert.equal(f.click("#ziel", attributes), false);
  }
  for (const href of ["https://other.test/page/?view=1#ziel", "/other/?view=1#ziel", "?view=2#ziel", "#outside", "#other-target", "#missing"]) {
    assert.equal(f.click(href), false, href);
  }
  f.click("#ziel", {}, {}, true);
  await f.frame();
  assert.equal(f.$(".accordion-body:visible").length, 0);
  assert.equal(f.scrolls.length, 1);
});

test("native hash changes and history navigation reveal the corresponding targets", async (t) => {
  const f = await setup(t);
  await f.frame();
  const changed = new Promise((resolve) => f.window.addEventListener("hashchange", resolve, { once: true }));
  const link = f.document.createElement("a");
  link.href = "#other-target";
  f.document.body.append(link);
  link.click();
  await changed;
  await f.frame();
  assert.equal(f.scrolls.at(-1).target.id, "other-target");
  f.$("#fach-section, #panel_2").hide();
  const back = new Promise((resolve) => f.window.addEventListener("hashchange", resolve, { once: true }));
  f.window.history.back();
  await back;
  await f.frame();
  assert.equal(f.scrolls.at(-1).target.id, "ziel");
  assert.equal(f.$("#panel_2").is(":visible"), true);
});

test("a newer fragment cancels the previous animation's pending scroll and focus", async (t) => {
  const f = await setup(t, { animate: true });
  f.window.history.replaceState(null, "", "#other-target");
  f.window.dispatchEvent(new f.window.HashChangeEvent("hashchange"));
  f.$(".accordion-body").finish();
  await f.frame();
  assert.deepEqual(f.scrolls.map(({ target }) => target.id), ["other-target"]);
  assert.equal(f.document.activeElement.id, "other-target");
});

test("leaving accordion anchors cancels pending navigation", async (t) => {
  const f = await setup(t, { animate: true });
  f.window.history.replaceState(null, "", "#outside");
  f.window.dispatchEvent(new f.window.HashChangeEvent("hashchange"));
  f.$(".accordion-body").finish();
  await f.frame();
  assert.equal(f.scrolls.length, 0);
});

test("manual panel actions supersede a pending anchor scroll and focus", async (t) => {
  const f = await setup(t, { animate: true });
  f.$("#other").trigger("mousedown");
  f.$(".accordion-body").finish();
  await f.frame();
  assert.equal(f.scrolls.length, 0);
});

test("reduced motion disables animations and preserves existing focus and theme styles", async (t) => {
  const f = await setup(t, { animate: true, reducedMotion: true, content: '<h4 id="ziel" tabindex="0" style="scroll-margin-top: 150px !important">Target</h4>' });
  await f.frame();
  assert.equal(f.$(".accordion-body:animated").length, 0);
  assert.equal(f.scrolls[0].options.behavior, "instant");
  assert.equal(f.scrolls[0].marginTop, "150px", "larger theme margins are respected");
  assert.equal(f.scrolls[0].target.style.scrollMarginTop, "150px");
  assert.equal(f.scrolls[0].target.style.getPropertyPriority("scroll-margin-top"), "important");
  f.document.getElementById("outside-link").focus();
  assert.equal(f.document.getElementById("ziel").getAttribute("tabindex"), "0");
});

test("the shipped minified script reveals and focuses an encoded content anchor", async (t) => {
  const f = await setup(t, {
    hash: "#%C3%BCberblick",
    content: '<h4 id="überblick">Überblick</h4>',
    source: fs.readFileSync(path.resolve(__dirname, "../../assets/js/accordion/rrze-accordion.min.js"), "utf8"),
  });
  await f.frame();
  assert.equal(f.$("#fach-section, #panel_2").filter(":visible").length, 2);
  assert.equal(f.scrolls[0].target.id, "überblick");
  assert.equal(f.document.activeElement.id, "überblick");
});
