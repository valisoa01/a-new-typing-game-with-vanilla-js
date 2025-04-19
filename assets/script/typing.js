const phrases = {
  easy: [
    "The quick brown fox jumps over the lazy dog.",
    "Pack my box with five dozen liquor jugs.",
    "How vexingly quick daft zebras jump!",
    "Bright vixens jump; dozy fowl quack.",
    "Jackdaws love my big sphinx of quartz."
  ],
  medium: [
    "The five boxing wizards jump quickly.",
    "Crazy Fredrick bought many very exquisite opal jewels.",
    "We promptly judged antique ivory buckles for the next prize.",
    "A wizard's job is to vex chumps quickly in fog.",
    "Jaded zombies acted quaintly but kept driving their oxen forward."
  ],
  hard: [
    "Sphinx of black quartz, judge my vow.",
    "The quick onyx goblin jumps over the lazy dwarf.",
    "Brawny gods just flocked up to quiz and vex him.",
    "Foxy diva Jennifer Lopez wasn't baking my quiche.",
    "Two driven jocks help fax my big quiz."
  ]
};

let currentLevel = "easy";
let correct = 0;
let wrong = 0;
let total = 0;
let startTime = null;
let currentPhrase = "";
let currentWords = [];
let currentIndex = 0;
let timerInterval = null;
let elapsedSeconds = 0;

const typingInput = document.getElementById("typing-input");
const phraseContainer = document.getElementById("phrase");
const correctCount = document.getElementById("correct-count");
const wrongCount = document.getElementById("wrong-count");
const wpmDisplay = document.getElementById("wpm");
const timerDisplay = document.getElementById("timer");
const accuracyDisplay = document.getElementById("accuracy");
const progressRing = document.querySelector(".progress-ring__circle:last-child");
const levelButtons = document.querySelectorAll(".btn-level");
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

function normalizeText(text) {
  return text.replace(/[’‘]/g, "'").replace(/[“”]/g, '"');
}

function setLevel(level) {
  currentLevel = level;
  levelButtons.forEach((btn) => {
    btn.classList.remove("active", "btn-success", "btn-warning", "btn-danger");
    if (btn.textContent.trim().toLowerCase().includes(level)) {
      btn.classList.add("active");
      if (level === "easy") btn.classList.add("btn-success");
      if (level === "medium") btn.classList.add("btn-warning");
      if (level === "hard") btn.classList.add("btn-danger");
    }
  });
  resetGame();
}

function getRandomPhrase() {
  const list = phrases[currentLevel];
  return list[Math.floor(Math.random() * list.length)];
}

function renderWords() {
  phraseContainer.innerHTML = "";
  currentWords.forEach((word, index) => {
    const span = document.createElement("span");
    span.className = "word";
    span.textContent = word + (index < currentWords.length - 1 ? " " : "");
    if (index < currentIndex) {
      span.classList.add("correct");
    } else if (index === currentIndex) {
      span.classList.add("current");
    }
    phraseContainer.appendChild(span);
  });
}

function updateStats() {
  correctCount.textContent = correct;
  wrongCount.textContent = wrong;
  total = correct + wrong;
  const accuracy = total > 0 ? Math.round((correct / total) * 100) : 0;
  const dashoffset = 100 - accuracy;
  progressRing.style.strokeDashoffset = dashoffset;
  accuracyDisplay.textContent = `${accuracy}%`;

  if (startTime && elapsedSeconds > 0) {
    const minutes = elapsedSeconds / 60;
    const wpm = Math.round((correct / 5) / minutes);
    wpmDisplay.textContent = wpm;
  }
}

function showStatsPopup() {
  stopTimer();
  const endTime = new Date();
  const timeDiffInSeconds = startTime ? Math.round((endTime - startTime) / 1000) : 0;
  const accuracy = total === 0 ? 0 : Math.round((correct / total) * 100);
  const minutes = timeDiffInSeconds / 60;
  const wpm = minutes > 0 ? Math.round((correct / 5) / minutes) : 0;

  const popup = document.createElement("div");
  popup.classList.add("popup");
  popup.innerHTML = `
     <h2> Résultat</h2>
      <table class="stats-table">
     <tr><td>Mots corrects</td><td>${correct}</td></tr>
     <tr><td>Mots faux</td><td>${wrong}</td></tr>
    <tr><td>Précision</td><td>${accuracy}%</td></tr>
     <tr><td>Vitesse (WPM)</td><td>${wpm}</td></tr>
     </table>
     <button onclick="resetGame(); document.body.removeChild(this.parentElement)"> Rejouer</button>
    `;
  document.body.appendChild(popup);
}

function startTimer() {
  clearInterval(timerInterval);
  elapsedSeconds = 60;
  timerDisplay.textContent = "60s";

  timerInterval = setInterval(() => {
    elapsedSeconds--;
    timerDisplay.textContent = `${elapsedSeconds}s`;
    updateStats();
    if (elapsedSeconds == 0) {
      showStatsPopup();
    }
  }, 1000);
}

function stopTimer() {
  clearInterval(timerInterval);
}

function resetGame() {
  correct = 0;
  wrong = 0;
  currentIndex = 0;
  currentPhrase = getRandomPhrase();
  currentWords = normalizeText(currentPhrase).split(" ");

  renderWords();
  updateStats();

  typingInput.value = "";
  typingInput.focus();

  stopTimer();
  startTime = null;
}

function checkInput() {
  const inputValue = typingInput.value.trim();
  const currentWord = currentWords[currentIndex];

  if (inputValue === currentWord) {
    correct++;
    currentIndex++;
    typingInput.value = "";

    if (currentIndex >= currentWords.length) {
      currentPhrase = getRandomPhrase();
      currentWords = normalizeText(currentPhrase).split(" ");
      currentIndex = 0;
      renderWords();
    } else {
      renderWords();
    }
  } else if (currentWord.startsWith(inputValue)) {
    // partial correct, do nothing
  } else {
    wrong++;
    typingInput.value = "";

    const wordElements = document.querySelectorAll(".word");
    if (wordElements[currentIndex]) {
      wordElements[currentIndex].classList.add("wrong");
      setTimeout(() => {
        wordElements[currentIndex].classList.remove("wrong");
      }, 500);
    }
  }
  updateStats();
}

// Événements
typingInput.addEventListener("input", function () {
  if (!startTime) {
    startTime = new Date();
    startTimer();
  }
  checkInput();
});

typingInput.addEventListener("keydown", function (e) {
  if (e.key === " ") {
    e.preventDefault();
    checkInput();
  }
});

setLevel("easy");