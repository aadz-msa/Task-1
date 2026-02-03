// ===== NAVBAR SCROLL EFFECT =====

/**
 * Get the navbar element from the DOM
 */
const navbar = document.getElementById('navbar');

/**
 * Define the scroll threshold (in pixels)
 * When user scrolls past this point, the navbar style will change
 */
const scrollThreshold = 50;

/**
 * Handle scroll events
 * This function checks the scroll position and adds/removes
 * the 'scrolled' class to change navbar appearance
 */
function handleScroll() {
    // Get current scroll position from top of page
    const scrollPosition = window.scrollY || window.pageYOffset;
    
    // Check if scroll position exceeds threshold
    if (scrollPosition > scrollThreshold) {
        // Add 'scrolled' class to navbar for scrolled state styling
        navbar.classList.add('scrolled');
    } else {
        // Remove 'scrolled' class to return to original styling
        navbar.classList.remove('scrolled');
    }
}

/**
 * Add scroll event listener to window
 * The 'passive: true' option improves scroll performance
 * by telling the browser the handler won't prevent scrolling
 */
window.addEventListener('scroll', handleScroll, { passive: true });

/**
 * Optional: Check scroll position on page load
 * This ensures correct navbar state if page loads scrolled down
 */
document.addEventListener('DOMContentLoaded', handleScroll);


// ===== SMOOTH SCROLLING (BONUS FEATURE) =====

/**
 * Add smooth scrolling behavior to navigation links
 * This enhances user experience when clicking on nav links
 */
const navLinks = document.querySelectorAll('.nav-link');

navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        // Check if the link is an anchor link (starts with #)
        const href = this.getAttribute('href');
        
        if (href.startsWith('#')) {
            e.preventDefault(); // Prevent default jump behavior
            
            // Get the target section
            const targetId = href.substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                // Calculate the position to scroll to
                // Account for navbar height
                const navbarHeight = navbar.offsetHeight;
                const targetPosition = targetSection.offsetTop - navbarHeight;
                
                // Smooth scroll to target position
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        }
    });
});


// ===== ACTIVE LINK HIGHLIGHTING (BONUS FEATURE) =====

/**
 * Highlight the active navigation link based on scroll position
 * This provides visual feedback of the current section
 */
function updateActiveLink() {
    const sections = document.querySelectorAll('.section');
    const navbarHeight = navbar.offsetHeight;
    
    // Get current scroll position (accounting for navbar height)
    const scrollPosition = window.scrollY + navbarHeight + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        // Check if current scroll position is within this section
        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            // Remove active class from all links
            navLinks.forEach(link => {
                link.classList.remove('active');
            });
            
            // Add active class to corresponding nav link
            const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
            if (activeLink) {
                activeLink.classList.add('active');
            }
        }
    });
}

// Add event listener for active link highlighting
window.addEventListener('scroll', updateActiveLink, { passive: true });
document.addEventListener('DOMContentLoaded', updateActiveLink);
