function scheduleBlink(waitTime = 5000) {
  const nextBlink = Math.random() * waitTime + 1000;
  setTimeout(() => {
    toggleBlink("images/blink.png");
    setTimeout(() => {
      toggleBlink("images/face.png");
      scheduleBlink(waitTime);
    }, Math.random() * 100 + 50);
  }, nextBlink);
}

function toggleBlink(src) {
  document.querySelector(".ajm-face").src = src;
}

document.addEventListener("DOMContentLoaded", () => {
  const ajmFace = document.querySelector(".ajm-face");
  ajmFace.addEventListener("mouseenter", () => toggleBlink("images/ahh.png"));
  ajmFace.addEventListener("mouseleave", () => toggleBlink("images/face.png"));
  scheduleBlink();
});