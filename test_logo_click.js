// Test script to verify logo click functionality
console.log('Testing logo click functionality...');

// Check if the logo element exists
const logo = document.querySelector('.navbar-logo');
if (logo) {
    console.log('✓ Logo element found');

    // Check if the home section exists
    const homeSection = document.getElementById('home');
    if (homeSection) {
        console.log('✓ Home section found');

        // Test clicking the logo
        console.log('Simulating logo click...');
        logo.click();

        setTimeout(() => {
            const currentScrollPosition = window.pageYOffset;
            console.log(`Current scroll position: ${currentScrollPosition}`);

            if (currentScrollPosition < 100) {
                console.log('✓ Logo click working - scrolled to top');
            } else {
                console.log('✗ Logo click may not be working - not at top');
            }
        }, 1000);

    } else {
        console.log('✗ Home section not found');
    }
} else {
    console.log('✗ Logo element not found');
}

// Check if event listeners are attached
const logoEventListeners = getEventListeners ? getEventListeners(logo) : 'Event listeners check not available';
console.log('Logo event listeners:', logoEventListeners);
