const items = document.querySelectorAll(".fau-counter-data");

items.forEach((item) => {
  // Default values are set if data attributes are not provided
  try {
    const start = item.getAttribute("data-start") || 0;
    const duration = parseFloat(item.getAttribute("data-duration")) || 1;
    const ease = item.getAttribute("data-ease") || "power1.in";
    const stagger = parseFloat(item.getAttribute("data-stagger")) || 1.0;

    gsap.from(item, {
      textContent: start,
      duration: duration,
      ease: ease,
      snap: { textContent: 1 },
      stagger: {
        each: stagger,
        onUpdate: function () {
          // `this.targets()[0]` replaced with `item` to refer to current element in loop
          item.innerHTML = numberWithCommas(Math.ceil(item.textContent));
        },
      },
    });
  } catch (error) {
    console.error("Error in counter animation:", error);
  }
});

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
