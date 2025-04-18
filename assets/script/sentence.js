const characters = [
  'a','b','c','d','e','f','g','h','i','j',
  'k','l','m','n','o','p','q','r','s','t',
  'u','v','w','x','y','z','A','B','C','D',
  'E','F','G','H','I','J','K','L','M','N',
  'O','P','Q','R','S','T','U','V','W','X',
  'Y','Z','1','2','3','4','5','6','7','8','9'
];

let correct = 0;
let wrong = 0;
let total = 0;
let elapsedSeconds = 60;
let startTime = null;
let timerInterval = null;

const typingInput = document.getElementById("typing-input");
const phraseContainer = document.getElementById("phrase");
const correctCount = document.getElementById("correct-count");
const wrongCount = document.getElementById("wrong-count");
const wpmDisplay = document.getElementById("wpm");
const accuracyDisplay = document.getElementById("accuracy");
const timerDisplay = document.getElementById("timer");
const progressRing = document.querySelector(".progress-ring__circle:last-child");
const themeToggle = document.getElementById("checkbox");
const toggleIcon = document.getElementById("toggle-icon");

themeToggle.addEventListener("change", function () {
  if (this.checked) {
    document.documentElement.setAttribute("data-theme", "dark");
    toggleIcon.innerHTML = '<i class="fas fa-moon"></i>';
  } else {
    document.documentElement.setAttribute("data-theme", "light");
    toggleIcon.innerHTML = '<i class="fas fa-sun"></i>';
  }
});

function getRandomChar() {
  return characters[Math.floor(Math.random() * characters.length)];
}

function renderChar(char) {
  phraseContainer.innerHTML = "";
  const span = document.createElement("span");
  span.className = "word current";
  span.textContent = char;
  phraseContainer.appendChild(span);
}

let currentChar = getRandomChar();
renderChar(currentChar);

function updateStats() {
  correctCount.textContent = correct;
  wrongCount.textContent = wrong;
  total = correct + wrong;

  const accuracy = total > 0 ? Math.round((correct / total) * 100) : 0;
  accuracyDisplay.textContent = `${accuracy}%`;

  const dashoffset = 100 - accuracy;
  progressRing.style.strokeDashoffset = dashoffset;

  const minutes = (60 - elapsedSeconds) / 60;
  const wpm = minutes > 0 ? Math.round((correct / 5) / minutes) : 0;
  wpmDisplay.textContent = wpm;
}

function startTimer() {
  timerDisplay.textContent = "60s";
  timerInterval = setInterval(() => {
    elapsedSeconds--;
    timerDisplay.textContent = `${elapsedSeconds}s`;
    updateStats();
    if (elapsedSeconds === 0) {
      clearInterval(timerInterval);
      showStatsPopup();
    }
  }, 1000);
}

function showStatsPopup() {
  const accuracy = total > 0 ? Math.round((correct / total) * 100) : 0;
  const wpm = Math.round((correct / 5) / ((60 - elapsedSeconds) / 60));
  const popup = document.createElement("div");
  popup.classList.add("popup");
  popup.innerHTML = `
    <h2>Résultat</h2>
    <table class="stats-table">
      <tr><td>Caractères corrects</td><td>${correct}</td></tr>
      <tr><td>Caractères faux</td><td>${wrong}</td></tr>
      <tr><td>Précision</td><td>${accuracy}%</td></tr>
      <tr><td>Vitesse (WPM)</td><td>${wpm}</td></tr>
    </table>
    <button onclick="resetGame(); document.body.removeChild(this.parentElement)">Rejouer</button>
  `;
  document.body.appendChild(popup);
}

function resetGame() {
  correct = 0;
  wrong = 0;
  total = 0;
  elapsedSeconds = 60;
  clearInterval(timerInterval);
  startTime = null;
  typingInput.value = "";
  typingInput.focus();
  currentChar = getRandomChar();
  renderChar(currentChar);
  updateStats();
}

typingInput.addEventListener("input", function () {
  if (!startTime) {
    startTime = new Date();
    startTimer();
  }

  const inputChar = typingInput.value.trim();
  if (inputChar.length === 0) return;

  if (inputChar === currentChar) {
    correct++;
  } else {
    wrong++;
  }

  currentChar = getRandomChar();
  renderChar(currentChar);
  typingInput.value = "";

  updateStats();
});
