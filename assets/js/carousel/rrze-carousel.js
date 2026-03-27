document.addEventListener('DOMContentLoaded', () => {
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
          scrollTo: { x: targetScroll, autoKill: true }, // autoKill erlaubt manuelles Eingreifen des Users
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
});

document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.rrze-elements-blocks__carousel-content-list-item');

  cards.forEach(card => {
    // Look FORWARD only inside the current card
    const triggerBox = card.querySelector('.rrze-elements-blocks__carousel_feature_card_link');
    const modal = card.querySelector('.rrze-elements-blocks-fullscreen-modal');
    const closeBtn = card.querySelector('.rrze-elements-blocks-close-modal');

    if (!triggerBox || !modal || !closeBtn) return;

    const closeModalAnimated = () => {
      gsap.to(modal, {
        opacity: 0,
        scale: 0.95,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => {
          modal.close(); // Natively close after animation
          gsap.set(modal, { clearProps: "all" }); // Clean up GSAP styles
        }
      });
    };

    // Open Modal
    triggerBox.addEventListener('click', (e) => {
      e.preventDefault(); // IMPORTANT: Prevents the page from jumping to the top due to href="#"

      modal.showModal();

      gsap.fromTo(modal,
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 0.4, ease: "power2.out" }
      );
    });

    // Close Modal (via Button)
    closeBtn.addEventListener('click', () => {
      closeModalAnimated();
    });

    // Close Modal (via click on the Backdrop)
    modal.addEventListener('click', (e) => {
      const dialogDimensions = modal.getBoundingClientRect();
      if (
        e.clientX < dialogDimensions.left ||
        e.clientX > dialogDimensions.right ||
        e.clientY < dialogDimensions.top ||
        e.clientY > dialogDimensions.bottom
      ) {
        closeModalAnimated();
      }
    });
  });
});
