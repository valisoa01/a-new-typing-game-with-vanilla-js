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
  document.addEventListener('DOMContentLoaded', function() {
     const storedTheme = localStorage.getItem('theme') || 'dark';
    
     document.documentElement.setAttribute('data-bs-theme', storedTheme);

     updateActiveIcon(storedTheme);

     updateActiveThemeButton(storedTheme);

     document.querySelectorAll('[data-bs-theme-value]').forEach(button => {
        button.addEventListener('click', () => {
            const theme = button.getAttribute('data-bs-theme-value');
            
             document.documentElement.setAttribute('data-bs-theme', theme);
            
             localStorage.setItem('theme', theme);
            
             updateActiveThemeButton(theme);
            updateActiveIcon(theme);
        });
    });

    function updateActiveThemeButton(theme) {
        document.querySelectorAll('[data-bs-theme-value]').forEach(btn => {
            const isActive = btn.getAttribute('data-bs-theme-value') === theme;
            btn.classList.toggle('active', isActive);
            const checkIcon = btn.querySelector('.bi.ms-auto');
            if (checkIcon) {
                checkIcon.classList.toggle('d-none', !isActive);
            }
        });
    }

    function updateActiveIcon(theme) {
        const icon = document.querySelector('.theme-icon-active use');
        if (icon) {
            if (theme === 'light') {
                icon.setAttribute('href', '#sun-fill');
            } else if (theme === 'dark') {
                icon.setAttribute('href', '#moon-stars-fill');
            } else {
                icon.setAttribute('href', '#circle-half');
            }
        }
    }
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