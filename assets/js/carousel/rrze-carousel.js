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
                    if (index === items.length - 1) {
                        return maxScroll;
                    }

                    const raw = Math.round(item.offsetLeft - firstItemOffset);
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

            let isAnimating = false;
            let scrollTween = null;

            const updateButtons = () => {
                const currentScroll = Math.round(contentScroller.scrollLeft);
                maxScroll = Math.round(contentScroller.scrollWidth - contentScroller.clientWidth);
                const atStart = currentScroll <= 1;
                const atEnd = currentScroll >= maxScroll - 1;
                prevButton.disabled = isAnimating || atStart;
                nextButton.disabled = isAnimating || atEnd;
            };

            const scrollCarousel = (direction) => {
                updateMetrics();

                const currentIndex = getNearestIndex();
                targetIndex = clampIndex(direction === 'next' ? currentIndex + 1 : currentIndex - 1);
                const rawTarget = itemPositions[targetIndex];
                const targetScroll = Math.max(0, Math.min(rawTarget, maxScroll));

                if (scrollTween) {
                    scrollTween.kill();
                }

                isAnimating = true;
                contentScroller.classList.add('is-programmatic-scroll');
                updateButtons();

                scrollTween = gsap.to(contentScroller, {
                    duration: 0.5,
                    scrollTo: { x: targetScroll, autoKill: false },
                    ease: 'power2.inOut',
                    onUpdate: updateButtons,
                    onComplete: () => {
                        contentScroller.scrollLeft = targetScroll;
                        contentScroller.classList.remove('is-programmatic-scroll');
                        isAnimating = false;
                        scrollTween = null;
                        updateButtons();
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

});
