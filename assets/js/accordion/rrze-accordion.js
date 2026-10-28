/**
 * RRZE Elements Blocks - Accordion 1.0.5
 * Refactored and documented for efficiency and readability.
 * Uses jQuery for DOM manipulation and event handling.
 * Features include Anchor/Hash detection, Easier Search via Ctrl + F, and more
 */
const {__} = wp.i18n;

jQuery(document).ready(function ($) {
  /**
   * Initially hides all accordion bodies except those marked as open or should stay open,
   * and marks the corresponding toggles as active.
   */
  $(".accordion-body").not(".open, .stayopen").hide();
  $(".accordion-body.open").each(function () {
    $(this)
      .closest(".accordion-group")
      .find(".accordion-toggle")
      .first()
      .addClass("active");
  });

  /**
   * Checks if all items within an accordion are open to toggle the 'Expand All/Collapse All' button state.
   */
  $(".accordion").each(function () {
    const $accordion = $(this);
    const items = $accordion.find(".accordion-group");
    const openItems = items.find(".accordion-body.open");
    if (items.length === openItems.length) {
      $accordion
        .find("button.expand-all")
        .attr("data-status", "open")
        .data("status", "open")
        .html(__("Collapse All", "rrze-elements-blocks"));
    }
  });

  /**
   * Retrieves the target accordion ID from a button or link element.
   * @param {jQuery} $elem - The element that may contain a href or data-href attribute.
   * @return {string} The target selector for the accordion to be toggled.
   */
  function getAccordionTarget($elem) {
    return sanitizeSelector($elem.data("href") || $elem.attr("href"));
  }

  /**
   * Sanitizes a jQuery selector to prevent jQuery selector injection.
   * @param {string} selector - The selector to sanitize.
   * @return {string} The sanitized selector.
   */
  function sanitizeSelector(selector) {
    return selector.replace(/[^a-zA-Z0-9_\-#]/g, "");
  }

  /**
   * Toggles the visibility of an accordion's content.
   * @param {string} $accordion - The selector of the accordion whose visibility will be toggled.
   */
  function toggleAccordion($accordion) {
    const $group = $($accordion).closest(".accordion-group");
    const $directBody = $group.children(".accordion-body");
    const $directToggle = $group
      .children(".accordion-heading")
      .children(".accordion-toggle");
    const $otherGroups = $group.siblings();

    $otherGroups
      .children(".accordion-heading")
      .children(".accordion-toggle")
      .removeClass("active")
      .attr("aria-expanded", "false");
    $otherGroups
      .children(".accordion-body")
      .not(".accordion-body.stayopen")
      .slideUp();

    $directToggle
      .toggleClass("active")
      .attr("aria-expanded", function (_, attr) {
        return !(attr === "true");
      });
    $directBody.slideToggle();

    refreshSlickGallery($group);
  }

  /**
   * Refreshes the Slick Gallery within an accordion if it exists.
   * This is needed because changes in visibility can affect Slick's layout.
   * @param {jQuery} $group - The accordion group that may contain a Slick slider.
   */
  function refreshSlickGallery($group) {
    const $slick = $group.find(".slick-slider");
    if ($slick.length) {
      $slick.slick("refresh");
    }
  }

  let anchorNavigationId = 0;

  /**
   * Resolves a fragment as an ID or legacy named anchor, never as a CSS selector.
   * @param {string} hash - URL fragment, including its leading hash character.
   * @return {jQuery} The first matching target, or an empty collection.
   */
  function findAnchorTarget(hash) {
    if (!hash || hash === "#") {
      return $();
    }

    const identifier = hash.slice(1);
    let decodedIdentifier = identifier;
    try {
      decodedIdentifier = decodeURIComponent(identifier);
    } catch {
      // A malformed escape may still be part of a literal HTML ID.
    }

    const target = document.getElementById(identifier) || document.getElementById(decodedIdentifier);
    if (target) {
      return $(target);
    }

    for (const name of [identifier, decodedIdentifier]) {
      for (const namedTarget of document.getElementsByName(name)) {
        if (namedTarget.matches("a, div")) {
          return $(namedTarget);
        }
      }
    }

    // Keep historical panel_1_suffix / collapse_1_suffix links working.
    const legacyId = decodedIdentifier.match(/^(?:panel|collapse)_[^_]+/);
    return legacyId ? $(document.getElementById(legacyId[0])) : $();
  }

  /**
   * Finds the panel belonging to a toggle, panel anchor, or nested content anchor.
   * @param {jQuery} $target - Resolved fragment target.
   * @return {jQuery} The containing or directly controlled accordion body.
   */
  function getAnchorBody($target) {
    if ($target.is(".accordion-toggle, .accordion-heading")) {
      return $target.closest(".accordion-group").children(".accordion-body").first();
    }
    return $target.closest(".accordion-body");
  }

  /**
   * Moves keyboard focus without causing a second scroll or adding a tab stop.
   * @param {HTMLElement} target - Visible content anchor or accordion toggle.
   * @return {void}
   */
  function focusAnchor(target) {
    if (!target || typeof target.focus !== "function") {
      return;
    }
    target.focus({ preventScroll: true });
    // An <a name> can report tabIndex 0 without actually accepting focus.
    if (target.ownerDocument.activeElement !== target && !target.hasAttribute("tabindex")) {
      target.setAttribute("tabindex", "-1");
      /** Removes only the temporary focus attribute when navigation continues. */
      $(target).one("blur", function () {
        if (target.getAttribute("tabindex") === "-1") {
          target.removeAttribute("tabindex");
        }
      });
      target.focus({ preventScroll: true });
    }
  }

  /**
   * Scrolls an anchor below a gap of at least ten percent of the viewport height.
   * Larger theme margins and scroll-container padding remain effective.
   * @param {HTMLElement} target        - Visible heading or content anchor.
   * @param {boolean}     reducedMotion - Whether scrolling should be immediate.
   * @return {void}
   */
  function scrollToAnchor(target, reducedMotion) {
    const property = "scroll-margin-top";
    const previousMargin = target.style.getPropertyValue(property);
    const previousPriority = target.style.getPropertyPriority(property);
    const themeMargin = parseFloat(window.getComputedStyle(target).scrollMarginTop) || 0;
    const margin = Math.max(window.innerHeight * 0.1, themeMargin);

    target.style.setProperty(property, `${margin}px`, "important");
    try {
      target.scrollIntoView({
        behavior: reducedMotion ? "instant" : "smooth",
        block: "start",
      });
    } finally {
      // The browser calculates the destination synchronously, even for smooth scrolling.
      if (previousMargin) {
        target.style.setProperty(property, previousMargin, previousPriority);
      } else {
        target.style.removeProperty(property);
      }
    }
  }

  /**
   * Opens all required panels before scrolling to and focusing the actual target.
   * @param {jQuery} $target - Content anchor, accordion body, or toggle to reveal.
   * @return {void}
   */
  function openAnchorAccordion($target) {
    const navigationId = ++anchorNavigationId;
    const $startBody = getAnchorBody($target);
    if (!$startBody.length) {
      return;
    }

    const $bodies = $startBody.parents(".accordion-body").addBack();
    const isPanelAnchor = $target.is(".accordion-toggle, .accordion-body, .accordion-heading");
    const $heading = $startBody.closest(".accordion-group").children(".accordion-heading").first();
    const $scrollTarget = isPanelAnchor ? $heading : $target;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    /** Synchronizes each panel's accessible state before opening it. */
    $bodies.each(function () {
      $(this).closest(".accordion-group").children(".accordion-heading")
        .children(".accordion-toggle").addClass("active").attr("aria-expanded", "true");
    });
    $bodies.stop(true, true).slideDown(reducedMotion ? 0 : 400);

    /** Waits for every ancestor animation, including nested accordion panels. */
    $bodies.promise().done(function () {
      /** Lets visibility observers finish and ignores superseded navigation. */
      window.requestAnimationFrame(function () {
        if (navigationId !== anchorNavigationId || !$startBody.is(":visible")) {
          return;
        }
        focusAnchor(isPanelAnchor ? $heading.children(".accordion-toggle")[0] : $target[0]);
        scrollToAnchor($scrollTarget[0], reducedMotion);
      });
    });
  }

  /** Opens the current fragment's accordion and cancels older pending navigation. */
  function handleHashChange() {
    openAnchorAccordion(findAnchorTarget(window.location.hash));
  }

  /**
   * Reopens an unchanged fragment; changed fragments use native hash navigation.
   * @param {jQuery.Event} event - Delegated link activation, including keyboard clicks.
   * @return {void}
   */
  function handleAnchorClick(event) {
    const link = event.currentTarget;
    const targetWindow = link.target || document.querySelector("base[target]")?.target;
    if (event.isDefaultPrevented() || (event.button !== undefined && event.button !== 0) ||
      event.metaKey || event.ctrlKey || event.shiftKey || event.altKey ||
      link.hasAttribute("download") || (targetWindow && targetWindow !== "_self") ||
      link.classList.contains("accordion-toggle")) {
      return;
    }

    let url;
    try {
      url = new URL(link.href, document.baseURI);
    } catch {
      return;
    }
    if (url.origin !== window.location.origin || url.pathname !== window.location.pathname ||
      url.search !== window.location.search || url.hash !== window.location.hash) {
      return;
    }

    const $target = findAnchorTarget(url.hash);
    if (getAnchorBody($target).length) {
      event.preventDefault();
      openAnchorAccordion($target);
    }
  }

  // Initial check on page load
  handleHashChange();

  // Listen for hash changes
  $(window).on('hashchange', handleHashChange);
  $(document).on("click", "a[href]", handleAnchorClick);

  /**
   * Binds mousedown and keydown events to accordion toggles.
   * Prevents default action and toggles the accordion based on the target derived from the element.
   * Updates the URL hash if a name is provided.
   */
  $(".accordion-toggle").on("mousedown keydown", function (event) {
    if (event.type === "mousedown" || event.keyCode === 32) {
      event.preventDefault();
      // An explicit panel action supersedes a pending anchor scroll or focus.
      anchorNavigationId++;
      const $target = getAccordionTarget($(this));
      const $name = $(this).data("name");
      toggleAccordion($target);
      window.history.replaceState(null, null, $name ? "#" + $name : $target);
    }
  });

  /**
   * Handles clicks on the 'expand all' or 'collapse all' buttons within an accordion.
   * Toggles the expansion state of all accordion bodies and toggles within the same accordion.
   */
  $(".expand-all").on("click", function () {
    anchorNavigationId++;
    const $this = $(this);
    const $accordion = $this.closest(".accordion");
    const $bodies = $accordion.find(".accordion-body");
    const $toggles = $accordion.find(".accordion-toggle");
    if ($this.data("status") === "open") {
      $bodies.slideUp();
      $toggles.removeClass("active");
      $this
        .attr("data-status", "closed")
        .data("status", "closed")
        .html(__("Expand All", "rrze-elements-blocks"));
    } else {
      $bodies.slideDown();
      $toggles.addClass("active");
      $this
        .attr("data-status", "open")
        .data("status", "open")
        .html(__("Collapse All", "rrze-elements-blocks"));
    }
  });

  /**
   * Binds click and keydown events to links within assistant tabs.
   * Activates the tab associated with the clicked link and displays its corresponding pane.
   */
  $(".assistant-tabs-nav a").on("click keydown", function (event) {
    if (event.type === "click" || event.keyCode === 32) {
      event.preventDefault();
      const $link = $(this);
      const $tabs = $link.parents(".assistant-tabs");
      const $paneId = $link.attr("href");
      $link.closest("ul").find("a").removeClass("active");
      $link.addClass("active");
      $tabs
        .find(".assistant-tab-pane")
        .removeClass("assistant-tab-pane-active");
      $($paneId).addClass("assistant-tab-pane-active");
    }
  });

  /**
   * Open all Accordions when Ctrl + F is pressed
   */
  document.addEventListener("keydown", function (event) {
    if ((event.ctrlKey || event.metaKey) && event.key === "f") {
      $(".accordion-body").slideDown();
      $(".accordion-toggle").addClass("active");
    }
  });
});
