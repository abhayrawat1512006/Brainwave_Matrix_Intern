document.addEventListener("DOMContentLoaded", function () {
  const text = `At TechZone, we are passionate about bringing the latest and greatest technology products to our users. 
Whether it's cutting-edge smartphones, budget accessories, or tech guides — we’ve got it all covered. 
We are driven by innovation, quality, and our love for technology.`;

  let i = 0;
  const speed = 35;
  const el = document.getElementById("aboutText");

  function typeEffect() {
    if (i < text.length) {
      el.innerHTML += text.charAt(i);
      i++;
      setTimeout(typeEffect, speed);
    }
  }

  typeEffect();
});