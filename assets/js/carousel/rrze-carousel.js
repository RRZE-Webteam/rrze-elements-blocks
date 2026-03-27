document.addEventListener('DOMContentLoaded', () => {
    // GSAP Carousel functionality
    if (typeof gsap !== 'undefined' && typeof ScrollToPlugin !== 'undefined') {
        gsap.registerPlugin(ScrollToPlugin);

        const carousels = document.querySelectorAll('.rrze-elements-blocks__carousel');

        carousels.forEach(carousel => {
            const contentScroller = carousel.querySelector('.rrze-elements-blocks__carousel-content');
            const items = Array.from(carousel.querySelectorAll('.rrze-elements-blocks__carousel-content-list-item'));
            const navButtons = carousel.querySelectorAll('.rrze-elements-blocks_carousel_navigation_button');
            const prevButton = navButtons[0];
            const nextButton = navButtons[1];

            if (!contentScroller || items.length === 0 || !prevButton || !nextButton) {
                console.warn('Carousel is missing required elements.');
                return;
            }

            const gap = 20;
            let itemWidth = 0;
            let scrollStep = 0;

            const updateMetrics = () => {
                itemWidth = items[0].offsetWidth;
                scrollStep = itemWidth + gap;
            };

            const updateButtons = () => {
                const currentScroll = Math.round(contentScroller.scrollLeft);
                const maxScroll = Math.round(contentScroller.scrollWidth - contentScroller.clientWidth);

                prevButton.disabled = currentScroll <= 0;
                nextButton.disabled = currentScroll >= maxScroll - 1;
            };

            const scrollCarousel = (direction) => {
                updateMetrics();

                const currentScroll = contentScroller.scrollLeft;
                const maxScroll = contentScroller.scrollWidth - contentScroller.clientWidth;

                let targetScroll;

                if (direction === 'next') {
                    targetScroll = currentScroll + scrollStep;
                } else {
                    targetScroll = currentScroll - scrollStep;
                }

                targetScroll = Math.max(0, Math.min(targetScroll, maxScroll));

                gsap.to(contentScroller, {
                    duration: 0.5,
                    scrollTo: { x: targetScroll, autoKill: true },
                    ease: 'power2.inOut',
                    onUpdate: updateButtons
                });
            };

            nextButton.addEventListener('click', () => scrollCarousel('next'));
            prevButton.addEventListener('click', () => scrollCarousel('prev'));

            contentScroller.addEventListener('scroll', updateButtons);

            let resizeTimeout;
            window.addEventListener('resize', () => {
                clearTimeout(resizeTimeout);
                resizeTimeout = setTimeout(() => {
                    updateMetrics();
                    updateButtons();
                }, 200);
            });

            updateMetrics();
            updateButtons();
        });
    } else {
        console.error('GSAP or ScrollToPlugin is not loaded for the carousel.');
    }

    // Modal functionality with <dialog>
    const cards = document.querySelectorAll('.rrze-elements-blocks__carousel-content-list-item');

    cards.forEach(card => {
        const cardContent = card.querySelector('.rrze-elements-blocks__carousel_feature_card-content');
        const cardBackground = card.querySelector('.rrze-elements-blocks__carousel_feature_card_bg');

        let hoverTimeline = null;

        if (cardContent) {
            hoverTimeline = gsap.timeline({
                paused: true,
                defaults: {
                    duration: 0.35,
                    ease: 'power3.out'
                }
            })
                .to(cardContent, {
                    scale: 1.02
                }, 0);

            if (cardBackground) {
                hoverTimeline.to(cardBackground, {
                    '--rrze-card-overlay-opacity': 0.5
                }, 0);
            }
        }

        const activateCard = () => {
            if (hoverTimeline) {
                hoverTimeline.play();
            }
        };

        const deactivateCard = () => {
            if (hoverTimeline) {
                hoverTimeline.reverse();
            }
        };

        if (hoverTimeline) {
            card.addEventListener('mouseenter', activateCard);
            card.addEventListener('mouseleave', deactivateCard);
        }

        const triggerBox = card.querySelector('.rrze-elements-blocks__carousel_feature_card_link');
        const modal = card.querySelector('.rrze-elements-blocks-fullscreen-modal');
        const overlay = modal ? modal.querySelector('[data-modal-overlay]') : null;
        const modalPanel = modal ? modal.querySelector('.rrze-elements-blocks-modal-content') : null;
        const closeButtons = card.querySelectorAll('.rrze-elements-blocks-close-modal');

        if (!triggerBox || !modal || closeButtons.length === 0 || !overlay || !modalPanel) {
            return;
        }

        if (hoverTimeline) {
            triggerBox.addEventListener('focus', activateCard);
            triggerBox.addEventListener('blur', deactivateCard);
        }

        const closeModalAnimated = () => {
            if (!modal.open) {
                return;
            }

            gsap.to(modalPanel, {
                opacity: 0,
                y: 20,
                scale: 0.95,
                duration: 0.3,
                ease: "power2.in",
                onComplete: () => {
                    modal.close();
                    gsap.set(modalPanel, { clearProps: "all" });
                }
            });
        };

        triggerBox.addEventListener('click', (e) => {
            e.preventDefault();

            deactivateCard();
            modal.showModal();
            overlay.scrollTop = 0;
            modalPanel.scrollTop = 0;
            modalPanel.focus({ preventScroll: true });

            gsap.fromTo(modalPanel,
                { opacity: 0, y: 20, scale: 0.95 },
                { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: "power2.out" }
            );
        });

        closeButtons.forEach((button) => {
            button.addEventListener('click', () => {
                closeModalAnimated();
            });
        });

        overlay.addEventListener('click', (event) => {
            if (event.target === overlay) {
                closeModalAnimated();
            }
        });

        modal.addEventListener('cancel', (event) => {
            event.preventDefault();
            closeModalAnimated();
        });
    });
});
