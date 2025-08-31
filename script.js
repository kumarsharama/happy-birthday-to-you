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

// -------------------- SAFE CONFETTI --------------------
function safeConfetti(opts) {
  if (typeof confetti === 'function') {
    try { confetti(opts); } catch (e) { console.warn('confetti failed', e); }
  } else {
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
  setTimeout(() => heart.remove(), 5000);
}
setInterval(createHeart, 600);

// -------------------- SWIPER --------------------
function initSwiper() {
  try {
    if (typeof Swiper === 'function') {
      new Swiper(".mySwiper", {
        loop: true,
        centeredSlides: true,
        grabCursor: true,
        effect: "fade",
        fadeEffect: { crossFade: true },
        speed: 1200,
        autoplay: { delay: 2500, disableOnInteraction: false },
        pagination: { el: ".swiper-pagination", clickable: true },
        navigation: { nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" }
      });
    }
  } catch (err) {
    console.error('Swiper init error', err);
  }
}
window.addEventListener('load', initSwiper);

// -------------------- MUSIC FADE-IN --------------------
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

// -------------------- CONFETTI FALLBACK --------------------
function launchConfetti() {
  if (typeof confetti === 'function') {
    confetti({ particleCount: 80, spread: 50, origin: { y: 0.4 } });
    return;
  }
  const colors = ['#ff0', '#0f0', '#00f', '#f0f', '#0ff', '#f00'];
  for (let i = 0; i < 40; i++) {
    const piece = document.createElement('div');
    piece.className = 'confetti-piece';
    piece.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    piece.style.left = Math.random() * 100 + 'vw';
    piece.style.animationDuration = (2 + Math.random() * 3) + 's';
    piece.style.top = (Math.random() * 20) + 'vh';
    document.body.appendChild(piece);
    setTimeout(() => { piece.remove(); }, 5000);
  }
}
window.addEventListener('load', () => setTimeout(launchConfetti, 600));

// -------------------- STARFIELD --------------------
let starCanvas, starCtx, stars = [], raf = null;  // FIX: renamed ctx -> starCtx
const DPR = Math.min(window.devicePixelRatio || 1, 2);

function resizeStars() {
  if (!starCanvas) return;
  const { width, height } = starCanvas.parentElement.getBoundingClientRect();
  starCanvas.width = Math.max(1, Math.floor(width * DPR));
  starCanvas.height = Math.max(1, Math.floor(height * DPR));
  starCanvas.style.width = width + 'px';
  starCanvas.style.height = height + 'px';
  const base = Math.min(160, Math.floor((width * height) / 6000));
  const mobileCap = window.matchMedia('(max-width: 720px)').matches ? 80 : base;
  const count = Math.max(60, Math.min(160, mobileCap));
  stars = Array.from({ length: count }, () => ({
    x: Math.random() * starCanvas.width,
    y: Math.random() * starCanvas.height,
    r: (Math.random() * 1.2 + 0.4) * DPR,
    s: Math.random() * 0.25 + 0.05,
    a: Math.random() * Math.PI * 2,
    t: Math.random() * 0.02 + 0.01
  }));
}

function drawStars() {
  const w = starCanvas.width, h = starCanvas.height;
  starCtx.clearRect(0, 0, w, h);
  const g = starCtx.createRadialGradient(w*0.6, h*0.4, 10, w*0.6, h*0.4, Math.max(w,h)*0.7);
  g.addColorStop(0, 'rgba(255,255,255,0.04)');
  g.addColorStop(1, 'rgba(255,255,255,0.00)');
  starCtx.fillStyle = g;
  starCtx.fillRect(0,0,w,h);
  for (const st of stars) {
    st.y += st.s;
    st.x += Math.sin(st.a) * 0.05;
    st.a += st.t;
    if (st.y > h + 2) { st.y = -2; st.x = Math.random() * w; }
    const alpha = 0.35 + Math.sin(st.a) * 0.25;
    starCtx.beginPath();
    starCtx.arc(st.x, st.y, st.r, 0, Math.PI * 2);
    starCtx.fillStyle = `rgba(255,255,255,${alpha})`;
    starCtx.fill();
  }
  raf = requestAnimationFrame(drawStars);
}

function startStars() {
  if (!starCanvas) {
    const stage = document.querySelector('.lb-stage');
    if (!stage) return;
    starCanvas = document.createElement('canvas');
    starCanvas.id = 'lbStars';
    stage.prepend(starCanvas);
    starCtx = starCanvas.getContext('2d');
  }
  cancelAnimationFrame(raf);
  resizeStars();
  raf = requestAnimationFrame(drawStars);
}

function stopStars() {
  cancelAnimationFrame(raf);
  raf = null;
  if (starCtx) starCtx.clearRect(0,0,starCanvas.width, starCanvas.height);
}

window.addEventListener('resize', () => {
  if (starCanvas && !document.querySelector('.lb').classList.contains('hidden')) {
    resizeStars();
  }
});

// -------------------- SPECIAL MOMENT BUTTON --------------------
document.addEventListener("DOMContentLoaded", function () {
  const momentBtn = document.createElement("button");
  momentBtn.innerText = "💖 Our Special Moment 💖";
  momentBtn.className = 'btn btn-primary';
  Object.assign(momentBtn.style, {
    position: "fixed", bottom: "20px", right: "20px", padding: "12px 20px",
    borderRadius: "30px", zIndex: "9999", cursor: "pointer"
  });
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

// -------------------- SPECIAL QUESTION --------------------
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
  document.querySelector(".question-section")?.appendChild(btn);
}

// -------------------- FADE UP --------------------
const faders = document.querySelectorAll('.fade-up');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });
faders.forEach(f => observer.observe(f));

// -------------------- SURPRISE BUTTON --------------------
document.getElementById('startBtn')?.addEventListener('click', () => {
  document.getElementById('bgMusic')?.play();
  if (typeof confetti === 'function') {
    confetti({ particleCount: 200, spread: 80, origin: { y: 0.6 } });
  }
});

// -------------------- SECTION FADE --------------------
const sections = document.querySelectorAll('section');
window.addEventListener('scroll', () => {
  sections.forEach(section => {
    if (section.getBoundingClientRect().top < window.innerHeight - 100) {
      section.classList.add('show');
    }
  });
});

// -------------------- HEARTS --------------------
const heartsContainer = document.getElementById('hearts');
if (heartsContainer) {
  setInterval(()=>{ const h = document.createElement('div');
    h.className = 'heart';
    h.style.left = Math.random() * window.innerWidth + 'px';
    heartsContainer.appendChild(h);
    setTimeout(() => h.remove(), 4000);
  }, 300);
}

// -------------------- SURPRISE CAKE --------------------
const surpriseBtn = document.getElementById('openSurprise');
if (surpriseBtn) {
  surpriseBtn.addEventListener('click', () => {
    const cake = document.querySelector('.cake-container');
    if (cake) cake.classList.add('show');
  });
}

// -------------------- SCROLL FADE --------------------
const fadeElements = document.querySelectorAll('.scroll-fade');
window.addEventListener('scroll', () => {
  fadeElements.forEach(el => {
    if (el.getBoundingClientRect().top < window.innerHeight - 100) {
      el.classList.add('show');
    }
  });
});
// -------------------- SURPRISE CAKE --------------------
const surpriseBtn = document.getElementById('openSurprise');
if (surpriseBtn) {
  surpriseBtn.addEventListener('click', () => {
    const cake = document.querySelector('.cake-container');
    const flame = document.querySelector('.candle-flame');

    if (cake) {
      cake.classList.add('show'); // Cake fades in

      // Candle flickers first, then blow out after 3s
      setTimeout(() => {
        if (flame) flame.classList.add('blow-out');
      }, 3000);

      // Cake explodes after 6s 🎉
      setTimeout(() => {
        const cakeImg = cake.querySelector('.cake');
        if (cakeImg) cakeImg.classList.add('explode');

        // Confetti effect
        if (typeof confetti === 'function') {
          confetti({ particleCount: 200, spread: 80, origin: { y: 0.6 } });
        } else {
          console.log("Confetti library not loaded.");
        }
      }, 6000);
    }
  });
}
