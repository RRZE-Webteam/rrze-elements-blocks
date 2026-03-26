document.addEventListener('DOMContentLoaded', () => {
    // GSAP Carousel functionality
    if (typeof gsap !== 'undefined' && typeof ScrollToPlugin !== 'undefined') {
        gsap.registerPlugin(ScrollToPlugin);

        const carousels = document.querySelectorAll('.rrze-elements-blocks__carousel');

        carousels.forEach(carousel => {
            const contentScroller = carousel.querySelector('.rrze-elements-blocks__carousel-content');
            const contentList = carousel.querySelector('.rrze-elements-blocks__carousel-content-list');
            const items = Array.from(carousel.querySelectorAll('.rrze-elements-blocks__carousel-content-list-item'));
            const navButtons = carousel.querySelectorAll('.rrze-elements-blocks_carousel_navigation_button');
            const prevButton = navButtons[0];
            const nextButton = navButtons[1];

            if (!contentScroller || !contentList || items.length === 0 || !prevButton || !nextButton) {
                console.warn('Carousel is missing required elements and cannot be initialized.');
                return;
            }

            let currentIndex = 0;
            let itemWidth = 0;
            let gap = 0;
            let visibleItems = 0;

            const getVisibleItemsCount = () => {
                if (window.innerWidth >= 1024) return 3;
                if (window.innerWidth >= 768) return 2;
                return 1;
            };

            // Function to calculate and update viewport-dependent metrics
            const updateMetrics = () => {
                itemWidth = items.length > 0 ? items[0].offsetWidth : 0;
                gap = itemWidth > 0 ? parseInt(window.getComputedStyle(contentList).gap, 10) || 0 : 0;
                visibleItems = getVisibleItemsCount();
            };

            // Function to update the state of the navigation buttons
            const updateButtons = () => {
                prevButton.disabled = currentIndex === 0;
                nextButton.disabled = currentIndex >= items.length - visibleItems;
            };

            // Function to scroll the carousel to the correct position
            const scrollToPosition = (instant = false) => {
                const scrollAmount = currentIndex * (itemWidth + gap);

                gsap.to(contentScroller, {
                    duration: instant ? 0 : 0.5,
                    scrollTo: { x: scrollAmount, autoKill: false },
                    ease: 'power2.inOut'
                });
                updateButtons();
            };

            nextButton.addEventListener('click', () => {
                if (currentIndex < items.length - visibleItems) {
                    currentIndex++;
                    scrollToPosition();
                }
            });

            prevButton.addEventListener('click', () => {
                if (currentIndex > 0) {
                    currentIndex--;
                    scrollToPosition();
                }
            });

            // Handle viewport resizing
            let resizeTimeout;
            window.addEventListener('resize', () => {
                clearTimeout(resizeTimeout);
                resizeTimeout = setTimeout(() => {
                    updateMetrics();

                    if (currentIndex > items.length - visibleItems) {
                        currentIndex = Math.max(0, items.length - visibleItems);
                    }

                    scrollToPosition(true);
                }, 200);
            });

            // Initial setup
            updateMetrics();
            updateButtons();
        });
    } else {
        console.error('GSAP or ScrollToPlugin is not loaded for the carousel.');
    }

    // Modal functionality (remains the same)
    const modalTriggers = document.querySelectorAll('[data-modal-id]');
    modalTriggers.forEach(trigger => {
        trigger.addEventListener('click', (event) => {
            event.preventDefault();
            const modalId = trigger.getAttribute('data-modal-id');
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.style.display = 'block';
                modal.setAttribute('aria-hidden', 'false');
                trapFocus(modal);
            }
        });
    });

    const closeButtons = document.querySelectorAll('.rrze-elements-modal__close');
    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modal = button.closest('.rrze-elements-modal');
            if (modal) closeModal(modal);
        });
    });

    const backdrops = document.querySelectorAll('.rrze-elements-modal__backdrop');
    backdrops.forEach(backdrop => {
        backdrop.addEventListener('click', () => {
            const modal = backdrop.closest('.rrze-elements-modal');
            if (modal) closeModal(modal);
        });
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            const openModal = document.querySelector('.rrze-elements-modal[aria-hidden="false"]');
            if (openModal) closeModal(openModal);
        }
    });

    function closeModal(modal) {
        modal.style.display = 'none';
        modal.setAttribute('aria-hidden', 'true');
    }

    function trapFocus(element) {
        const focusableElements = element.querySelectorAll(
            'a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled]), input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled]), select:not([disabled])'
        );
        if (focusableElements.length === 0) return;

        const firstFocusableElement = focusableElements[0];
        const lastFocusableElement = focusableElements[focusableElements.length - 1];

        element.addEventListener('keydown', (e) => {
            if (e.key !== 'Tab') return;
            if (e.shiftKey) {
                if (document.activeElement === firstFocusableElement) {
                    lastFocusableElement.focus();
                    e.preventDefault();
                }
            } else {
                if (document.activeElement === lastFocusableElement) {
                    firstFocusableElement.focus();
                    e.preventDefault();
                }
            }
        });
        firstFocusableElement.focus();
    }
});
