// Select elements
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const overlay = document.querySelector('.menu-overlay');
const filterButtons = document.querySelectorAll('.filter-btn');
const insightCards = document.querySelectorAll('.insights-card');

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

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    // remove "active" class from all buttons
    filterButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');

    const category = button.getAttribute('data-filter');

    insightCards.forEach(card => {
      if (category === 'all' || card.getAttribute('data-category') === category) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  });
});

