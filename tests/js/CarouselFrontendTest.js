const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");
const assert = require("node:assert/strict");
const { JSDOM } = require("jsdom");

const carouselScript = fs.readFileSync(path.resolve(__dirname, "../../assets/js/carousel/rrze-carousel.js"), "utf8");

const cardScript = fs.readFileSync(path.resolve(__dirname, "../../assets/js/info-card/rrze-info-card.js"), "utf8");

/**
 * Builds only the DOM hooks used by the frontend script; PHP output is tested separately.
 *
 * @param {string} id Unique carousel ID.
 * @returns {string} Three cards: passive, linked, and with a dialog.
 */
function carouselMarkup(id) {
  return `<section id="${id}" class="rrze-elements-blocks__carousel">
    <div class="rrze-elements-blocks__carousel-content"><ul>
      <li class="rrze-elements-blocks__info-card rrze-elements-blocks__carousel-content-list-item" data-card-has-action="false">Passive</li>
      <li class="rrze-elements-blocks__info-card rrze-elements-blocks__carousel-content-list-item" data-card-has-action="true">
        <a class="rrze-elements-blocks__carousel_feature_card_link" href="/project">Project</a>
      </li>
      <li class="rrze-elements-blocks__info-card rrze-elements-blocks__carousel-content-list-item" data-card-has-action="true">
        <button type="button" class="rrze-elements-blocks__carousel_feature_card_link" aria-controls="${id}-dialog">Details</button>
        <dialog id="${id}-dialog" class="rrze-elements-blocks-fullscreen-modal">
          <div data-modal-overlay>
            <div class="rrze-elements-blocks-modal-content" tabindex="-1">
              <button class="rrze-elements-blocks-close-modal">Close</button>
              <p>Dialog content</p>
              <button class="rrze-elements-blocks-close-modal">Close again</button>
            </div>
          </div>
        </dialog>
      </li>
    </ul></div>
    <button type="button" class="rrze-elements-blocks_carousel_navigation_button">Previous</button>
    <button type="button" class="rrze-elements-blocks_carousel_navigation_button">Next</button>
  </section>`;
}

/**
 * Runs the real script with controllable layout, animations and native-dialog substitutes.
 * jsdom has no layout engine or showModal/close implementation.
 *
 * @param {import('node:test').TestContext} t Test cleanup owner.
 * @param {number} visibleWidth Simulated viewport width of each carousel.
 * @param {boolean} standalone Whether to run only the card script without GSAP or a carousel.
 * @returns {Promise<object>} DOM plus animation completion and carousel access helpers.
 */
async function setup(t, visibleWidth = 300, standalone = false) {
  const dom = new JSDOM(carouselMarkup("first") + carouselMarkup("second"), {
    runScripts: "outside-only", url: "https://example.com",
  });
  t.after(() => dom.window.close());
  const { window } = dom;
  const { document } = window;
  // Let jsdom's automatic ready event finish before initializing the script once.
  await new Promise((resolve) => window.addEventListener("load", resolve, { once: true }));
  const animations = [];
  window.ScrollToPlugin = {};
  window.gsap = {
    registerPlugin() {},
    set() {},
    fromTo() {},
    to(target, options) {
      const animation = { target, options, killed: false };
      animations.push(animation);
      return { kill() { animation.killed = true; } };
    },
  };
  for (const scroller of document.querySelectorAll(".rrze-elements-blocks__carousel-content")) {
    Object.defineProperty(scroller, "clientWidth", { value: visibleWidth, configurable: true });
    Object.defineProperty(scroller, "scrollWidth", { value: 660 });
    [...scroller.querySelectorAll("li")].forEach((item, index) => {
      // A nonzero starting offset catches accidental assumptions about the page origin.
      Object.defineProperty(item, "offsetLeft", { value: 40 + index * 220 });
    });
  }
  for (const dialog of document.querySelectorAll("dialog")) {
    dialog.showModal = () => { dialog.open = true; };
    dialog.close = () => { dialog.open = false; };
  }
  if (standalone) {
    const content = document.querySelector('[aria-controls]').closest('li');
    const card = document.createElement('div');
    card.className = 'rrze-elements-blocks__info-card';
    card.append(...content.childNodes);
    document.body.replaceChildren(card);
    delete window.gsap;
    delete window.ScrollToPlugin;
  } else {
    window.eval(carouselScript);
  }
  window.eval(cardScript);
  document.dispatchEvent(new window.Event("DOMContentLoaded"));

  return {
    window, document, animations,
    /** @returns {void} Completes queued GSAP effects without waiting for animation time. */
    finishAnimations() {
      for (const { target, options, killed } of animations.splice(0)) {
        if (killed) continue;
        if (options.scrollTo) target.scrollLeft = options.scrollTo.x;
        options.onUpdate?.();
        options.onComplete?.();
      }
    },
    /** @param {string} id Carousel ID. @returns {object} Relevant controls and content. */
    carousel(id = "first") {
      const root = document.getElementById(id);
      const [previous, next] = root.querySelectorAll(".rrze-elements-blocks_carousel_navigation_button");
      return {
        root, previous, next,
        scroller: root.querySelector(".rrze-elements-blocks__carousel-content"),
        trigger: root.querySelector('[aria-controls]'),
        dialog: root.querySelector("dialog"),
        panel: root.querySelector(".rrze-elements-blocks-modal-content"),
        overlay: root.querySelector("[data-modal-overlay]"),
      };
    },
  };
}

test("standalone dialogs work without carousel scripts or animation libraries", async (t) => {
  const fixture = await setup(t, 300, true);
  const trigger = fixture.document.querySelector('[aria-controls]');
  const dialog = fixture.document.querySelector('dialog');
  trigger.click();
  assert.equal(dialog.open, true);
  assert.equal(fixture.document.activeElement, dialog.querySelector('[tabindex]'));
  dialog.querySelector('button').click();
  assert.equal(dialog.open, false);
  assert.equal(fixture.document.activeElement, trigger);
  assert.equal(fixture.document.querySelector('.rrze-elements-blocks__carousel'), null);
});

test("carousel navigation advances by cards and stops at both ends without autoplay", async (t) => {
  const fixture = await setup(t);
  const { previous, next, scroller } = fixture.carousel();
  assert.equal(previous.disabled, true);
  assert.equal(next.disabled, false);
  assert.equal(fixture.animations.length, 0);

  next.click();
  assert.equal(next.disabled, true, "navigation waits for the ongoing movement");
  fixture.finishAnimations();
  assert.equal(scroller.scrollLeft, 220);
  assert.equal(previous.disabled, false);
  assert.equal(next.disabled, false);

  next.click();
  fixture.finishAnimations();
  assert.equal(scroller.scrollLeft, 360, "last card aligns with the right edge");
  assert.equal(next.disabled, true);
  previous.click();
  fixture.finishAnimations();
  assert.equal(scroller.scrollLeft, 220);
  previous.click();
  fixture.finishAnimations();
  assert.equal(scroller.scrollLeft, 0);
  assert.equal(previous.disabled, true);
});

test("manual scrolling updates controls and one carousel never moves another", async (t) => {
  const fixture = await setup(t);
  const first = fixture.carousel();
  const second = fixture.carousel("second");
  first.scroller.scrollLeft = 200;
  first.scroller.dispatchEvent(new fixture.window.Event("scroll"));
  assert.equal(first.previous.disabled, false);
  first.next.click();
  fixture.finishAnimations();
  assert.equal(first.scroller.scrollLeft, 360);
  assert.equal(second.scroller.scrollLeft, 0);
  assert.equal(second.previous.disabled, true);
  assert.equal(second.next.disabled, false);
});

test("carousels without overflow disable both navigation buttons", async (t) => {
  const fixture = await setup(t, 700);
  const { previous, next } = fixture.carousel();
  assert.equal(previous.disabled, true);
  assert.equal(next.disabled, true);
});

test("resizing recalculates the scroll boundary", async (t) => {
  const fixture = await setup(t);
  const { scroller, next } = fixture.carousel();
  Object.defineProperty(scroller, "clientWidth", { value: 600, configurable: true });
  // Resolve the resize debounce immediately; animation timing is outside this test.
  t.mock.method(fixture.window, "setTimeout", (callback) => { callback(); return 1; });
  fixture.window.dispatchEvent(new fixture.window.Event("resize"));
  next.click();
  fixture.finishAnimations();
  assert.equal(scroller.scrollLeft, 60);
  assert.equal(next.disabled, true);
});

test("opening details focuses and resets only the selected card's dialog", async (t) => {
  const fixture = await setup(t);
  const { trigger, dialog, panel, overlay } = fixture.carousel();
  panel.scrollTop = 120;
  overlay.scrollTop = 240;
  const click = new fixture.window.MouseEvent("click", { bubbles: true, cancelable: true });
  trigger.dispatchEvent(click);
  assert.equal(click.defaultPrevented, true);
  assert.equal(dialog.open, true);
  assert.equal(fixture.document.activeElement, panel);
  assert.equal(panel.scrollTop, 0);
  assert.equal(overlay.scrollTop, 0);
  assert.equal(fixture.carousel("second").dialog.open, false);
  panel.querySelector("p").click();
  fixture.finishAnimations();
  assert.equal(dialog.open, true, "clicks inside the content must not close the dialog");
});

for (const action of ["first close button", "last close button", "backdrop", "Escape"]) {
  test(`card dialog closes through ${action}`, async (t) => {
    const fixture = await setup(t);
    const { trigger, dialog, overlay } = fixture.carousel();
    trigger.click();
    if (action === "backdrop") overlay.click();
    else if (action === "Escape") {
      const cancel = new fixture.window.Event("cancel", { cancelable: true });
      dialog.dispatchEvent(cancel);
      assert.equal(cancel.defaultPrevented, true, "the script completes its exit animation first");
    } else {
      const buttons = dialog.querySelectorAll("button");
      buttons[action === "first close button" ? 0 : 1].click();
    }
    fixture.finishAnimations();
    assert.equal(dialog.open, false);
  });
}

test("link cards keep native navigation instead of opening a dialog", async (t) => {
  const fixture = await setup(t);
  const link = fixture.carousel().root.querySelector('a[href="/project"]');
  let intercepted;
  link.addEventListener("click", (event) => {
    intercepted = event.defaultPrevented;
    event.preventDefault(); // Stop jsdom navigation after observing the real handler.
  });
  link.click();
  assert.equal(intercepted, false);
  assert.equal(fixture.carousel().dialog.open, false);
});
