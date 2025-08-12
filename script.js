// Countdown Timer
const end = new Date();
end.setHours(23, 59, 59);

function updateCountdown() {
  const now = new Date();
  const diff = end - now;

  if (diff <= 0) {
    document.getElementById("timer").textContent = "Happy Birthday Completed 🎉";
    return;
  }

  const hours = Math.floor(diff / 1000 / 60 / 60);
  const mins = Math.floor((diff / 1000 / 60) % 60);
  const secs = Math.floor((diff / 1000) % 60);

  document.getElementById("timer").textContent = `${hours}h ${mins}m ${secs}s`;
}
setInterval(updateCountdown, 1000);
updateCountdown();

// Typing effect
const text = "You are one of the most special people in my life. I’m truly grateful to have you for somtime only but atleast i have .";
let i = 0;
function typeMessage() {
  if (i < text.length) {
    document.getElementById("typed-message").innerHTML += text.charAt(i);
    i++;
    setTimeout(typeMessage, 50);
  }
}
typeMessage();
// Confetti burst on page load
confetti({
  particleCount: 150,
  spread: 70,
  origin: { y: 0.6 }
});
// Generate floating hearts periodically
function createHeart() {
  const heartsContainer = document.querySelector('.hearts');
  const heart = document.createElement('div');
  heart.classList.add('heart');
  
  // Random horizontal position
  heart.style.left = Math.random() * 100 + 'vw';
  
  // Random animation duration between 4-7s
  heart.style.animationDuration = (4 + Math.random() * 3) + 's';
  
  heartsContainer.appendChild(heart);
  
  // Remove heart after animation ends (5s max)
  setTimeout(() => {
    heart.remove();
  }, 7000);
}

// Create container for hearts in index.html body (add this line inside <body> container)
// Start floating hearts every 500ms
setInterval(createHeart, 500);
const swiper = new Swiper(".mySwiper", {
  loop: true,
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});
document.addEventListener("click", function playMusic() {
    let audio = document.getElementById("bg-music");
    audio.muted = false; // Unmute
    audio.volume = 0;    // Start from 0 volume

    let fadeAudio = setInterval(function () {
        if (audio.volume < 1) {
            audio.volume = Math.min(1, audio.volume + 0.05);
        } else {
            clearInterval(fadeAudio);
        }
    }, 200); // Increase volume every 200ms

    audio.play();
    document.removeEventListener("click", playMusic); // Only run once
});
// -------------------- FLOATING HEARTS --------------------
function createHeart() {
    const heart = document.createElement('div');
    heart.className = 'floating-heart';
    heart.innerHTML = '❤️';
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.animationDuration = (3 + Math.random() * 2) + 's';
    document.body.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 5000);
}

setInterval(createHeart, 500);

// -------------------- CONFETTI --------------------
function launchConfetti() {
    const colors = ['#ff0', '#0f0', '#00f', '#f0f', '#0ff', '#f00'];
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti-piece';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.animationDuration = (2 + Math.random() * 3) + 's';
        document.body.appendChild(confetti);

        setTimeout(() => {
            confetti.remove();
        }, 5000);
    }
}

// Optional: Launch confetti when page loads
window.addEventListener('load', () => {
    launchConfetti();
});
