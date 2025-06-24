try {
  gsap.registerPlugin(ScrollTrigger);

  document.addEventListener("DOMContentLoaded", function () {
    const sections = gsap.utils.toArray(".section");
    sections.pop();

    // Ensure snapping by setting up ScrollTriggers for each section
    sections.forEach((section, i) => {
      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: () => "+=" + window.innerHeight,
        toggleActions: "play pause resume reset",
        // pin: true, // Optional: Comment this out if no pinning is desired
        pinSpacing: false, // Optional: Use true if you want spacing between pinned sections
        snap: 1 / (sections.length - 1), // Snap to the start of each section
        markers: true,
        scrub: true,
      });
    });

    // window.addEventListener('load', function() {
    //     ScrollTrigger.refresh();
    // });

  });
} catch (error) {
  console.error("Animation initialization failed:", error);
}
