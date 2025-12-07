// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Form submit
document.querySelector('form')?.addEventListener('submit', async e => {
    e.preventDefault();
    const button = e.target.querySelector('button');
    const original = button.textContent;

    button.textContent = 'Sending...';
    button.disabled = true;

    // Simulate send (replace with real API)
    setTimeout(() => {
        button.textContent = '✓ Sent!';
        e.target.reset();

        setTimeout(() => {
            button.textContent = original;
            button.disabled = false;
        }, 2000);
    }, 1000);
});
