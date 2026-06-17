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
});
