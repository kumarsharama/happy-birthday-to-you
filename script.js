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
const text = "You are one of the most special people in my life. I’m truly grateful to have you.";
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
