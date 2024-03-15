function numberWithDots(x){
  if (x == null) { 
    console.log('Received null or undefined');
    return '0';
  }

  let cleanInput = x.toString().replace(/\./g, ''); // Remove any dots in the string
  const number = parseInt(cleanInput, 10);
  if (isNaN(number)) {
    console.log('Conversion to number failed');
    return 'Invalid number';
  }

  const numberAsString = number.toString();
  return numberAsString.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}


try {
  gsap.registerPlugin(ScrollTrigger);

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;
  const items = gsap.utils.toArray(".fau-counter-data"); // Convert NodeList to an array

  if (!prefersReducedMotion) {
    // Access the data-stagger attribute from the section element
    const counterRow = document.querySelector('.rrze--counter-element');
    const staggerValue = parseFloat(counterRow.getAttribute('data-stagger'));
    console.log(staggerValue);

    gsap.from(items, {
      textContent: 0,
      duration: 2,
      ease: "power3.inOut",
      stagger: staggerValue,
      snap: { textContent: 1 },
      onUpdate: function () {
        this.targets().forEach((target) => {
          target.innerHTML = numberWithDots(Math.ceil(parseInt(target.textContent.replace(/\./g, ''), 10)));
        });
      },
      scrollTrigger: {
        trigger: items[0],
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });
  } else {
    items.forEach((item) => {
      item.textContent = numberWithDots(parseInt(item.textContent, 10));
    });
  }
} catch (error) {
  console.error("Animation initialization failed:", error);
}
