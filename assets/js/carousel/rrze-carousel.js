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

            let firstItemOffset = 0;
            let itemPositions = [];
            let maxScroll = 0;
            let targetIndex = 0;

            const updateMetrics = () => {
                maxScroll = Math.max(0, contentScroller.scrollWidth - contentScroller.clientWidth);
                firstItemOffset = items[0].offsetLeft;
                itemPositions = items.map((item, index) => {
                    const raw = Math.round(item.offsetLeft - firstItemOffset);
                    if (index === items.length - 1) {
                        return maxScroll;
                    }
                    return Math.max(0, Math.min(raw, maxScroll));
                });
            };

            const clampIndex = (index) => Math.max(0, Math.min(index, items.length - 1));

            const getNearestIndex = () => {
                const currentScroll = contentScroller.scrollLeft;
                let closestIndex = 0;
                let minDiff = Infinity;
                itemPositions.forEach((position, index) => {
                    const diff = Math.abs(position - currentScroll);
                    if (diff < minDiff) {
                        minDiff = diff;
                        closestIndex = index;
                    }
                });
                return closestIndex;
            };

            const updateButtons = () => {
                const currentScroll = Math.round(contentScroller.scrollLeft);
                const maxScroll = Math.round(contentScroller.scrollWidth - contentScroller.clientWidth);
                const atStart = currentScroll <= 1;
                const atEnd = currentScroll >= maxScroll - 1;
                prevButton.disabled = atStart;
                nextButton.disabled = atEnd;
            };

            const scrollCarousel = (direction) => {
                updateMetrics();

                const currentIndex = getNearestIndex();
                targetIndex = clampIndex(direction === 'next' ? currentIndex + 1 : currentIndex - 1);
                const rawTarget = itemPositions[targetIndex];
                const targetScroll = Math.max(0, Math.min(rawTarget, maxScroll));

                contentScroller.classList.add('is-programmatic-scroll');
                let snapTimeout;

                gsap.to(contentScroller, {
                    duration: 0.5,
                    scrollTo: { x: targetScroll, autoKill: false },
                    ease: 'power2.inOut',
                    onUpdate: updateButtons,
                    onComplete: () => {
                        contentScroller.scrollLeft = targetScroll;
                        clearTimeout(snapTimeout);
                        snapTimeout = setTimeout(() => {
                            contentScroller.classList.remove('is-programmatic-scroll');
                            updateButtons();
                        }, 150);
                    }
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

        const hasAction = card.dataset.cardHasAction === 'true';

        let hoverTimeline = null;

        if (cardContent && hasAction) {
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
