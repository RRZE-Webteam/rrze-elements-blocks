function isOutOfViewport(el) {
  const r = el.getBoundingClientRect();
  return r.bottom < 0 || r.top > window.innerHeight;
}

function initTimeline() {
  const prefersReducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const items = gsap.utils.toArray(".wp-block-rrze-elements-timeline-item");

  if (prefersReducedMotion) {
    items.forEach(item => {
      item.style.opacity = 1;
      item.querySelector(".tooltip").style.opacity = 1;
    });
    return;
  }

  items.forEach(item => {
    const tooltip = item.querySelector(".tooltip");

    if (isOutOfViewport(item)) {
      gsap.set(item,    { opacity: 0 });
      gsap.set(tooltip, { opacity: 0, y: 50 });
    }

    gsap.timeline({
      scrollTrigger: {
        trigger: item,
        start: "top 80%",
        once: true,
        invalidateOnRefresh: true
      }
    })
      .to(item, {
        opacity: 1,
        duration: 0.3,
        ease: "power1.inOut"
      })
      .to(tooltip, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: "power1.in"
      }, 0);
  });
}

window.addEventListener("load", () => {
  initTimeline();
  ScrollTrigger.refresh();
  requestAnimationFrame(() =>
    ScrollTrigger.refresh(true)
  );
});

window.addEventListener("pageshow", e => {
  if (e.persisted) ScrollTrigger.refresh(true);
});
