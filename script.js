/**
 * Handles navigation, form validation, and Square payment integration
 */

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const navToggle = document.getElementById('nav-toggle');
    const navLinks = document.getElementById('nav-links');
    
    navToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a link
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            if (window.innerWidth <= 767) {
                navLinks.classList.remove('active');
            }
        });
    });
    
    // Form Validation
    const orderForm = document.getElementById('order-form');
    
    if (orderForm) {
        orderForm.addEventListener('submit', function(e) {
            if (!validateForm()) {
                e.preventDefault();
            }
        });
    }
    
    
    initializeSquarePayment();
    
    // Handle window resize event for responsive behavior
    window.addEventListener('resize', function() {
        if (window.innerWidth > 767 && navLinks) {
            navLinks.classList.remove('active');
        }
    });
});

/**
 * Validates the order form inputs
 * @returns {boolean} True if the form is valid, false otherwise
 */
function validateForm() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const pickupDate = document.getElementById('pickup-date').value;
    const pickupTime = document.getElementById('pickup-time').value;
    const orderDescription = document.getElementById('order-description').value;
    
    // Check if required fields are filled
    if (!name || !email || !phone || !pickupDate || !pickupTime || !orderDescription) {
        showError('Please fill in all required fields.');
        return false;
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showError('Please enter a valid email address.');
        return false;
    }
    
    
    const phoneRegex = /^\d{10,15}$/;
    if (!phoneRegex.test(phone.replace(/[^0-9]/g, ''))) {
        showError('Please enter a valid phone number.');
        return false;
    }
    
    // Validate pickup date (must be today or in the future)
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const selectedDate = new Date(pickupDate);
    
    if (selectedDate < today) {
        showError('Pickup date must be today or in the future.');
        return false;
    }
    
    // Validate order description (minimum length)
    if (orderDescription.length < 10) {
        showError('Please provide more details about your order.');
        return false;
    }
    
    return true;
}

/**
*form error
 * @param {string} message - The error message to display
 */
function showError(message) {
    // Check if error element already exists
    let errorElement = document.getElementById('form-error');
    
    if (!errorElement) {
        // Create error element
        errorElement = document.createElement('div');
        errorElement.id = 'form-error';
        errorElement.style.color = '#c53030';
        errorElement.style.backgroundColor = '#fed7d7';
        errorElement.style.padding = '10px';
        errorElement.style.borderRadius = '4px';
        errorElement.style.marginBottom = '20px';
        
        // Insert at the top of the form
        const form = document.getElementById('order-form');
        form.insertBefore(errorElement, form.firstChild);
    }
    
    errorElement.textContent = message;
    
    // Scroll to the error message
    errorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    
    // Remove the error message after 5 seconds
    setTimeout(() => {
        if (errorElement && errorElement.parentNode) {
            errorElement.parentNode.removeChild(errorElement);
        }
    }, 5000);
}

/**
 * This is a sandbox implementation
 */
async function initializeSquarePayment() {
    // Check if payment form exists
    const paymentForm = document.getElementById('payment-form');
    if (!paymentForm) return;
    
    try {
        // Initialize Square
        const payments = Square.payments('sandbox-sq0idb-YOUR_SANDBOX_APPLICATION_ID', 'YOUR_LOCATION_ID');
        
        // Initialize card payment method
        const card = await payments.card();
        await card.attach('#card-container');
        
        // Handle form submission
        const submitButton = document.getElementById('submit-order');
        const form = document.getElementById('order-form');
        
        form.addEventListener('submit', async function(event) {
            event.preventDefault();
            
            if (!validateForm()) {
                return;
            }
            
            try {
                const statusContainer = document.getElementById('payment-status-container');
                statusContainer.textContent = 'Processing payment...';
                submitButton.disabled = true;
                
                // Tokenize payment method
                const result = await card.tokenize();
                
                if (result.status === 'OK') {
                    // In a real implementation, you would send the source ID to your server
                    // to create a payment
                    console.log('Payment source ID:', result.token);
                    
                    // Simulate server processing (for demo purposes)
                    setTimeout(() => {
                        statusContainer.textContent = '';
                        
                        // Use FormSubmit as the form handling service
                        // This would normally submit to your server with the payment token
                        submitOrder(result.token);
                    }, 1500);
                } else {
                    let errorMessage = 'Payment processing failed. Please try again.';
                    if (result.errors && result.errors.length > 0) {
                        errorMessage = result.errors[0].message;
                    }
                    statusContainer.textContent = errorMessage;
                    submitButton.disabled = false;
                }
            } catch (error) {
                console.error('Error:', error);
                const statusContainer = document.getElementById('payment-status-container');
                statusContainer.textContent = 'Payment processing failed. Please try again.';
                submitButton.disabled = false;
            }
        });
    } catch (error) {
        console.error('Square payment initialization error:', error);
        const cardContainer = document.getElementById('card-container');
        if (cardContainer) {
            cardContainer.textContent = 'Payment system unavailable. Please try again later or contact us directly.';
        }
    }
}

/**
 * Submits the order to FormSubmit 
 * @param {string} paymentToken - The payment token from Square
 */
function submitOrder(paymentToken) {
    // Get form data
    const formData = new FormData(document.getElementById('order-form'));
    
    // Add the payment token to form data
    formData.append('paymentToken', paymentToken);
    
    // FormSubmit automatically handles the form submission
    // This is just for demonstration
    alert('Order submitted successfully! In a real implementation, your order would be processed now.');
    
    // Redirect to a thank you page or reset the form
    document.getElementById('order-form').reset();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}