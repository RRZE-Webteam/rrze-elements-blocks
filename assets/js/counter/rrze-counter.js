try {
  // Function to add commas to numbers
  // function numberWithCommas(x) {
  //   return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  // }

  // Function to add dot as thousands separator
  function numberWithDots(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

  gsap.registerPlugin(ScrollTrigger); // Register ScrollTrigger plugin

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  const items = document.querySelectorAll(".fau-counter-data");

  items.forEach((item) => {
    // Check if the user prefers reduced motion
    if (!prefersReducedMotion) {
      const start = item.getAttribute("data-start") || 0;
      const duration = parseFloat(item.getAttribute("data-duration")) || 2;
      const ease = item.getAttribute("data-ease") || "power3.inOut";
      const stagger = parseFloat(item.getAttribute("data-stagger")) || 1.0;

      // If not, initialize the GSAP animation with ScrollTrigger
      gsap.from(item, {
        textContent: start,
        duration: duration,
        ease: ease,
        snap: { textContent: 1 },
        stagger: {
          each: stagger,
          onUpdate: function () {
            this.targets()[0].innerHTML = numberWithDots(
              Math.ceil(this.targets()[0].textContent)
            );
          },
        },
        scrollTrigger: {
          trigger: item, // Use the current element as the trigger
          start: "top 80%", // Start the animation when the top of the element hits the 80% mark of the viewport
          toggleActions: "play none none none", // Play the animation once when the condition is met
        },
      });
    } else {
      // If the user prefers reduced motion, set the textContent directly without animation
      item.textContent = numberWithCommas(parseInt(item.textContent, 10));
    }
  });
} catch (error) {
  console.error("Animation initialization failed:", error);
  // Here, you could handle errors more gracefully, e.g., by providing fallback content or functionality.
}
