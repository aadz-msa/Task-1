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


// ===== SCROLL REVEAL ANIMATION (BONUS FEATURE) =====

/**
 * Animate elements when they come into view
 */
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for scroll animations
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.feature-item, .service-card, .team-member, .content-box');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});


// ===== FORM SUBMISSION HANDLER =====

/**
 * Handle contact form submission
 */
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.querySelector('.contact-form form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Show success message
            const submitBtn = contactForm.querySelector('.submit-btn');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Message Sent! ✓';
            submitBtn.style.backgroundColor = '#27ae60';
            
            // Reset form
            contactForm.reset();
            
            // Reset button after 3 seconds
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.style.backgroundColor = '';
            }, 3000);
        });
    }
});
