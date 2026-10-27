const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");
const assert = require("node:assert/strict");
const { JSDOM } = require("jsdom");

// Exercise the shipped bundle, including changes introduced by minification.
const script = fs.readFileSync(path.resolve(__dirname, "../../assets/js/content-slider/rrze-content-slider.min.js"), "utf8");

/**
 * Builds independent sliders with real link and dialog identity constraints.
 *
 * @param {string} id Instance prefix.
 * @param {number} count Number of original cards.
 * @returns {string} Minimal renderer contract.
 */
function markup(id, count) {
  return `<section id="${id}" class="rrze-elements-blocks__content-slider">
    <div class="rrze-elements-blocks__content-slider-viewport" tabindex="0">
      <div class="rrze-elements-blocks__content-slider-track">
        ${Array.from({ length: count }, (_, i) => `<div class="rrze-elements-blocks__info-card" id="${id}-card-${i}">
          <a href="/${i}">Link ${i}</a><button aria-controls="${id}-dialog-${i}">Open</button>
          <dialog id="${id}-dialog-${i}"><button>Close</button><p>Details ${i}</p></dialog>
        </div>`).join("")}
      </div>
    </div>
    <div class="rrze-elements-blocks__content-slider-navigation">
      <button data-slider-direction="-1">Previous</button>
      <span class="rrze-elements-blocks__content-slider-position"></span>
      <button data-slider-direction="1">Next</button>
    </div>
  </section>`;
}

/**
 * Runs production code with geometry and animation timing controlled by the test.
 *
 * @param {import('node:test').TestContext} t Cleanup owner.
 * @param {object} options Optional count, reduced motion and missing GSAP cases.
 * @returns {Promise<object>} Real DOM and layout/animation controls.
 */
async function setup(t, { count = 3, reduced = false, gsap = true } = {}) {
  const dom = new JSDOM(markup("first", count) + markup("second", 3), { runScripts: "outside-only", url: "https://example.com" });
  t.after(() => dom.window.close());
  const { window } = dom;
  await new Promise((resolve) => window.addEventListener("load", resolve, { once: true }));
  let width = 1000;
  const animations = [];
  const observers = [];
  window.matchMedia = () => ({ matches: reduced });
  window.ResizeObserver = class {
    constructor(callback) { observers.push(callback); }
    observe() {}
  };
  if (gsap) {
    window.ScrollToPlugin = {};
    window.gsap = {
      registerPlugin() {},
      to(target, options) {
        const animation = { target, options, killed: false, kill() { this.killed = true; } };
        animations.push(animation);
        return animation;
      },
    };
  }
  // Layout is computed from the current DOM order, so preview insertion is exercised too.
  window.HTMLElement.prototype.getBoundingClientRect = function () {
    if (this.classList.contains("rrze-elements-blocks__info-card")) {
      const index = Array.from(this.parentNode.children).indexOf(this);
      const viewport = this.parentNode.parentNode;
      const size = Math.min(960, width * .8);
      const left = (width - size) / 2 + index * (size + 24) - viewport.scrollLeft;
      return { left, right: left + size, width: size, top: 0, bottom: 480 };
    }
    return { left: 0, width };
  };
  Object.defineProperty(window.HTMLElement.prototype, "clientWidth", { get: () => width });
  window.HTMLElement.prototype.scrollTo = function ({ left }) { this.scrollLeft = left; };
  window.eval(script);
  return {
    window,
    animations,
    get root() { return window.document.getElementById("first"); },
    get viewport() { return this.root.querySelector(".rrze-elements-blocks__content-slider-viewport"); },
    get status() { return this.root.querySelector(".rrze-elements-blocks__content-slider-position").textContent; },
    original(index) { return window.document.getElementById(`first-card-${index}`); },
    next() { this.root.querySelector('[data-slider-direction="1"]').click(); },
    previous() { this.root.querySelector('[data-slider-direction="-1"]').click(); },
    finish() {
      const animation = animations.at(-1);
      assert.ok(animation && !animation.killed);
      animation.target.scrollLeft = animation.options.scrollTo.x;
      animation.options.onComplete();
    },
    resize(value) { width = value; observers.forEach((callback) => callback()); },
  };
}

test("loop previews never duplicate dialog content, IDs or accessible controls", async (t) => {
  const f = await setup(t);
  const originals = [...f.root.querySelectorAll(".rrze-elements-blocks__info-card:not([data-slider-clone])")];
  assert.deepEqual(originals.map((card) => card.id), ["first-card-0", "first-card-1", "first-card-2"]);
  const copies = f.root.querySelectorAll("[data-slider-clone]");
  assert.equal(copies.length, 4);
  for (const copy of copies) {
    assert.equal(copy.getAttribute("aria-hidden"), "true");
    assert.ok(copy.hasAttribute("inert"));
    assert.equal(copy.querySelectorAll("[id], dialog, [aria-controls]").length, 0);
    assert.equal(copy.id, "");
  }
  assert.equal(f.root.querySelectorAll("dialog").length, 3);
  assert.equal(f.status, "1 / 3");
  f.window.eval(script);
  assert.equal(f.root.querySelectorAll("[data-slider-clone]").length, 4, "initialization is idempotent");
});

test("both loop boundaries animate one step and normalize to the original", async (t) => {
  const f = await setup(t);
  const initial = f.viewport.scrollLeft;
  f.previous();
  assert.equal(f.animations.at(-1).options.scrollTo.x, initial - 824);
  f.finish();
  assert.equal(f.status, "3 / 3");
  assert.equal(f.viewport.scrollLeft, initial + 2 * 824);
  f.next();
  assert.equal(f.animations.at(-1).options.scrollTo.x, initial + 3 * 824);
  f.finish();
  assert.equal(f.viewport.scrollLeft, initial);
  assert.equal(f.status, "1 / 3");
  assert.equal(f.window.document.querySelector("#second .rrze-elements-blocks__content-slider-position").textContent, "1 / 3");
});

test("touch settling normalizes previews; resizing preserves the current logical card", async (t) => {
  const f = await setup(t);
  f.viewport.scrollLeft -= 824;
  f.viewport.dispatchEvent(new f.window.Event("scrollend"));
  assert.equal(f.status, "3 / 3");
  f.resize(600);
  const rect = f.original(2).getBoundingClientRect();
  assert.equal(rect.left + rect.width / 2, 300);
  f.next();
  assert.equal(f.animations.at(-1).options.scrollTo.x - f.viewport.scrollLeft, 504);
  f.finish();
  assert.equal(f.status, "1 / 3");
});

test("keyboard navigation belongs to the viewport and focus centers original links", async (t) => {
  const f = await setup(t);
  const key = (target, name) => target.dispatchEvent(new f.window.KeyboardEvent("keydown", { key: name, bubbles: true, cancelable: true }));
  key(f.viewport, "End");
  f.finish();
  assert.equal(f.status, "3 / 3");
  key(f.original(2).querySelector("button"), "ArrowLeft");
  assert.equal(f.animations.length, 1, "nested controls keep their keyboard behavior");
  f.original(0).querySelector("a").focus();
  assert.equal(f.status, "1 / 3");
  assert.equal(f.window.document.activeElement, f.original(0).querySelector("a"));
  key(f.viewport, "ArrowLeft");
  f.finish();
  assert.equal(f.status, "3 / 3");
});

test("a gesture interrupts GSAP and settles on the user's chosen card", async (t) => {
  const f = await setup(t);
  f.next();
  f.viewport.dispatchEvent(new f.window.Event("wheel"));
  assert.equal(f.animations[0].killed, true);
  assert.equal(f.viewport.classList.contains("is-animating"), false);
  f.viewport.scrollLeft += 2 * 824;
  f.viewport.dispatchEvent(new f.window.Event("scrollend"));
  assert.equal(f.status, "3 / 3");
});

test("clicking a partial linked card navigates first, even when pointer focus precedes the click", async (t) => {
  const f = await setup(t);
  const link = f.original(1).querySelector("a");
  const rect = f.original(1).getBoundingClientRect();
  const pointer = { bubbles: true, cancelable: true, clientX: rect.left + 5, clientY: 100, detail: 1 };
  link.dispatchEvent(new f.window.MouseEvent("pointerdown", pointer));
  link.focus();
  assert.equal(f.status, "1 / 3", "mouse focus alone must not activate the link's card");
  f.window.dispatchEvent(new f.window.MouseEvent("pointerup", pointer));
  const click = new f.window.MouseEvent("click", pointer);
  link.dispatchEvent(click);
  assert.equal(click.defaultPrevented, true);
  f.finish();
  assert.equal(f.status, "2 / 3");
  let prevented;
  link.addEventListener("click", (event) => { prevented = event.defaultPrevented; event.preventDefault(); });
  link.dispatchEvent(new f.window.MouseEvent("click", { ...pointer, clientX: 500 }));
  assert.equal(prevented, false, "the centered card keeps its actual link action");
});

test("inert previews navigate by their visible geometry and only one card is highlighted", async (t) => {
  const f = await setup(t);
  f.viewport.dispatchEvent(new f.window.MouseEvent("click", { bubbles: true, cancelable: true, detail: 1, clientX: 30, clientY: 100 }));
  assert.equal(f.root.querySelectorAll("[data-slider-active]").length, 1);
  assert.ok(f.root.querySelector("[data-slider-active]").hasAttribute("data-slider-clone"));
  f.finish();
  assert.equal(f.status, "3 / 3");
  assert.equal(f.root.querySelector("[data-slider-active]"), f.original(2));
});

test("wide screens gain enough preview cards without duplicating originals or dialog IDs", async (t) => {
  const f = await setup(t, { count: 2 });
  f.resize(3800);
  assert.equal(f.root.querySelectorAll("[data-slider-clone]").length, 8);
  assert.equal(f.root.querySelectorAll("dialog").length, 2);
  assert.equal(f.root.querySelectorAll("[data-slider-active]").length, 1);
  assert.equal(f.original(0).getBoundingClientRect().left + 480, 1900);
  f.previous();
  f.finish();
  assert.equal(f.status, "2 / 2");
  f.resize(1000);
  assert.equal(f.root.querySelectorAll("[data-slider-clone]").length, 4);
  assert.equal(f.status, "2 / 2");
});

for (const options of [{ reduced: true }, { gsap: false }, { count: 2 }]) {
  test(`navigation works with ${JSON.stringify(options)}`, async (t) => {
    const f = await setup(t, options);
    f.previous();
    if (f.animations.length) f.finish();
    assert.equal(f.status, `${options.count ?? 3} / ${options.count ?? 3}`);
    f.next();
    if (f.animations.length) f.finish();
    assert.equal(f.status, `1 / ${options.count ?? 3}`);
    if (options.reduced || options.gsap === false) assert.equal(f.animations.length, 0);
  });
}

test("one card needs no copies or movement; an empty slider remains unenhanced", async (t) => {
  const f = await setup(t, { count: 1 });
  assert.equal(f.root.querySelectorAll("[data-slider-clone]").length, 0);
  assert.equal(f.root.dataset.sliderCount, "1");
  f.next();
  assert.equal(f.animations.length, 0);
  assert.equal(f.status, "1 / 1");
  const empty = await setup(t, { count: 0 });
  assert.equal(empty.root.hasAttribute("data-slider-ready"), false);
});
