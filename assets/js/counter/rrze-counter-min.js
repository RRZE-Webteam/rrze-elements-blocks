"use strict";

var _gsap = require("./gsap.min");
var items = document.querySelectorAll(".fau-counter-data");
_gsap.gsap.from(items, {
  textContent: 0,
  duration: 4,
  ease: "power1.in",
  snap: {
    textContent: 1
  },
  stagger: {
    each: 1.0,
    onUpdate: function onUpdate() {
      this.targets()[0].innerHTML = numberWithCommas(Math.ceil(this.targets()[0].textContent));
    }
  }
});
function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
