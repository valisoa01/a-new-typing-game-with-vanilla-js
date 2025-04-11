const phrases = {
  easy: [
    "Oh my! I don't expect to see you here.",
    "The sky is blue.",
    "I love typing fast."
  ],
  medium: [
    "Sometimes life gives you lemons, and you make lemonade.",
    "Typing improves with daily practice and focus.",
    "She sells seashells by the seashore."
  ],
  hard: [
    "It's not the load that breaks you down, it's the way you carry it.",
    "Supercalifragilisticexpialidocious is a long word.",
    "Efficiency is doing better what is already being done."
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

// Fonction pour normaliser les apostrophes
function normalizeApostrophes(text) {
  return text.replace(/[’‘]/g, "'"); // remplace ’ ou ‘ par '
}

function setLevel(level) {
  currentLevel = level;
  resetGame();
}

function getRandomPhrase() {
  const list = phrases[currentLevel];
  return list[Math.floor(Math.random() * list.length)];
}

function renderWords() {
  const container = document.getElementById("phrase");
  container.innerHTML = "";

  currentWords.forEach((word, index) => {
    const span = document.createElement("span");
    span.textContent = word + " ";
    span.classList.add("word");

    if (index < currentIndex) {
      span.classList.add("correct");
    } else if (index === currentIndex) {
      span.classList.add("current");
    }

    container.appendChild(span);
  });
}

function updatePhrase() {
  currentPhrase = getRandomPhrase();
  currentWords = currentPhrase.split(" ");
  currentIndex = 0;
  renderWords();
}

document.getElementById("levelSelect").addEventListener("change", function () {
  const selectedLevel = this.value;
  setLevel(selectedLevel);
});

function updateStats() {
  document.getElementById("correct").textContent = correct;
  document.getElementById("wrong").textContent = wrong;
  const accuracy = total === 0 ? 0 : Math.round((correct / total) * 100);
  document.getElementById("accuracy").textContent = accuracy;

  const elapsedTime = (Date.now() - startTime) / 60000;
  const speed = elapsedTime > 0 ? Math.round(correct / elapsedTime) : 0;
  document.getElementById("speed").textContent = speed;
}

function resetGame() {
  correct = 0;
  wrong = 0;
  total = 0;
  startTime = null;
  document.getElementById("input").value = "";
  updatePhrase();
  updateStats();
}

document.getElementById("input").addEventListener("keydown", function (e) {
  if (e.key === " ") {
    e.preventDefault();

    const input = e.target.value.trim();
    const expected = currentWords[currentIndex];

    if (!startTime) startTime = Date.now();
    total++;

    const spans = document.querySelectorAll(".word");
    spans[currentIndex].classList.remove("current");

    // Comparaison avec normalisation
    if (normalizeApostrophes(input) === normalizeApostrophes(expected)) {
      correct++;
      spans[currentIndex].classList.add("correct");
    } else {
      wrong++;
      spans[currentIndex].classList.add("wrong");
    }

    currentIndex++;
    updateStats();
    e.target.value = "";

    if (currentIndex >= currentWords.length) {
      updatePhrase();
    } else {
      spans[currentIndex]?.classList.add("current");
    }
  }
});

 updatePhrase();
