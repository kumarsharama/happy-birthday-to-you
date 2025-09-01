// Typing Effect
const words = ["Happy Birthday!", "Wishing you joy 🎉", "Have a special day!"];
let i = 0;
let j = 0;
let currentWord = "";
let isDeleting = false;
const typed = document.getElementById("typed");

function type() {
  if (i < words.length) {
    if (!isDeleting && j <= words[i].length) {
      currentWord = words[i].substring(0, j++);
      typed.textContent = currentWord;
    } else if (isDeleting && j >= 0) {
      currentWord = words[i].substring(0, j--);
      typed.textContent = currentWord;
    }
    if (j === words[i].length + 1) {
      isDeleting = true;
      setTimeout(type, 1000);
      return;
    } else if (isDeleting && j === 0) {
      isDeleting = false;
      i++;
      if (i === words.length) i = 0;
    }
    setTimeout(type, isDeleting ? 50 : 150);
  }
}
type();

// Scroll Fade
const fadeElements = document.querySelectorAll(".scroll-fade");
window.addEventListener("scroll", () => {
  fadeElements.forEach(el => {
    if (el.getBoundingClientRect().top < window.innerHeight - 100) {
      el.classList.add("show");
    }
  });
});

// Cake Surprise
const surpriseBtn = document.getElementById("openSurprise");
if (surpriseBtn) {
  surpriseBtn.addEventListener("click", () => {
    const cake = document.querySelector(".cake-container");
    if (cake) cake.classList.add("show");

    // Play music
    const music = document.getElementById("bgMusic");
    if (music) music.play();

    // Confetti
    confetti({
      particleCount: 150,
      spread: 100,
      origin: { y: 0.6 }
    });
  });
}

// Swiper Slider
new Swiper(".mySwiper", {
  loop: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});
