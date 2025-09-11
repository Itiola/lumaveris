// Select elements
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const overlay = document.querySelector('.menu-overlay');

// Toggle menu
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  hamburger.classList.toggle('toggle');
  overlay.classList.toggle('active');
});

// Close menu when clicking overlay
overlay.addEventListener('click', () => {
  navLinks.classList.remove('active');
  hamburger.classList.remove('toggle');
  overlay.classList.remove('active');
});

// Event listeners
hamburger.addEventListener('click', openCloseMenu);

// Close when clicking overlay
overlay.addEventListener('click', closeMenu);

// Close when clicking a nav link (use event delegation)
navLinks.addEventListener('click', (e) => {
  if (e.target.tagName === 'A') closeMenu();
});

// Close menu on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeMenu();
});
