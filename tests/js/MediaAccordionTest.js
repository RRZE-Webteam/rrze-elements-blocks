const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");
const assert = require("node:assert/strict");
const { JSDOM } = require("jsdom");

const script = fs.readFileSync(
  path.resolve(
    __dirname,
    "../../assets/js/media-accordion/rrze-media-accordion.js",
  ),
  "utf8",
);

test("switches responsive WordPress images", () => {
  const dom = new JSDOM(`
    <div class="wp-block-rrze-elements-media-accordion">
      <button
        class="accordion-toggle"
        data-media-accordion-image-id="256"
        data-media-accordion-image-url="https://example.com/second.webp"
        data-media-accordion-image-alt="Second image"
        data-media-accordion-image-caption="Rendered caption"
      >Second</button>
      <figure data-media-accordion-media>
        <img
          class="media-accordion__image wp-image-212"
          data-media-accordion-image
          src="https://example.com/first.jpg"
          srcset="https://example.com/first-small.jpg 300w, https://example.com/first.jpg 1200w"
          sizes="100vw"
          alt="First image"
        >
      </figure>
    </div>
  `, {
    runScripts: "outside-only",
  });

  dom.window.eval(script);
  dom.window.document.dispatchEvent(new dom.window.Event("DOMContentLoaded"));

  const toggle = dom.window.document.querySelector(".accordion-toggle");
  const image = dom.window.document.querySelector("[data-media-accordion-image]");

  toggle.dispatchEvent(new dom.window.MouseEvent("mousedown", { bubbles: true }));

  assert.equal(image.getAttribute("src"), "https://example.com/second.webp");
  assert.equal(image.getAttribute("alt"), "Second image");
  assert.equal(image.hasAttribute("srcset"), false);
  assert.equal(image.hasAttribute("sizes"), false);
  assert.equal(image.classList.contains("wp-image-212"), false);
  assert.equal(image.classList.contains("wp-image-256"), true);
  assert.equal(
    dom.window.document.querySelector("figcaption").textContent,
    "Rendered caption",
  );
});

test("switches to rendered core image templates", () => {
  const dom = new JSDOM(`
    <div class="wp-block-rrze-elements-media-accordion">
      <button
        class="accordion-toggle"
        data-media-accordion-image-id="256"
        data-media-accordion-image-url="https://example.com/second.webp"
        data-media-accordion-image-alt="Second image"
        data-media-accordion-image-caption="Rendered caption"
      >Second</button>
      <figure
        class="wp-block-image size-large is-style-large has-overlay media-accordion__media"
        data-media-accordion-media
        data-media-accordion-image-id="212"
        data-media-accordion-image-url="https://example.com/first.jpg"
        data-media-accordion-image-alt="First image"
        data-media-accordion-image-caption=""
      >
        <img
          class="media-accordion__image wp-image-212"
          data-media-accordion-image
          src="https://example.com/first.jpg"
          alt="First image"
        >
      </figure>
      <template
        data-media-accordion-template
        data-media-accordion-image-id="256"
        data-media-accordion-image-url="https://example.com/second.webp"
        data-media-accordion-image-alt="Second image"
        data-media-accordion-image-caption="Rendered caption"
      >
        <figure
          class="wp-block-image size-large is-style-large has-overlay media-accordion__media"
          data-media-accordion-media
          data-media-accordion-image-id="256"
          data-media-accordion-image-url="https://example.com/second.webp"
          data-media-accordion-image-alt="Second image"
          data-media-accordion-image-caption="Rendered caption"
        >
          <img
            class="media-accordion__image wp-image-256"
            data-media-accordion-image
            src="https://example.com/second-large.webp"
            srcset="https://example.com/second-small.webp 300w, https://example.com/second-large.webp 1200w"
            sizes="100vw"
            alt="Second image"
          >
          <figcaption class="wp-element-caption">Rendered caption</figcaption>
        </figure>
      </template>
    </div>
  `, {
    runScripts: "outside-only",
  });

  dom.window.eval(script);
  dom.window.document.dispatchEvent(new dom.window.Event("DOMContentLoaded"));

  const toggle = dom.window.document.querySelector(".accordion-toggle");
  const initialMedia = dom.window.document.querySelector(
    "[data-media-accordion-media]",
  );

  toggle.dispatchEvent(new dom.window.MouseEvent("mousedown", { bubbles: true }));

  const media = dom.window.document.querySelector("[data-media-accordion-media]");
  const image = media.querySelector("[data-media-accordion-image]");

  assert.notEqual(media, initialMedia);
  assert.equal(image.getAttribute("src"), "https://example.com/second-large.webp");
  assert.equal(
    image.getAttribute("srcset"),
    "https://example.com/second-small.webp 300w, https://example.com/second-large.webp 1200w",
  );
  assert.equal(media.classList.contains("wp-block-image"), true);
  assert.equal(media.classList.contains("has-overlay"), true);
  assert.equal(media.querySelector("figcaption").textContent, "Rendered caption");
});

test("adds each image underneath its accordion text for mobile layouts", () => {
  const dom = new JSDOM(`
    <div class="wp-block-rrze-elements-media-accordion">
      <div class="media-accordion">
        <div class="media-accordion__accordions">
          <div class="accordion-group">
            <h3 class="accordion-heading">
              <button
                class="accordion-toggle"
                data-media-accordion-image-id="101"
                data-media-accordion-image-url="https://example.com/first.jpg"
                data-media-accordion-image-alt="First image"
                data-media-accordion-image-caption="First caption"
              >First</button>
            </h3>
            <div class="accordion-body">
              <div class="accordion-inner">
                <p>First accordion text</p>
              </div>
            </div>
          </div>
          <div class="accordion-group">
            <h3 class="accordion-heading">
              <button
                class="accordion-toggle"
                data-media-accordion-image-id="202"
                data-media-accordion-image-url="https://example.com/second.jpg"
                data-media-accordion-image-alt="Second image"
                data-media-accordion-image-caption="Second caption"
              >Second</button>
            </h3>
            <div class="accordion-body">
              <div class="accordion-inner">
                <p>Second accordion text</p>
              </div>
            </div>
          </div>
        </div>
        <figure
          class="wp-block-image media-accordion__media"
          data-media-accordion-media
          data-media-accordion-image-id="101"
          data-media-accordion-image-url="https://example.com/first.jpg"
          data-media-accordion-image-alt="First image"
          data-media-accordion-image-caption="First caption"
        >
          <img
            class="media-accordion__image wp-image-101"
            data-media-accordion-image
            src="https://example.com/first-large.jpg"
            alt="First image"
          >
          <figcaption class="wp-element-caption">First caption</figcaption>
        </figure>
        <template
          data-media-accordion-template
          data-media-accordion-image-id="101"
          data-media-accordion-image-url="https://example.com/first.jpg"
          data-media-accordion-image-alt="First image"
          data-media-accordion-image-caption="First caption"
        >
          <figure class="wp-block-image media-accordion__media" data-media-accordion-media>
            <img
              class="media-accordion__image wp-image-101"
              data-media-accordion-image
              src="https://example.com/first-large.jpg"
              alt="First image"
            >
            <figcaption class="wp-element-caption">First caption</figcaption>
          </figure>
        </template>
        <template
          data-media-accordion-template
          data-media-accordion-image-id="202"
          data-media-accordion-image-url="https://example.com/second.jpg"
          data-media-accordion-image-alt="Second image"
          data-media-accordion-image-caption="Second caption"
        >
          <figure class="wp-block-image media-accordion__media" data-media-accordion-media>
            <img
              class="media-accordion__image wp-image-202"
              data-media-accordion-image
              src="https://example.com/second-large.jpg"
              alt="Second image"
            >
            <figcaption class="wp-element-caption">Second caption</figcaption>
          </figure>
        </template>
      </div>
    </div>
  `, {
    runScripts: "outside-only",
  });

  dom.window.eval(script);
  dom.window.document.dispatchEvent(new dom.window.Event("DOMContentLoaded"));

  const wrapper = dom.window.document.querySelector(
    ".wp-block-rrze-elements-media-accordion",
  );
  const inners = wrapper.querySelectorAll(".accordion-inner");

  assert.equal(wrapper.classList.contains("has-mobile-accordion-images"), true);
  assert.equal(inners.length, 2);

  const firstSlot = inners[0].lastElementChild;
  const secondSlot = inners[1].lastElementChild;

  assert.equal(firstSlot.matches("[data-media-accordion-mobile-slot]"), true);
  assert.equal(secondSlot.matches("[data-media-accordion-mobile-slot]"), true);
  assert.equal(
    firstSlot.querySelector("img").getAttribute("src"),
    "https://example.com/first-large.jpg",
  );
  assert.equal(
    secondSlot.querySelector("img").getAttribute("src"),
    "https://example.com/second-large.jpg",
  );
  assert.equal(
    secondSlot.querySelector("figcaption").textContent,
    "Second caption",
  );
  assert.equal(
    firstSlot.querySelector("[data-media-accordion-mobile-media]") !== null,
    true,
  );
});

test("adds and removes mobile images when the viewport changes", () => {
  const dom = new JSDOM(`
    <div class="wp-block-rrze-elements-media-accordion">
      <div class="media-accordion">
        <div class="media-accordion__accordions">
          <div class="accordion-group">
            <h3 class="accordion-heading">
              <button
                class="accordion-toggle"
                data-media-accordion-image-id="101"
                data-media-accordion-image-url="https://example.com/first.jpg"
                data-media-accordion-image-alt="First image"
                data-media-accordion-image-caption=""
              >First</button>
            </h3>
            <div class="accordion-body">
              <div class="accordion-inner">
                <p>Accordion text</p>
              </div>
            </div>
          </div>
        </div>
        <figure
          class="wp-block-image media-accordion__media"
          data-media-accordion-media
          data-media-accordion-image-id="101"
          data-media-accordion-image-url="https://example.com/first.jpg"
          data-media-accordion-image-alt="First image"
          data-media-accordion-image-caption=""
        >
          <img data-media-accordion-image src="https://example.com/first.jpg" alt="First image">
        </figure>
      </div>
    </div>
  `, {
    runScripts: "outside-only",
  });

  let handleViewportChange = () => {};
  const mediaQuery = {
    matches: false,
    addEventListener: (_event, callback) => {
      handleViewportChange = callback;
    },
  };

  dom.window.matchMedia = () => mediaQuery;
  dom.window.eval(script);
  dom.window.document.dispatchEvent(new dom.window.Event("DOMContentLoaded"));

  const wrapper = dom.window.document.querySelector(
    ".wp-block-rrze-elements-media-accordion",
  );

  assert.equal(
    wrapper.querySelector("[data-media-accordion-mobile-slot]"),
    null,
  );
  assert.equal(wrapper.classList.contains("has-mobile-accordion-images"), false);

  mediaQuery.matches = true;
  handleViewportChange();

  assert.notEqual(
    wrapper.querySelector("[data-media-accordion-mobile-slot]"),
    null,
  );
  assert.equal(wrapper.classList.contains("has-mobile-accordion-images"), true);

  mediaQuery.matches = false;
  handleViewportChange();

  assert.equal(
    wrapper.querySelector("[data-media-accordion-mobile-slot]"),
    null,
  );
  assert.equal(wrapper.classList.contains("has-mobile-accordion-images"), false);
});
