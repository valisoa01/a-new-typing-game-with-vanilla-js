const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
let correct = 0;
let wrong = 0;
let total = 0;
let startTime = null;

function getRandomLetter() {
  return letters[Math.floor(Math.random() * letters.length)];
}

function updateLetter() {
  const currentLetter = document.getElementById("current-letter");
  currentLetter.textContent = getRandomLetter();
}

function updateStats() {
  document.getElementById("correct").textContent = correct;
  document.getElementById("wrong").textContent = wrong;

  let accuracy = total === 0 ? 0 : Math.round((correct / total) * 100);
  document.getElementById("accuracy").textContent = accuracy;

  let elapsedTime = (Date.now() - startTime) / 60000; // minutes
  let speed = elapsedTime > 0 ? Math.round(correct / elapsedTime) : 0;
  document.getElementById("speed").textContent = speed;
}

document.getElementById("input").addEventListener("input", function (e) {
  const typedChar = e.target.value;
  const targetChar = document.getElementById("current-letter").textContent;

  if (!startTime) {
    startTime = Date.now();
  }

  total++;
  if (typedChar === targetChar) {
    correct++;
  } else {
    wrong++;
  }

  updateStats();
  updateLetter();
  e.target.value = "";
});

function goBack() {
  alert("Retour arrière !");
}

updateLetter();














