document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const textDisplay = document.getElementById('text-display');
    const inputField = document.getElementById('input-field');
    const timerElement = document.getElementById('timer');
    const wpmElement = document.getElementById('wpm');
    const accuracyElement = document.getElementById('accuracy');
    const startBtn = document.getElementById('start-btn');
    const restartBtn = document.getElementById('restart-btn');
    const startOverlay = document.getElementById('start-overlay');
    
    // Sample texts for typing test
    const sampleTexts = [
        "The quick brown fox jumps over the lazy dog. This sentence contains all the letters in the English alphabet. Typing is an essential skill in today's digital world.",
        "Programming is the process of creating a set of instructions that tell a computer how to perform a task. JavaScript is one of the core technologies of the World Wide Web.",
        "Practice makes perfect. The more you type, the faster and more accurate you will become. Consistency is key when trying to improve your typing skills.",
        "The journey of a thousand miles begins with a single step. Learning to type quickly and accurately requires patience and regular practice over time.",
        "Technology has transformed the way we communicate and work. Being able to type efficiently can significantly boost your productivity in many professional fields."
    ];
    
    // Variables
    let timer;
    let timeLeft = 60;
    let isTyping = false;
    let currentText = '';
    let typedText = '';
    let correctChars = 0;
    let totalChars = 0;
    let startTime;
    let wordsTyped = 0;
    
    // Initialize the app
    init();
    
    function init() {
        // Reset all variables
        timeLeft = 60;
        isTyping = false;
        typedText = '';
        correctChars = 0;
        totalChars = 0;
        wordsTyped = 0;
        
        // Update UI
        timerElement.textContent = timeLeft;
        wpmElement.textContent = '0';
        accuracyElement.textContent = '0';
        inputField.value = '';
        inputField.disabled = true;
        startOverlay.classList.remove('hidden');
        
        // Load a random text
        currentText = sampleTexts[Math.floor(Math.random() * sampleTexts.length)];
        renderText();
    }
    
    function renderText() {
        let html = '';
        for (let i = 0; i < currentText.length; i++) {
            let charClass = '';
            
            if (i < typedText.length) {
                charClass = currentText[i] === typedText[i] ? 'correct' : 'incorrect';
            }
            
            if (i === typedText.length) {
                charClass += ' current';
            }
            
            html += `<span class="${charClass}">${currentText[i]}</span>`;
        }
        
        textDisplay.innerHTML = html;
        
        // Scroll to current position
        const currentSpan = textDisplay.querySelector('.current');
        if (currentSpan) {
            currentSpan.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }
    
    function startTest() {
        isTyping = true;
        inputField.disabled = false;
        inputField.focus();
        startOverlay.classList.add('hidden');
        startTime = new Date().getTime();
        
        // Start timer
        timer = setInterval(() => {
            timeLeft--;
            timerElement.textContent = timeLeft;
            
            if (timeLeft <= 0) {
                endTest();
            }
        }, 1000);
    }
    
    function endTest() {
        clearInterval(timer);
        isTyping = false;
        inputField.disabled = true;
        
        // Calculate final WPM and accuracy
        calculateStats();
    }
    
    function calculateStats() {
        const timeElapsed = (60 - timeLeft) / 60; // in minutes
        const accuracy = totalChars > 0 ? Math.round((correctChars / totalChars) * 100) : 0;
        const wpm = timeElapsed > 0 ? Math.round(wordsTyped / timeElapsed) : 0;
        
        accuracyElement.textContent = accuracy;
        wpmElement.textContent = wpm;
    }
    
    function updateStats() {
        const currentTime = new Date().getTime();
        const timeElapsed = (currentTime - startTime) / 60000; // in minutes
        const accuracy = totalChars > 0 ? Math.round((correctChars / totalChars) * 100) : 0;
        const wpm = timeElapsed > 0 ? Math.round(wordsTyped / timeElapsed) : 0;
        
        accuracyElement.textContent = accuracy;
        wpmElement.textContent = wpm;
    }
    
    // Event Listeners
    startBtn.addEventListener('click', startTest);
    restartBtn.addEventListener('click', init);
    
    inputField.addEventListener('input', (e) => {
        if (!isTyping) return;
        
        typedText = e.target.value;
        totalChars = typedText.length;
        
        // Count correct characters
        correctChars = 0;
        for (let i = 0; i < typedText.length; i++) {
            if (typedText[i] === currentText[i]) {
                correctChars++;
            }
        }
        
        // Count words (split by space)
        wordsTyped = typedText.trim() === '' ? 0 : typedText.trim().split(/\s+/).length;
        
        renderText();
        updateStats();
        
        // Check if user has completed the text
        if (typedText.length === currentText.length) {
            endTest();
        }
    });
    
    inputField.addEventListener('keydown', (e) => {
        // Prevent backspace from going beyond the current typed length
        if (e.key === 'Backspace' && inputField.selectionStart === 0) {
            e.preventDefault();
        }
    });
});

const themeToggle = document.getElementById('toggle-theme');
const body = document.body;

// Vérifie le thème enregistré dans localStorage
if (localStorage.getItem('theme') === 'dark') {
    body.classList.add('dark-mode');
    body.classList.remove('light-mode');
    document.documentElement.setAttribute('data-theme', 'dark');
    themeToggle.textContent = '☀️ Mode Clair';
} else {
    body.classList.add('light-mode');
    body.classList.remove('dark-mode');
    document.documentElement.setAttribute('data-theme', 'light');
    themeToggle.textContent = '🌙 Mode Sombre';
}

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    body.classList.toggle('light-mode');

    const theme = body.classList.contains('dark-mode') ? 'dark' : 'light';
    localStorage.setItem('theme', theme);
    document.documentElement.setAttribute('data-theme', theme);

    themeToggle.textContent = theme === 'dark' ? '☀️ Mode Clair' : '🌙 Mode Sombre';
});
