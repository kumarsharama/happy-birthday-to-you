// -------------------- COUNTDOWN TIMER --------------------
const end = new Date();
end.setHours(23, 59, 59);

function updateCountdown() {
  const now = new Date();
  const diff = end - now;

  if (diff <= 0) {
    const t = document.getElementById("timer");
    if (t) t.textContent = "Happy Birthday Completed 🎉";
    return;
  }

  const hours = Math.floor(diff / 1000 / 60 / 60);
  const mins = Math.floor((diff / 1000 / 60) % 60);
  const secs = Math.floor((diff / 1000) % 60);

  const el = document.getElementById("timer");
  if (el) el.textContent = `${hours}h ${mins}m ${secs}s`;
}
setInterval(updateCountdown, 1000);
updateCountdown();

// -------------------- TYPING EFFECT --------------------
const text = "You are one of the most special people in my life. I’m truly grateful to have you for some time only but at least I have.";
let i = 0;
function typeMessage() {
  const target = document.getElementById("typed-message");
  if (!target) return;
  if (i < text.length) {
    target.innerHTML += text.charAt(i);
    i++;
    setTimeout(typeMessage, 40);
  }
}
typeMessage();

// -------------------- SAFE CONFETTI (only when lib loaded) --------------------
function safeConfetti(opts) {
  if (typeof confetti === 'function') {
    try { confetti(opts); } catch (e) { console.warn('confetti failed', e); }
  } else {
    // fallback: small burst of DOM confetti pieces (handled elsewhere)
    launchConfetti();
  }
}
safeConfetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });

// -------------------- FLOATING HEARTS --------------------
function createHeart() {
  const heart = document.createElement('div');
  heart.className = 'floating-heart';
  heart.innerHTML = '❤️';
  heart.style.left = Math.random() * 95 + 'vw';
  heart.style.animationDuration = (3 + Math.random() * 2) + 's';
  document.body.appendChild(heart);

  setTimeout(() => {
    heart.remove();
  }, 5000);
}
setInterval(createHeart, 600);

// -------------------- SWIPER SLIDESHOW (guarded) --------------------
function initSwiper() {
  try {
    if (typeof Swiper === 'function') {
      // eslint-disable-next-line no-undef
      const swiper = new Swiper(".mySwiper", {
        loop: true,
        autoplay: { delay: 3000, disableOnInteraction: false },
        pagination: { el: ".swiper-pagination", clickable: true },
        navigation: { nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" },
      });
    } else {
      console.warn('Swiper not available — slides will remain static.');
    }
  } catch (err) {
    console.error('Swiper init error', err);
  }
}
window.addEventListener('load', initSwiper);

// -------------------- MUSIC FADE-IN (fixed ID to match HTML) --------------------
document.addEventListener("click", function playMusic() {
  let audio = document.getElementById("bgMusic");
  if (!audio) return;

  audio.muted = false;
  audio.volume = 0;

  let fadeAudio = setInterval(function () {
    if (audio.volume < 1) {
      audio.volume = Math.min(1, audio.volume + 0.05);
    } else {
      clearInterval(fadeAudio);
    }
  }, 200);

  audio.play().catch(err => console.error("Music play error:", err));
  document.removeEventListener("click", playMusic);
});

// -------------------- EXTRA CONFETTI LAUNCH (DOM-fallback) --------------------
function launchConfetti() {
  if (typeof confetti === 'function') {
    // small complementary burst
    confetti({ particleCount: 80, spread: 50, origin: { y: 0.4 } });
    return;
  }
  const colors = ['#ff0', '#0f0', '#00f', '#f0f', '#0ff', '#f00'];
  for (let i = 0; i < 40; i++) {
    const confettiPiece = document.createElement('div');
    confettiPiece.className = 'confetti-piece';
    confettiPiece.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    confettiPiece.style.left = Math.random() * 100 + 'vw';
    confettiPiece.style.animationDuration = (2 + Math.random() * 3) + 's';
    confettiPiece.style.top = (Math.random() * 20) + 'vh';
    document.body.appendChild(confettiPiece);

    setTimeout(() => {
      confettiPiece.remove();
    }, 5000);
  }
}
window.addEventListener('load', () => {
  setTimeout(launchConfetti, 600);
});

// -------------------- "OUR SPECIAL MOMENT" BUTTON (kept) --------------------
document.addEventListener("DOMContentLoaded", function () {
  const momentBtn = document.createElement("button");
  momentBtn.innerText = "💖 Our Special Moment 💖";
  momentBtn.className = 'btn btn-primary';
  Object.assign(momentBtn.style, {
    position: "fixed", bottom: "20px", right: "20px", padding: "12px 20px",
    borderRadius: "30px", zIndex: "9999", cursor: "pointer"
  });

  momentBtn.addEventListener("mouseenter", () => momentBtn.style.transform = "scale(1.06)");
  momentBtn.addEventListener("mouseleave", () => momentBtn.style.transform = "scale(1)");

  momentBtn.addEventListener("click", function () {
    const overlay = document.createElement("div");
    Object.assign(overlay.style, {
      position: "fixed", top: 0, left: 0, width: "100%", height: "100%", background: "rgba(0,0,0,0.7)",
      display: "flex", justifyContent: "center", alignItems: "center", zIndex: 10000
    });

    const modal = document.createElement("div");
    Object.assign(modal.style, {
      background: "white", padding: "20px", borderRadius: "12px", textAlign: "center", maxWidth: "420px"
    });

    modal.innerHTML = `
      <h2 style="color:#ff4b6e;">💖 Our Special Moment 💖</h2>
      <p style="font-size: 15px; color: #333;">From the day we met to this beautiful day, every moment with you has been magical. Here's to many more!</p>
      <img src="https://media.tenor.com/1r3L2PQl0L4AAAAC/love-heart.gif" style="max-width:100%; border-radius:8px; margin:14px 0;">
      <button id="closeMoment" class="btn btn-outline" style="margin-top:6px;">Close</button>
    `;
    overlay.appendChild(modal);
    document.body.appendChild(overlay);

    document.getElementById("closeMoment").addEventListener("click", () => overlay.remove());
  });

  document.body.appendChild(momentBtn);
});

// -------------------- CHOICE SECTION HANDLING (kept) --------------------
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
      if (responseMsg) responseMsg.textContent = "";
    });
  });

  function checkReady() {
    if (selectedOption && noteField && noteField.value.trim().length > 0) {
      submitBtn.disabled = false;
    } else {
      if (submitBtn) submitBtn.disabled = true;
    }
  }

  if (noteField) noteField.addEventListener("input", checkReady);

  if (submitBtn) submitBtn.addEventListener("click", () => {
    if (!selectedOption || !noteField || noteField.value.trim() === "") return;
    if (responseMsg) responseMsg.textContent = `Thank you for choosing "${selectedOption}" and your message! 👻`;
    optionButtons.forEach(b => b.classList.remove("selected"));
    selectedOption = null;
    noteField.value = "";
    submitBtn.disabled = true;
  });
});
