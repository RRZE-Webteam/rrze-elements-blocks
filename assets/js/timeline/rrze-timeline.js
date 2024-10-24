try {
  gsap.registerPlugin(ScrollTrigger);

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  const timelineItems = document.querySelectorAll(
    ".wp-block-rrze-elements-timeline-item"
  );

  if (!prefersReducedMotion) {
    timelineItems.forEach((item) => {
      const tooltip = item.querySelector(".tooltip");

      gsap.set(item, { opacity: 0 });
      gsap.set(tooltip, { opacity: 0, y: 50 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: item,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });

      // Animate the li element: fade in over 0.3 seconds
      tl.to(item, {
        opacity: 1,
        duration: 0.3,
        ease: "power1.inOut",
      });

      // Animate the tooltip: opacity and y over 0.7 seconds
      tl.to(
        tooltip,
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power1.in",
        },
        0 // Starts at the same time as the li animation
      );
    });
  } else {
    // If the user prefers reduced motion, ensure items are visible without animation
    timelineItems.forEach((item) => {
      item.style.opacity = 1;
      const tooltip = item.querySelector(".tooltip");
      tooltip.style.opacity = 1;
      tooltip.style.transform = "translateY(0)";
    });
  }
} catch (error) {
  console.error("Animation initialization failed:", error);
}
