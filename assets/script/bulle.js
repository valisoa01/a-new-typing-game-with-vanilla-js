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

document.addEventListener('DOMContentLoaded', function() {
    const userImage = document.getElementById('userImage');
    const chevron = document.querySelector('.fa-chevron-right');
    const userDropdown = document.getElementById('userDropdown');
    const dropdownBackdrop = document.createElement('div');
    dropdownBackdrop.className = 'dropdown-backdrop';
    document.body.appendChild(dropdownBackdrop);
  
    function toggleProfileMenu(e) {
      e.stopPropagation();
      
      const isShowing = userDropdown.classList.toggle('show');
      

      userImage.classList.toggle('active', isShowing);
      chevron.classList.toggle('active', isShowing);
      dropdownBackdrop.classList.toggle('active', isShowing);
      

      if (isShowing) {
        document.addEventListener('click', closeProfileMenu);
        window.addEventListener('scroll', closeProfileMenu);
      } else {
        removeEventListeners();
      }
    }
  
    function closeProfileMenu(e) {
      if (!userDropdown.contains(e.target) && !userImage.contains(e.target)) {
        userDropdown.classList.remove('show');
        userImage.classList.remove('active');
        chevron.classList.remove('active');
        dropdownBackdrop.classList.remove('active');
        removeEventListeners();
      }
    }
  
    function removeEventListeners() {
      document.removeEventListener('click', closeProfileMenu);
      window.removeEventListener('scroll', closeProfileMenu);
    }
  
    userImage.addEventListener('click', toggleProfileMenu);
    

    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && userDropdown.classList.contains('show')) {
        userDropdown.classList.remove('show');
        userImage.classList.remove('active');
        chevron.classList.remove('active');
        dropdownBackdrop.classList.remove('active');
        removeEventListeners();
      }
    });
  });