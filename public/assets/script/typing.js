const phrases = {
  easy: [
    "Le rapide renard brun saute par-dessus le chien paresseux.",
    "Emballez ma boîte avec cinq douzaines de cruches de liqueur.",
    "Comme les zèbres sautent vite et bizarrement !",
    "Des renardes vives sautent ; des volailles somnolentes cancanent.",
    "Les choucas aiment mon grand sphinx de quartz."
  ],
  medium: [
    "Les cinq sorciers de boxe sautent rapidement.",
    "Fredrick le fou a acheté de très magnifiques bijoux en opale.",
    "Nous avons rapidement jugé des boucles d'ivoire antiques pour le prochain prix.",
    "Le travail d’un sorcier est d’énerver rapidement les idiots dans le brouillard.",
    "Des zombies blasés agissaient avec originalité mais continuaient à pousser leurs bœufs."
  ],
  hard: [
    "Sphinx de quartz noir, juge mon serment.",
    "Le gobelin onyx rapide saute par-dessus le nain paresseux.",
    "Des dieux musclés sont juste arrivés pour le questionner et l’irriter.",
    "La diva sexy Jennifer Lopez ne faisait pas cuire ma quiche.",
    "Deux sportifs motivés m’aident à envoyer mon grand quiz par fax."
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

  if (startTime) {
    const now = new Date();
    const secondsElapsed = Math.round((now - startTime) / 1000);
    const minutes = secondsElapsed / 60;
    const wpm = minutes > 0 ? Math.round((correct / 5) / minutes) : 0;
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
     <h2> Résultat </h2>
     <table class="stats-table">
        <tr><td>Mots corrects</td><td>${correct}</td></tr>
        <tr><td>Mots incorrects</td><td>${wrong}</td></tr>
        <tr><td>Précision</td><td>${accuracy}%</td></tr>
        <tr><td>Vitesse (MPM)</td><td>${wpm}</td></tr>
     </table>
     <button onclick="resetGame(); document.body.removeChild(this.parentElement)"> Rejouer </button>
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
