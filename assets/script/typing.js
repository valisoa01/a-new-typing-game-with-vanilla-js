alert("Avant de commencer selectionnez vous votre niveau du jeux")
const phrases = {
  easy: [
    "Le soleil brille aujourd'hui.",
    "J'aime manger des pommes.",
    "Le chat dort sur le canapé.",
    "Elle lit un livre intéressant.",
    "Il fait beau dehors."
  ],
  medium: [
    "La musique rend les journées plus agréables.",
    "Les enfants jouent dans le jardin après l'école.",
    "Il faut boire de l'eau pour rester en bonne santé.",
    "Le train arrive toujours à l'heure le matin.",
    "Le marché est animé le samedi matin."
  ],
  hard: [
    "L'intelligence artificielle transforme le monde numérique rapidement.",
    "Ce n'est pas en regardant la pluie qu'on apprend à nager.",
    "La ponctualité est la politesse des rois, disait-on autrefois.",
    "L'accessibilité rend la technologie plus inclusive pour tous.",
    "L'écologie est une priorité dans le monde moderne et connecté."
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
let phrasesTyped = 0;

function normalizeApostrophes(text) {
  return text.replace(/[’‘]/g, "'");
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
  phrasesTyped = 0;

  document.getElementById("input").value = "";
  document.getElementById("input").disabled = false;
  document.getElementById("statistique").style.display = "none";

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
      phrasesTyped++;

      if (phrasesTyped >= 5) {
        document.getElementById("statistique").style.display = "block";

        document.getElementById("stat-level").textContent = currentLevel === "easy" ? "Facile" : currentLevel === "medium" ? "Moyen" : "Difficile";
        document.getElementById("stat-correct").textContent = correct;
        document.getElementById("stat-wrong").textContent = wrong;

        document.getElementById("input").disabled = true;
      } else {
        updatePhrase();
      }
    } else {
      spans[currentIndex]?.classList.add("current");
    }
  }
});

document.getElementById("replayBtn").addEventListener("click", () => {
  resetGame();
});

document.getElementById("restart-btn").addEventListener("click", () => {
  resetGame();
});