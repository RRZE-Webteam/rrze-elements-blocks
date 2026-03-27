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

      // 3. Die Scroll-Logik
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
