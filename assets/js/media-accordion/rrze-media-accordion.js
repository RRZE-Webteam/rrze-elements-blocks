/**
 * Switches the media-accordion image when one of its accordion items opens.
 */
(() => {
  "use strict";

  const wrapperSelector = ".wp-block-rrze-elements-media-accordion";
  const toggleSelector = "button.accordion-toggle";
  const mediaSelector = "[data-media-accordion-media]";
  const imageSelector = "[data-media-accordion-image]";
  const captionSelector = "figcaption";
  const templateSelector = "template[data-media-accordion-template]";

  const getImageData = (element) => ({
    id: Number(element.dataset.mediaAccordionImageId) || 0,
    url: element.dataset.mediaAccordionImageUrl || "",
    alt: element.dataset.mediaAccordionImageAlt || "",
    caption: element.dataset.mediaAccordionImageCaption || "",
  });

  const imageDataMatches = (element, imageData) => {
    const elementImageData = getImageData(element);

    return (
      elementImageData.id === imageData.id &&
      elementImageData.url === imageData.url &&
      elementImageData.alt === imageData.alt &&
      elementImageData.caption === imageData.caption
    );
  };

  const findImageTemplate = (wrapper, imageData) =>
    Array.from(wrapper.querySelectorAll(templateSelector)).find((template) =>
      imageDataMatches(template, imageData),
    );

  const getTemplateMedia = (template) => {
    if (
      typeof HTMLTemplateElement === "undefined" ||
      !(template instanceof HTMLTemplateElement)
    ) {
      return null;
    }

    const media = template.content.querySelector(mediaSelector);

    return media instanceof HTMLElement
      ? media.cloneNode(true)
      : null;
  };

  const updateImageElement = (media, imageData) => {
    const image = media.querySelector(imageSelector);

    if (!image) {
      return;
    }

    image.classList.forEach((className) => {
      if (/^wp-image-\d+$/.test(className)) {
        image.classList.remove(className);
      }
    });

    // WordPress adds responsive image candidates after rendering. They must be
    // removed before changing src or the browser can keep showing the old image.
    image.removeAttribute("srcset");
    image.removeAttribute("sizes");

    if (!imageData.url) {
      image.hidden = true;
      image.removeAttribute("src");
      image.alt = "";
      media.classList.add("is-empty");
      return;
    }

    image.src = imageData.url;
    image.alt = imageData.alt;
    image.hidden = false;
    media.classList.remove("is-empty");
    media.dataset.mediaAccordionImageId = String(imageData.id);
    media.dataset.mediaAccordionImageUrl = imageData.url;
    media.dataset.mediaAccordionImageAlt = imageData.alt;
    media.dataset.mediaAccordionImageCaption = imageData.caption;

    if (imageData.id > 0) {
      image.classList.add(`wp-image-${imageData.id}`);
    }

    let caption = media.querySelector(captionSelector);

    if (!imageData.caption) {
      caption?.remove();
      return;
    }

    if (!caption) {
      caption = document.createElement("figcaption");
      caption.className = "wp-element-caption";
      media.append(caption);
    }

    caption.innerHTML = imageData.caption;
  };

  const updateImage = (wrapper, toggle) => {
    const media = wrapper.querySelector(mediaSelector);

    if (!media) {
      return;
    }

    const imageData = getImageData(toggle);

    if (!imageData.url) {
      media.hidden = true;
      media.classList.add("is-empty");
      return;
    }

    if (imageDataMatches(media, imageData)) {
      media.hidden = false;
      media.classList.remove("is-empty");
      return;
    }

    const template = findImageTemplate(wrapper, imageData);
    const templateMedia = template ? getTemplateMedia(template) : null;

    if (templateMedia instanceof HTMLElement) {
      templateMedia.hidden = false;
      templateMedia.classList.remove("is-empty");
      media.replaceWith(templateMedia);
      return;
    }

    media.hidden = false;
    updateImageElement(media, imageData);
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
