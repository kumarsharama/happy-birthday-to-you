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
