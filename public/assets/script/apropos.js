const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;

// Check for saved theme preference or use preferred color scheme
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    html.classList.add(savedTheme);
    updateToggleIcon(savedTheme);
} else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    html.classList.add('dark');
    updateToggleIcon('dark');
}

// Toggle theme on button click
themeToggle.addEventListener('click', () => {
    if (html.classList.contains('dark')) {
        html.classList.remove('dark');
        localStorage.setItem('theme', 'light');
        updateToggleIcon('light');
    } else {
        html.classList.add('dark');
        localStorage.setItem('theme', 'dark');
        updateToggleIcon('dark');
    }
});

// Update toggle icon based on current theme
function updateToggleIcon(theme) {
    const icon = themeToggle.querySelector('i');
    if (theme === 'dark') {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }
}

// Watch for system theme changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    if (!localStorage.getItem('theme')) {
        if (e.matches) {
            html.classList.add('dark');
            updateToggleIcon('dark');
        } else {
            html.classList.remove('dark');
            updateToggleIcon('light');
        }
    }
});