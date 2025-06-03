
// Individual Business Website JavaScript

document.addEventListener('DOMContentLoaded', function() {
    initializeWebsite();
});

function initializeWebsite() {
    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add loading animation for images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
    });
    
    // Add click tracking for action buttons
    const actionButtons = document.querySelectorAll('.action-btn');
    actionButtons.forEach(button => {
        button.addEventListener('click', function() {
            console.log('Action clicked:', this.textContent);
        });
    });
}

// Utility function to format phone numbers
function formatPhoneNumber(phone) {
    const cleaned = phone.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
        return '(' + match[1] + ') ' + match[2] + '-' + match[3];
    }
    return phone;
}

// Function to generate vCard for contact export
function generateVCard(businessData) {
    const vcard = `BEGIN:VCARD
VERSION:3.0
FN:${businessData.name}
ORG:${businessData.name}
TEL:${businessData.phone || ''}
ADR:;;${businessData.address || ''};;;;
URL:${businessData.url || ''}
NOTE:Rating: ${businessData.rating || 'N/A'} stars, Reviews: ${businessData.review_count || 'N/A'}
END:VCARD`;
    
    return vcard;
}

// Enhanced export function
function exportBusinessData() {
    const businessName = document.querySelector('h1').textContent;
    const phone = document.querySelector('.phone-link')?.textContent || 'Not available';
    const address = document.querySelector('.contact-item:first-child')?.textContent.replace('Address:', '').trim() || 'Not available';
    
    const contactData = {
        name: businessName,
        phone: phone,
        address: address
    };
    
    // Try to copy to clipboard first
    const textData = `
Business: ${contactData.name}
Phone: ${contactData.phone}
Address: ${contactData.address}
Profile: ${window.location.href}
    `.trim();
    
    if (navigator.clipboard) {
        navigator.clipboard.writeText(textData).then(() => {
            showNotification('Contact information copied to clipboard!');
        }).catch(() => {
            downloadAsFile(textData, contactData.name);
        });
    } else {
        downloadAsFile(textData, contactData.name);
    }
}

function downloadAsFile(data, businessName) {
    const blob = new Blob([data], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${businessName.replace(/[^a-z0-9]/gi, '_')}_contact.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showNotification('Contact file downloaded!');
}

function showNotification(message) {
    // Create and show a simple notification
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #27ae60;
        color: white;
        padding: 1rem;
        border-radius: 5px;
        z-index: 1000;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Add CSS for notification animation
const style = document.createElement('style');
style.textContent = `
@keyframes slideIn {
    from { transform: translateX(100%); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
}
`;
document.head.appendChild(style);
