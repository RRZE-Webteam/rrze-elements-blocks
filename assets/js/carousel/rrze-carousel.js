document.addEventListener('DOMContentLoaded', () => {
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
            if (modal) {
                closeModal(modal);
            }
        });
    });

    const backdrops = document.querySelectorAll('.rrze-elements-modal__backdrop');
    backdrops.forEach(backdrop => {
        backdrop.addEventListener('click', () => {
            const modal = backdrop.closest('.rrze-elements-modal');
            if (modal) {
                closeModal(modal);
            }
        });
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            const openModal = document.querySelector('.rrze-elements-modal[aria-hidden="false"]');
            if (openModal) {
                closeModal(openModal);
            }
        }
    });

    function closeModal(modal) {
        modal.style.display = 'none';
        modal.setAttribute('aria-hidden', 'true');
    }

    function trapFocus(element) {
        const focusableElements = element.querySelectorAll(
            'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select'
        );
        const firstFocusableElement = focusableElements[0];
        const lastFocusableElement = focusableElements[focusableElements.length - 1];

        element.addEventListener('keydown', (event) => {
            if (event.key !== 'Tab') {
                return;
            }

            if (event.shiftKey) {
                if (document.activeElement === firstFocusableElement) {
                    lastFocusableElement.focus();
                    event.preventDefault();
                }
            } else {
                if (document.activeElement === lastFocusableElement) {
                    firstFocusableElement.focus();
                    event.preventDefault();
                }
            }
        });

        firstFocusableElement.focus();
    }
});
