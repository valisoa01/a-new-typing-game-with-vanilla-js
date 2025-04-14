document.addEventListener('DOMContentLoaded', function() {
    const checkbox = document.getElementById('checkbox');
    const toggleIcon = document.getElementById('toggle-icon');
    

    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'light') {
        document.body.classList.add('light-mode');
        checkbox.checked = true;
        toggleIcon.innerHTML = '<i class="fas fa-moon"></i>';
    }


    checkbox.addEventListener('change', function() {
        document.body.classList.toggle('light-mode');
        
        if (document.body.classList.contains('light-mode')) {
            localStorage.setItem('theme', 'light');
            toggleIcon.innerHTML = '<i class="fas fa-moon"></i>';
        } else {
            localStorage.setItem('theme', 'dark');
            toggleIcon.innerHTML = '<i class="fas fa-sun"></i>';
        }
    });
});

