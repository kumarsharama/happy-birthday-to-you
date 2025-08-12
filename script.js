// -------------------- COUNTDOWN TIMER --------------------
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

// -------------------- TYPING EFFECT --------------------
const text = "You are one of the most special people in my life. I’m truly grateful to have you for some time only but at least I have.";
let i = 0;
function typeMessage() {
  if (i < text.length) {
    document.getElementById("typed-message").innerHTML += text.charAt(i);
    i++;
    setTimeout(typeMessage, 50);
  }
}
typeMessage();

// -------------------- CONFETTI BURST ON LOAD --------------------
confetti({
  particleCount: 150,
  spread: 70,
  origin: { y: 0.6 }
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

// -------------------- SWIPER SLIDESHOW --------------------
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

// -------------------- MUSIC FADE-IN --------------------
document.addEventListener("click", function playMusic() {
  let audio = document.getElementById("bg-music");
  if (!audio) return;

  audio.muted = false; // Unmute
  audio.volume = 0;    // Start from 0 volume

  let fadeAudio = setInterval(function () {
    if (audio.volume < 1) {
      audio.volume = Math.min(1, audio.volume + 0.05);
    } else {
      clearInterval(fadeAudio);
    }
  }, 200);

  audio.play().catch(err => console.error("Music play error:", err));
  document.removeEventListener("click", playMusic); // Only run once
});

// -------------------- EXTRA CONFETTI LAUNCH --------------------
function launchConfetti() {
  const colors = ['#ff0', '#0f0', '#00f', '#f0f', '#0ff', '#f00'];
  for (let i = 0; i < 50; i++) {
    const confettiPiece = document.createElement('div');
    confettiPiece.className = 'confetti-piece';
    confettiPiece.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    confettiPiece.style.left = Math.random() * 100 + 'vw';
    confettiPiece.style.animationDuration = (2 + Math.random() * 3) + 's';
    document.body.appendChild(confettiPiece);

    setTimeout(() => {
      confettiPiece.remove();
    }, 5000);
  }
}
window.addEventListener('load', () => {
  launchConfetti();
});

// -------------------- ROMANTIC "OUR SPECIAL MOMENT" BUTTON --------------------
document.addEventListener("DOMContentLoaded", function () {
  const momentBtn = document.createElement("button");
  momentBtn.innerText = "💖 Our Special Moment 💖";
  momentBtn.style.position = "fixed";
  momentBtn.style.bottom = "20px";
  momentBtn.style.right = "20px";
  momentBtn.style.padding = "12px 20px";
  momentBtn.style.background = "linear-gradient(45deg, #ff4b6e, #ff7eb3)";
  momentBtn.style.color = "white";
  momentBtn.style.border = "none";
  momentBtn.style.borderRadius = "30px";
  momentBtn.style.boxShadow = "0 4px 15px rgba(0,0,0,0.3)";
  momentBtn.style.cursor = "pointer";
  momentBtn.style.fontSize = "16px";
  momentBtn.style.zIndex = "9999";
  momentBtn.style.transition = "transform 0.2s ease-in-out";

  momentBtn.addEventListener("mouseenter", () => {
    momentBtn.style.transform = "scale(1.1)";
  });
  momentBtn.addEventListener("mouseleave", () => {
    momentBtn.style.transform = "scale(1)";
  });

  momentBtn.addEventListener("click", function () {
    const overlay = document.createElement("div");
    overlay.style.position = "fixed";
    overlay.style.top = "0";
    overlay.style.left = "0";
    overlay.style.width = "100%";
    overlay.style.height = "100%";
    overlay.style.background = "rgba(0,0,0,0.7)";
    overlay.style.display = "flex";
    overlay.style.justifyContent = "center";
    overlay.style.alignItems = "center";
    overlay.style.zIndex = "10000";

    const modal = document.createElement("div");
    modal.style.background = "white";
    modal.style.padding = "20px";
    modal.style.borderRadius = "20px";
    modal.style.textAlign = "center";
    modal.style.maxWidth = "400px";
    modal.style.boxShadow = "0 4px 20px rgba(0,0,0,0.4)";

    modal.innerHTML = `
      <h2 style="color:#ff4b6e;">💖 Our Special Moment 💖</h2>
      <p style="font-size: 16px; color: #333;">From the day we met to this beautiful day, every moment with you has been magical. Here's to many more!</p>
      <img src="https://media.tenor.com/1r3L2PQl0L4AAAAC/love-heart.gif" style="max-width: 100%; border-radius: 10px; margin: 15px 0;">
      <button id="closeMoment" style="background:#ff4b6e;color:white;padding:8px 15px;border:none;border-radius:10px;cursor:pointer;">Close</button>
    `;

    overlay.appendChild(modal);
    document.body.appendChild(overlay);

    document.getElementById("closeMoment").addEventListener("click", () => {
      overlay.remove();
    });
  });

  document.body.appendChild(momentBtn);
});
document.addEventListener("DOMContentLoaded", () => {
  const optionButtons = document.querySelectorAll(".option-btn");
  const submitBtn = document.getElementById("submit-choice");
  const noteField = document.getElementById("visitor-note");
  const responseMsg = document.getElementById("choice-response");

  let selectedOption = null;

  optionButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      optionButtons.forEach(b => b.classList.remove("selected"));
      btn.classList.add("selected");
      selectedOption = btn.getAttribute("data-choice");
      checkReady();
      responseMsg.textContent = ""; // Clear previous message
    });
  });

  function checkReady() {
    if (selectedOption && noteField.value.trim().length > 0) {
      submitBtn.disabled = false;
    } else {
      submitBtn.disabled = true;
    }
  }

  noteField.addEventListener("input", checkReady);

  submitBtn.addEventListener("click", () => {
    if (!selectedOption || noteField.value.trim() === "") return;

    // For demo, just show a thank you message.
    responseMsg.textContent = `Thank you for choosing "${selectedOption}" and your message! 👻`;
    // Optionally, here you can send data to your server or service

    // Reset
    optionButtons.forEach(b => b.classList.remove("selected"));
    selectedOption = null;
    noteField.value = "";
    submitBtn.disabled = true;
  });
});
