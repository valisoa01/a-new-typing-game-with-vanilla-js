  function createBubble() {
    const bubble = document.createElement('div');
    bubble.classList.add('bubble');
    bubble.style.left = Math.random() * 90 + "vw"; 
    bubble.style.animationDuration = (4 + Math.random() * 2) + "s"; 
    
 

    document.body.appendChild(bubble);

     setTimeout(() => {
      bubble.remove();
    }, 6000);
  }

  setInterval(createBubble, 800); 

  document.addEventListener('keydown', (event) => {
    const keyPressed = event.key.toLowerCase();
    const bubbles = document.querySelectorAll('.bubble');

    bubbles.forEach(bubble => {
      if (bubble.textContent.toLowerCase() === keyPressed) {
        bubble.remove();
      }
    });
  });
 

 const text = "Apprenez à taper plus vite avec typing vanilla.";
const typingElement = document.getElementById("typing");
let index = 0;
let isDeleting = false;

function typeEffect() {
    if (!isDeleting) {
        let currentChar = text.charAt(index).toLowerCase();
        typingElement.textContent = text.slice(0, index++);
        highlightKey(currentChar);
        if (index > text.length) {
            isDeleting = true;
            setTimeout(typeEffect, 1000);
            return;
        }
    } else {
        typingElement.textContent = text.slice(0, index--);
        if (index < 0) {
            isDeleting = false;
        }
    }
    setTimeout(typeEffect, isDeleting ? 50 : 100);
}

function highlightKey(letter) {
    let key = document.getElementById("key-" + letter);
    if (!key && letter === " ") key = document.getElementById("key-space");
    if (key) {
        key.classList.add("pressed");
        setTimeout(() => key.classList.remove("pressed"), 150);
    }
}

function animateText() {
    typingElement.innerHTML = "";
    text.split("").forEach((char, index) => {
        let span = document.createElement("span");
        span.textContent = char;
        typingElement.appendChild(span);
    });

    setTimeout(() => {
        typingElement.innerHTML = "";
        typingElement.classList.add("show");
        setTimeout(typeEffect, 1000);
    }, 1000);
}

setTimeout(animateText, 3000);  