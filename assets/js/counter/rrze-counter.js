function numberWithDots(x) {
  if (x == null) {
    console.log("Received null or undefined");
    return "0";
  }

  let cleanInput = x.toString().replace(/\./g, ""); // Remove any dots in the string
  const number = parseInt(cleanInput, 10);
  if (isNaN(number)) {
    console.log("Conversion to number failed");
    return "Invalid number";
  }

  const numberAsString = number.toString();
  return numberAsString.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

try {
  console.log("try");
  ScrollTrigger.clearScrollMemory();
  window.scrollTo(0, 0);
  window.addEventListener("load", () => {
    gsap.registerPlugin(ScrollTrigger);
    console.log("Dom Content Loaded");
    console.log("gsap register Plugin");

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    //const counterContainers = document.querySelectorAll('.wp-block-rrze-elements-rrze-counter');
    const counterContainers = document.querySelectorAll(".rrze--counter-element");
    console.log("counterContainers");
    console.log(counterContainers);
    console.log(counterContainers.length);

    if (!prefersReducedMotion) {
      counterContainers.forEach((container) => {
        const items = container.querySelectorAll(".fau-counter-data");
        console.log(items);
        const counterRow = container.closest(".rrze--counter-element");
        console.log(counterRow);
        const staggerValue = parseFloat(counterRow.getAttribute("data-stagger"));
        console.log(staggerValue);
        const startValue = parseFloat(counterRow.getAttribute("data-startValue"));
        const endValue = parseFloat(counterRow.getAttribute("data-endValue"));

        gsap.from(items, {
          textContent: startValue || 0,
          duration: 2,
          ease: "power3.inOut",
          stagger: staggerValue || 0,
          snap: {textContent: 1},
          onUpdate: function () {
            this.targets().forEach((target) => {
              target.innerHTML = numberWithDots(
                Math.ceil(parseInt(target.textContent.replace(/\./g, ""), 10))
              );
            });
          },
          scrollTrigger: {
            trigger: container,
            start: "top bottom",
            toggleActions: "play none none none",
          },
        });
        console.log("finished");
      });
    } else {
      counterContainers.forEach((container) => {
        const items = container.querySelectorAll(".fau-counter-data");
        items.forEach((item) => {
          item.textContent = numberWithDots(parseInt(item.textContent, 10));
        });
      });
    }
  })
} catch (error) {
  console.error("Animation initialization failed:", error);
}
