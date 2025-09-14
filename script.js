// Select elements
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const overlay = document.querySelector('.menu-overlay');

// Toggle menu function
function toggleMenu() {
  const isOpen = navLinks.classList.contains('active'); 

  navLinks.classList.toggle('active');
  hamburger.classList.toggle('toggle');
  overlay.classList.toggle('active');

  // accessibility: reflect state on the button
  hamburger.setAttribute('aria-expanded', String(!isOpen));

}

// Close menu function
function closeMenu() {
  navLinks.classList.remove('active');
  hamburger.classList.remove('toggle');
  overlay.classList.remove('active');
  hamburger.setAttribute('aria-expanded', 'false');
}

// Event listeners
hamburger.addEventListener('click', toggleMenu); // Toggle on click
overlay.addEventListener('click', closeMenu);    // Close when clicking overlay

// Close when clicking a nav link
navLinks.addEventListener('click', (e) => {
  if (e.target.tagName === 'A') closeMenu();
});

// Close menu on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeMenu();
});

// Prevent body scroll when menu is open
function preventBodyScroll() {
  const isMenuOpen = navLinks.classList.contains('active');
  document.body.style.overflow = isMenuOpen ? 'hidden' : '';
}

// Update the toggle function to include scroll prevention
const originalToggleMenu = toggleMenu;
toggleMenu = function() {
  originalToggleMenu();
  preventBodyScroll();
};

const originalCloseMenu = closeMenu;
closeMenu = function() {
  originalCloseMenu();
  preventBodyScroll();
};