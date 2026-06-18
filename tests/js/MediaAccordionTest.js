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
