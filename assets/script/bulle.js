function createBubbles() {
    const container = document.querySelector('.bubbles-container');
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const bubbleCount = 30;

    container.innerHTML = '';
    
    for (let i = 0; i < bubbleCount; i++) {
        const bubble = document.createElement('div');
        bubble.className = 'bubble';
        const randomLetter = letters[Math.floor(Math.random() * letters.length)];
        bubble.textContent = randomLetter;
        const size = Math.random() * 40 + 20;
        bubble.style.width = `${size}px`;
        bubble.style.height = `${size}px`;
        bubble.style.fontSize = `${size * 0.6}px`
        bubble.style.left = `${Math.random() * 100}%`;
        const duration = Math.random() * 20 + 10;
        bubble.style.animationDuration = `${duration}s`;
        bubble.style.animationDelay = `${Math.random() * 5}s`;
        
        container.appendChild(bubble);
    }
}
document.addEventListener('DOMContentLoaded', createBubbles);
checkbox.addEventListener('change', () => {
    setTimeout(createBubbles, 300); 
})
window.addEventListener('resize', createBubbles);