document.addEventListener('DOMContentLoaded', () => {
     const textDisplay = document.getElementById('text-display');
    const inputField = document.getElementById('input-field');
    const timerElement = document.getElementById('timer');
    const wpmElement = document.getElementById('wpm');
    const accuracyElement = document.getElementById('accuracy');
    const startBtn = document.getElementById('start-btn');
    const restartBtn = document.getElementById('restart-btn');
    const startOverlay = document.getElementById('start-overlay');
    
     const sampleTexts = [
        "The quick brown fox jumps over the lazy dog. This sentence contains all the letters in the English alphabet. Typing is an essential skill in today's digital world.",
        "Programming is the process of creating a set of instructions that tell a computer how to perform a task. JavaScript is one of the core technologies of the World Wide Web.",
        "Practice makes perfect. The more you type, the faster and more accurate you will become. Consistency is key when trying to improve your typing skills.",
        "The journey of a thousand miles begins with a single step. Learning to type quickly and accurately requires patience and regular practice over time.",
        "Technology has transformed the way we communicate and work. Being able to type efficiently can significantly boost your productivity in many professional fields."
    ];
    
     let timer;
    let timeLeft = 60;
    let isTyping = false;
    let currentText = '';
    let typedText = '';
    let correctChars = 0;
    let totalChars = 0;
    let startTime;
    let wordsTyped = 0;
    
     init();
    
    function init() {
         timeLeft = 60;
        isTyping = false;
        typedText = '';
        correctChars = 0;
        totalChars = 0;
        wordsTyped = 0;
        
         timerElement.textContent = timeLeft;
        wpmElement.textContent = '0';
        accuracyElement.textContent = '0';
        inputField.value = '';
        inputField.disabled = true;
        startOverlay.classList.remove('hidden');
        
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
        
         calculateStats();
    }
    
    function calculateStats() {
        const timeElapsed = (60 - timeLeft) / 60; 
        const accuracy = totalChars > 0 ? Math.round((correctChars / totalChars) * 100) : 0;
        const wpm = timeElapsed > 0 ? Math.round(wordsTyped / timeElapsed) : 0;
        
        accuracyElement.textContent = accuracy;
        wpmElement.textContent = wpm;
    }
    
    function updateStats() {
        const currentTime = new Date().getTime();
        const timeElapsed = (currentTime - startTime) / 60000; 
        const accuracy = totalChars > 0 ? Math.round((correctChars / totalChars) * 100) : 0;
        const wpm = timeElapsed > 0 ? Math.round(wordsTyped / timeElapsed) : 0;
        
        accuracyElement.textContent = accuracy;
        wpmElement.textContent = wpm;
    }
    
    startBtn.addEventListener('click', startTest);
    restartBtn.addEventListener('click', init);
    
    inputField.addEventListener('input', (e) => {
        if (!isTyping) return;
        
        typedText = e.target.value;
        totalChars = typedText.length;
        
         correctChars = 0;
        for (let i = 0; i < typedText.length; i++) {
            if (typedText[i] === currentText[i]) {
                correctChars++;
            }
        }
        
         wordsTyped = typedText.trim() === '' ? 0 : typedText.trim().split(/\s+/).length;
        
        renderText();
        updateStats();
        
         if (typedText.length === currentText.length) {
            endTest();
        }
    });
    
    inputField.addEventListener('keydown', (e) => {
         if (e.key === 'Backspace' && inputField.selectionStart === 0) {
            e.preventDefault();
        }
    });
});

 
