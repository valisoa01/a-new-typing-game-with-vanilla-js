document.addEventListener('DOMContentLoaded', function() {
    const checkbox = document.getElementById('checkbox');
    const toggleIcon = document.getElementById('toggle-icon');
    
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'light') {
        document.body.classList.add('light-mode');
        document.body.classList.remove('dark-mode');
        checkbox.checked = true;
        toggleIcon.innerHTML = '<i class="fas fa-moon"></i>';
    } else {
        document.body.classList.add('dark-mode');
        document.body.classList.remove('light-mode');
        toggleIcon.innerHTML = '<i class="fas fa-sun"></i>';
    }

    checkbox.addEventListener('change', function() {
        if (checkbox.checked) {
            document.body.classList.add('light-mode');
            document.body.classList.remove('dark-mode');
            localStorage.setItem('theme', 'light');
            toggleIcon.innerHTML = '<i class="fas fa-moon"></i>';
        } else {
            document.body.classList.add('dark-mode');
            document.body.classList.remove('light-mode');
            localStorage.setItem('theme', 'dark');
            toggleIcon.innerHTML = '<i class="fas fa-sun"></i>';
        }
    });
});
