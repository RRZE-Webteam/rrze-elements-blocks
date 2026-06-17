/**
 * Switches the media-accordion image when one of its accordion items opens.
 */
(() => {
  "use strict";

  const wrapperSelector = ".wp-block-rrze-elements-media-accordion";
  const toggleSelector = "button.accordion-toggle";

  const updateImage = (wrapper, toggle) => {
    const image = wrapper.querySelector("[data-media-accordion-image]");
    const media = wrapper.querySelector("[data-media-accordion-media]");

    if (!image || !media) {
      return;
    }

    const url = toggle.dataset.mediaAccordionImageUrl || "";
    const alt = toggle.dataset.mediaAccordionImageAlt || "";
    const imageId = Number(toggle.dataset.mediaAccordionImageId) || 0;

    image.classList.forEach((className) => {
      if (/^wp-image-\d+$/.test(className)) {
        image.classList.remove(className);
      }
    });

    // WordPress adds responsive image candidates after rendering. They must be
    // removed before changing src or the browser can keep showing the old image.
    image.removeAttribute("srcset");
    image.removeAttribute("sizes");

    if (!url) {
      image.hidden = true;
      image.removeAttribute("src");
      image.alt = "";
      media.classList.add("is-empty");
      return;
    }

    image.src = url;
    image.alt = alt;
    image.hidden = false;
    media.classList.remove("is-empty");

    if (imageId > 0) {
      image.classList.add(`wp-image-${imageId}`);
    }
  };

  const initialize = (wrapper) => {
    const getToggle = (event) => {
      const target = event.target;

      return target instanceof Element
        ? target.closest(toggleSelector)
        : null;
    };

    const handleMouseDown = (event) => {
      const toggle = getToggle(event);

      if (toggle && wrapper.contains(toggle)) {
        updateImage(wrapper, toggle);
      }
    };

    const handleKeyDown = (event) => {
      if (event.key !== " " && event.keyCode !== 32) {
        return;
      }

      const toggle = getToggle(event);

      if (toggle && wrapper.contains(toggle)) {
        updateImage(wrapper, toggle);
      }
    };

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        const toggle = mutation.target;

        if (
          toggle instanceof HTMLElement &&
          toggle.matches(toggleSelector) &&
          toggle.getAttribute("aria-expanded") === "true"
        ) {
          updateImage(wrapper, toggle);
        }
      });
    });

    observer.observe(wrapper, {
      attributes: true,
      attributeFilter: ["aria-expanded"],
      subtree: true,
    });

    const activeToggle = wrapper.querySelector(
      `${toggleSelector}[aria-expanded="true"], ${toggleSelector}.active`,
    );

    if (activeToggle) {
      updateImage(wrapper, activeToggle);
    }

    // The accordion opens on mousedown and Space, not on click.
    wrapper.addEventListener("mousedown", handleMouseDown, true);
    wrapper.addEventListener("keydown", handleKeyDown, true);
  };

  const initializeAll = () => {
    document.querySelectorAll(wrapperSelector).forEach(initialize);
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializeAll);
  } else {
    initializeAll();
  }
})();
