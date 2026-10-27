/** Keeps slider helpers private to this frontend script. */
(() => {
/**
 * Enhances each slider independently; originals remain in their document order.
 * Preview copies are inert and never contain duplicate dialogs or element IDs.
 */
function initializeContentSliders() {
    document.querySelectorAll('.rrze-elements-blocks__content-slider').forEach(initializeContentSlider);
}

/**
 * Adds looping navigation, native touch scrolling and keyboard controls.
 *
 * @param {HTMLElement} root Slider section.
 */
function initializeContentSlider(root) {
    if (root.hasAttribute('data-slider-ready')) return;
    const viewport = root.querySelector(':scope > .rrze-elements-blocks__content-slider-viewport');
    const track = viewport?.querySelector(':scope > .rrze-elements-blocks__content-slider-track');
    if (!viewport || !track) return;
    const cards = Array.from(track.children).filter((child) => child.classList.contains('rrze-elements-blocks__info-card'));
    const navigation = root.querySelector(':scope > .rrze-elements-blocks__content-slider-navigation');
    const status = navigation?.querySelector('.rrze-elements-blocks__content-slider-position');
    if (!cards.length || !navigation || !status) return;
    const canAnimate = typeof gsap !== 'undefined' && typeof ScrollToPlugin !== 'undefined';
    if (canAnimate) gsap.registerPlugin(ScrollToPlugin);
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let active = 0;
    let tween = null;
    let animating = false;
    let pointerDown = false;
    let pressedSlide = null;
    let settleTimer;
    let copies = 0;
    let slides = cards;

    /**
     * Makes a purely visual preview, excluding interactive dialog content.
     *
     * @param {HTMLElement} card Original card.
     * @return {HTMLElement} Inert preview without IDs or accessible controls.
     */
    function preview(card) {
        const copy = card.cloneNode(true);
        copy.querySelectorAll('dialog').forEach((dialog) => dialog.remove());
        [copy, ...copy.querySelectorAll('*')].forEach((element) => {
            ['id', 'aria-controls', 'aria-labelledby', 'aria-describedby', 'data-modal-id', 'data-slider-active', 'autofocus'].forEach((attribute) => element.removeAttribute(attribute));
        });
        copy.setAttribute('data-slider-clone', '');
        copy.setAttribute('aria-hidden', 'true');
        copy.setAttribute('inert', '');
        copy.querySelector('.rrze-elements-blocks__carousel_feature_card-content')?.style.removeProperty('transform');
        copy.querySelector('.rrze-elements-blocks__carousel_feature_card_bg')?.style.removeProperty('--rrze-card-overlay-opacity');
        return copy;
    }

    /** Provides enough repeated neighbors for the current screen, including ultrawide layouts. */
    function refreshPreviews() {
        const cardSize = cards[0].getBoundingClientRect().width;
        const needed = cards.length > 1 && cardSize > 0
            ? Math.max(2, Math.ceil(viewport.clientWidth / cardSize)) : 0;
        if (needed === copies) return;
        track.querySelectorAll(':scope > [data-slider-clone]').forEach((copy) => copy.remove());
        copies = needed;
        const before = Array.from({ length: copies }, (_, index) => preview(cards[((cards.length - copies + index) % cards.length + cards.length) % cards.length]));
        const after = Array.from({ length: copies }, (_, index) => preview(cards[index % cards.length]));
        track.prepend(...before);
        track.append(...after);
        slides = Array.from(track.children).filter((child) => child.classList.contains('rrze-elements-blocks__info-card'));
    }
    refreshPreviews();
    root.dataset.sliderCount = String(cards.length);
    root.setAttribute('data-slider-ready', '');

    /**
     * Measures the target from live geometry, including responsive card sizes.
     *
     * @param {HTMLElement} card Original or preview to center.
     * @return {number} Horizontal scroll position.
     */
    function position(card) {
        const rect = card.getBoundingClientRect();
        const viewportRect = viewport.getBoundingClientRect();
        return viewport.scrollLeft + rect.left + rect.width / 2
            - viewportRect.left - viewport.clientWidth / 2;
    }

    /** Announces the current logical position, independent of preview copies. */
    function updateStatus() {
        status.textContent = `${active + 1} / ${cards.length}`;
    }

    /**
     * Highlights only the centered visual instance, even if copies repeat on wide screens.
     *
     * @param {HTMLElement} card Visible original or preview.
     */
    function highlight(card) {
        slides.forEach((slide) => slide.toggleAttribute('data-slider-active', slide === card));
    }

    /**
     * Jumps without CSS smooth scrolling or snap fighting the loop correction.
     *
     * @param {HTMLElement} card Original card to center.
     */
    function jump(card) {
        viewport.classList.add('is-animating', 'is-rebasing');
        viewport.scrollTo({ left: position(card), behavior: 'instant' });
        highlight(card);
        // Commit the active style before restoring transitions. Closure removes an unused
        // offsetWidth read, but preserves this explicit geometry measurement.
        card.getBoundingClientRect();
        viewport.classList.remove('is-animating', 'is-rebasing');
    }

    /** Cancels an animation when the user takes over with touch or a trackpad. */
    function interrupt() {
        if (tween) tween.kill();
        tween = null;
        animating = false;
        viewport.classList.remove('is-animating');
    }

    /**
     * Locates the centered visual card without depending on saved indices.
     *
     * @return {number} Index in the current track, including previews.
     */
    function nearestIndex() {
        let nearest = 0;
        let distance = Infinity;
        slides.forEach((card, index) => {
            const delta = Math.abs(position(card) - viewport.scrollLeft);
            if (delta < distance) { nearest = index; distance = delta; }
        });
        return nearest;
    }

    /** Restores an original after scrolling onto a preview at either end. */
    function settle() {
        clearTimeout(settleTimer);
        if (animating || pointerDown) return;
        const nearest = nearestIndex();
        active = ((nearest - copies) % cards.length + cards.length) % cards.length;
        if (slides[nearest].hasAttribute('data-slider-clone')) jump(cards[active]);
        else highlight(cards[active]);
        updateStatus();
    }

    /**
     * Centers a real card or its edge preview, then normalizes the loop.
     *
     * @param {number} index Track index minus the leading preview count.
     */
    function goTo(index) {
        if (animating || cards.length < 2) return;
        clearTimeout(settleTimer);
        const target = slides[index + copies];
        if (!target) return;
        active = ((index % cards.length) + cards.length) % cards.length;
        if (!canAnimate || reducedMotion.matches) {
            jump(cards[active]);
            updateStatus();
            return;
        }
        animating = true;
        highlight(target);
        viewport.classList.add('is-animating');
        tween = gsap.to(viewport, {
            duration: 0.45,
            ease: 'power2.inOut',
            scrollTo: { x: position(target), autoKill: false },
            /** Ends the transition on the identical original, keeping both neighbors visible. */
            onComplete() {
                tween = null;
                jump(cards[active]);
                animating = false;
                updateStatus();
            },
        });
    }

    navigation.querySelectorAll('[data-slider-direction]').forEach((button) => {
        button.addEventListener('click', () => {
            if (animating) return;
            settle();
            goTo(active + Number(button.dataset.sliderDirection));
        });
    });
    /**
     * Resolves a pointer hit even when inert previews retarget events to the viewport.
     *
     * @param {MouseEvent} event Pointer or click event.
     * @return {number} Hit slide index, or -1 for the gap between cards.
     */
    function hitIndex(event) {
        return slides.findIndex((slide) => {
            const rect = slide.getBoundingClientRect();
            return event.clientX >= rect.left && event.clientX <= rect.right
                && event.clientY >= rect.top && event.clientY <= rect.bottom;
        });
    }

    viewport.addEventListener('click', (event) => {
        if (event.target.closest('dialog') || event.detail === 0) return;
        const index = pressedSlide ? slides.indexOf(pressedSlide) : hitIndex(event);
        pressedSlide = null;
        if (index < 0 || (!animating && slides[index] === cards[active])) return;
        event.preventDefault();
        event.stopImmediatePropagation();
        goTo(index - copies);
    }, true);
    viewport.addEventListener('keydown', (event) => {
        // Nested links, dialogs and editable content keep their normal keyboard behavior.
        if (event.target !== viewport || event.altKey || event.ctrlKey || event.metaKey) return;
        const directions = { ArrowLeft: -1, ArrowRight: 1 };
        if (event.key in directions || event.key === 'Home' || event.key === 'End') {
            event.preventDefault();
            if (animating) return;
            settle();
            if (event.key === 'Home') goTo(0);
            else if (event.key === 'End') goTo(cards.length - 1);
            else goTo(active + directions[event.key]);
        }
    });
    viewport.addEventListener('focusin', (event) => {
        const card = cards.find((item) => item.contains(event.target));
        if (!card || pointerDown || event.target.closest('dialog')) return;
        interrupt();
        active = cards.indexOf(card);
        jump(card);
        updateStatus();
    });
    viewport.addEventListener('pointerdown', (event) => {
        if (event.target.closest('dialog')) return;
        pressedSlide = slides[hitIndex(event)] || null;
        pointerDown = true;
        interrupt();
    }, { passive: true });
    /** Waits for inertia and snapping after a gesture before normalizing edge previews. */
    function scheduleSettle() {
        clearTimeout(settleTimer);
        if (!animating) highlight(slides[nearestIndex()]);
        settleTimer = setTimeout(settle, 160);
    }
    /** Releases a touch gesture even when the pointer leaves the viewport. */
    function releasePointer() {
        if (!pointerDown) return;
        pointerDown = false;
        scheduleSettle();
    }
    window.addEventListener('pointerup', releasePointer, { passive: true });
    window.addEventListener('pointercancel', releasePointer, { passive: true });
    viewport.addEventListener('wheel', interrupt, { passive: true });
    viewport.addEventListener('scroll', scheduleSettle, { passive: true });
    viewport.addEventListener('scrollend', settle);

    /** Preserves the current card when its container is resized or becomes visible. */
    function resize() {
        interrupt();
        refreshPreviews();
        jump(cards[active]);
    }
    if (typeof ResizeObserver !== 'undefined') new ResizeObserver(resize).observe(viewport);
    else window.addEventListener('resize', resize);
    jump(cards[0]);
    updateStatus();
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initializeContentSliders);
else initializeContentSliders();
})();
