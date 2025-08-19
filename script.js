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
        centeredSlides: true,
        grabCursor: true,

        // Smooth fade effect with zoom compatibility
        effect: "fade",
        fadeEffect: { crossFade: true },

        // Slower, premium transition speed
        speed: 1200,

        autoplay: {
          delay: 2500, // shorter display per image
          disableOnInteraction: false
        },

        pagination: {
          el: ".swiper-pagination",
          clickable: true
        },

        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        }
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
// -------------------- SPECIAL QUESTION HANDLING --------------------
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("special-question-form");
  if (!form) return;

  form.addEventListener("submit", e => {
    e.preventDefault();
    const answer = form.specialAnswer.value;
    if (answer === "Yes") {
      showSpecialMomentButton();
    } else {
      alert("Maybe next time! 😊");
    }
  });
});

function showSpecialMomentButton() {
  const btn = document.createElement("a");
  btn.href = "special.html";
  btn.innerText = "💖 Our Special Moment 💖";
  btn.className = "btn btn-primary";
  btn.style.display = "inline-block";
  btn.style.marginTop = "20px";
  document.querySelector(".question-section").appendChild(btn);
}
// ===== LIGHTBOX for photos (tap to open, blur background, slideshow) =====
(() => {
  const overlay = document.getElementById('lb');
  if (!overlay) return; // only on pages where we added the markup

  const body = document.body;
  const imgEl = document.getElementById('lbImg');
  const closeBtn = document.getElementById('lbClose');
  const prevBtn = document.getElementById('lbPrev');
  const nextBtn = document.getElementById('lbNext');
  const nowEl = document.getElementById('lbNow');
  const totalEl = document.getElementById('lbTotal');

  const autoplayToggle = document.getElementById('lbAutoplay');
  const addFileBtn = document.getElementById('lbAddFileBtn');
  const fileInput = document.getElementById('lbFile');
  const urlInput = document.getElementById('lbUrl');
  const addUrlBtn = document.getElementById('lbAddUrlBtn');

// Collect initial images from either Swiper (index.html) or special-gallery (special.html)
const galleryNodes = document.querySelectorAll(
  '.swiper .swiper-slide img, .special-gallery img'
);
const images = Array.from(galleryNodes)
  .map(img => img.getAttribute('src'))
  .filter(Boolean);

  // Fallback (in case an image is missing) — optional
  const FALLBACK = 'assets/placeholder-image.png';

  let idx = 0;
  let autoplayTimer = null;
  function show(i) {
    if (!images.length) return;
    idx = (i + images.length) % images.length;
    const src = images[idx];
    imgEl.src = src;
    imgEl.onerror = () => { if (FALLBACK) imgEl.src = FALLBACK; };
    nowEl.textContent = String(idx + 1);
    totalEl.textContent = String(images.length);
  }

  function openAt(i) {
    if (!images.length) return;
    overlay.classList.remove('hidden');
    overlay.setAttribute('aria-hidden', 'false');
    body.classList.add('lightbox-open');
    startStars();
    show(i);
    if (autoplayToggle.checked) startAutoplay();
  }
  function close() {
    overlay.classList.add('hidden');
    overlay.setAttribute('aria-hidden', 'true');
    body.classList.remove('lightbox-open');
    stopStars();
    stopAutoplay();
  }

  function next() { show(idx + 1); }
  function prev() { show(idx - 1); }

  function startAutoplay() {
    stopAutoplay();
    autoplayTimer = setInterval(next, 2500);
  }
  function stopAutoplay() {
    if (autoplayTimer) clearInterval(autoplayTimer);
    autoplayTimer = null;
  }

  // Wire clicks on existing photos
galleryNodes.forEach((node, i) => {
  node.style.cursor = 'zoom-in';
  node.addEventListener('click', () => openAt(i));
});

  // Controls
  closeBtn.addEventListener('click', close);
  nextBtn.addEventListener('click', next);
  prevBtn.addEventListener('click', prev);

  // Keyboard support
  document.addEventListener('keydown', (e) => {
    if (overlay.classList.contains('hidden')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowRight') next();
    if (e.key === 'ArrowLeft') prev();
  });

  // Click on dark area (outside image) closes
  overlay.addEventListener('click', (e) => {
    const withinStage = e.target.closest('.lb-stage');
    if (!withinStage) close();
  });

  // Autoplay toggle
  autoplayToggle.addEventListener('change', () => {
    if (autoplayToggle.checked) startAutoplay();
    else stopAutoplay();
  });

  // Add more: from device
  addFileBtn.addEventListener('click', () => fileInput.click());
  fileInput.addEventListener('change', () => {
    const files = Array.from(fileInput.files || []);
    files.forEach(f => {
      const reader = new FileReader();
      reader.onload = () => {
        images.push(reader.result);
        totalEl.textContent = String(images.length);
      };
      reader.readAsDataURL(f);
    });
    if (overlay.classList.contains('hidden') && images.length) openAt(images.length - 1);
  });

  // Add more: from URL
  addUrlBtn.addEventListener('click', () => {
    const url = (urlInput.value || '').trim();
    if (!url) return;
    images.push(url);
    urlInput.value = '';
    totalEl.textContent = String(images.length);
    if (overlay.classList.contains('hidden')) openAt(images.length - 1);
  });
})();
