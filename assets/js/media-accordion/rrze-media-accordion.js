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
  const mobileSlotSelector = "[data-media-accordion-mobile-slot]";
  const mobileMediaQuery = "(max-width: 1100px)";

  const getImageData = (element) => ({
    id: Number(element.dataset.mediaAccordionImageId) || 0,
    url: element.dataset.mediaAccordionImageUrl || "",
    alt: element.dataset.mediaAccordionImageAlt || "",
    caption: element.dataset.mediaAccordionImageCaption || "",
  });

  const getLayout = (wrapper) =>
    Array.from(wrapper.children).find(
      (child) =>
        child instanceof HTMLElement &&
        child.classList.contains("media-accordion"),
    ) || wrapper;

  const getDesktopMedia = (wrapper) => {
    const layout = getLayout(wrapper);

    return Array.from(layout.children).find(
      (child) =>
        child instanceof HTMLElement &&
        child.matches(mediaSelector),
    ) || null;
  };

  const imageDataMatches = (element, imageData) => {
    const elementImageData = getImageData(element);

    return (
      elementImageData.id === imageData.id &&
      elementImageData.url === imageData.url &&
      elementImageData.alt === imageData.alt &&
      elementImageData.caption === imageData.caption
    );
  };

  const findImageTemplate = (wrapper, imageData) => {
    const layout = getLayout(wrapper);

    return Array.from(layout.children).find(
      (child) =>
        child instanceof Element &&
        child.matches(templateSelector) &&
        imageDataMatches(child, imageData),
    ) || null;
  };

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

  const getDirectChild = (element, className) =>
    Array.from(element.children).find(
      (child) =>
        child instanceof HTMLElement && child.classList.contains(className),
    ) || null;

  const getAccordionInner = (toggle) => {
    const group = toggle.closest(".accordion-group");

    if (!(group instanceof HTMLElement)) {
      return null;
    }

    const body = getDirectChild(group, "accordion-body");

    return body ? getDirectChild(body, "accordion-inner") : null;
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

  const createMobileMedia = (wrapper, imageData) => {
    const template = findImageTemplate(wrapper, imageData);
    let media = template ? getTemplateMedia(template) : null;

    if (!(media instanceof HTMLElement)) {
      const desktopMedia = getDesktopMedia(wrapper);

      if (!(desktopMedia instanceof HTMLElement)) {
        return null;
      }

      media = desktopMedia.cloneNode(true);
      updateImageElement(media, imageData);
    }

    media.hidden = false;
    media.classList.remove("is-empty", "media-accordion__media");
    media.classList.add("media-accordion__mobile-media");
    media.dataset.mediaAccordionMobileMedia = "";

    return media;
  };

  const renderMobileImages = (wrapper) => {
    let hasMobileImages = false;

    wrapper.querySelectorAll(toggleSelector).forEach((toggle) => {
      if (
        !(toggle instanceof HTMLElement) ||
        toggle.closest(wrapperSelector) !== wrapper
      ) {
        return;
      }

      const inner = getAccordionInner(toggle);

      if (!inner) {
        return;
      }

      const imageData = getImageData(toggle);
      const existingSlot = getDirectChild(
        inner,
        "media-accordion__mobile-slot",
      );

      if (!imageData.url) {
        existingSlot?.remove();
        return;
      }

      const media = createMobileMedia(wrapper, imageData);

      if (!media) {
        return;
      }

      const slot = existingSlot || document.createElement("div");
      slot.className = "media-accordion__mobile-slot";
      slot.dataset.mediaAccordionMobileSlot = "";
      slot.replaceChildren(media);

      if (!existingSlot) {
        inner.append(slot);
      }

      hasMobileImages = true;
    });

    wrapper.classList.toggle(
      "has-mobile-accordion-images",
      hasMobileImages,
    );
  };

  const removeMobileImages = (wrapper) => {
    wrapper.querySelectorAll(mobileSlotSelector).forEach((slot) => {
      if (
        slot instanceof HTMLElement &&
        slot.closest(wrapperSelector) === wrapper
      ) {
        slot.remove();
      }
    });

    wrapper.classList.remove("has-mobile-accordion-images");
  };

  const updateImage = (wrapper, toggle) => {
    const media = getDesktopMedia(wrapper);

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
    const mediaQuery = typeof window.matchMedia === "function"
      ? window.matchMedia(mobileMediaQuery)
      : null;
    const syncMobileImages = () => {
      if (!mediaQuery || mediaQuery.matches) {
        renderMobileImages(wrapper);
      } else {
        removeMobileImages(wrapper);
      }
    };

    syncMobileImages();

    if (mediaQuery) {
      if (typeof mediaQuery.addEventListener === "function") {
        mediaQuery.addEventListener("change", syncMobileImages);
      } else if (typeof mediaQuery.addListener === "function") {
        mediaQuery.addListener(syncMobileImages);
      }
    }

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
