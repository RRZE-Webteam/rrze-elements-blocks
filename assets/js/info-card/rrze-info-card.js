/** Initializes card hover effects and dialogs independently of carousel navigation. */
document.addEventListener('DOMContentLoaded', () => {
    document.body.classList.add('rrze-info-card-js-enabled');
    // Modal functionality with <dialog>
    const cards = document.querySelectorAll('.rrze-elements-blocks__info-card');

    cards.forEach(card => {
        const cardContent = card.querySelector('.rrze-elements-blocks__carousel_feature_card-content');
        const cardBackground = card.querySelector('.rrze-elements-blocks__carousel_feature_card_bg');
        const overlayTargetHost = card.closest('[data-hover-overlay-target]');
        const hoverOverlayDefault = (() => {
            if (!overlayTargetHost) {
                return 0.5;
            }
            const value = parseFloat(overlayTargetHost.getAttribute('data-hover-overlay-target') || '');
            return Number.isFinite(value) ? value : 0.5;
        })();

        const hasAction = card.dataset.cardHasAction === 'true';

        let hoverTimeline = null;

        if (typeof gsap !== 'undefined' && cardContent && hasAction) {
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
                const computedStyles = window.getComputedStyle(cardBackground);
                const baseOverlayOpacity = parseFloat(computedStyles.getPropertyValue('--rrze-card-overlay-opacity')) || 0;
                const overlayTarget = baseOverlayOpacity > 0 ? Math.min(baseOverlayOpacity + 0.35, 1) : hoverOverlayDefault;
                hoverTimeline.to(cardBackground, {
                    '--rrze-card-overlay-opacity': overlayTarget
                }, 0);
            }
        }

        /** Starts the optional hover/focus animation for this card. */
        const activateCard = () => {
            if (hoverTimeline) {
                hoverTimeline.play();
            }
        };

        /** Restores the card appearance when its interaction ends. */
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

        /** Closes the dialog after its optional exit animation. */
        const closeModalAnimated = () => {
            if (!modal.open) {
                return;
            }

            /** Closes this card's dialog and restores focus to its trigger. */
            const finishClose = () => {
                modal.close();
                if (typeof gsap !== 'undefined') gsap.set(modalPanel, { clearProps: "all" });
                triggerBox.focus({ preventScroll: true });
            };
            if (typeof gsap === 'undefined') {
                finishClose();
                return;
            }
            gsap.to(modalPanel, {
                opacity: 0,
                y: 20,
                scale: 0.95,
                duration: 0.3,
                ease: "power2.in",
                onComplete: finishClose
            });
        };

        triggerBox.addEventListener('click', (e) => {
            e.preventDefault();

            deactivateCard();
            modal.showModal();
            overlay.scrollTop = 0;
            modalPanel.scrollTop = 0;
            modalPanel.focus({ preventScroll: true });

            if (typeof gsap !== 'undefined') gsap.fromTo(modalPanel,
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
