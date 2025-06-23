document.addEventListener('DOMContentLoaded', function() {
  // Get all navigation links
  const navLinks = document.querySelectorAll('nav a');
  
  // Get all page sections
  const sections = document.querySelectorAll('.page-section');
  
  // Function to show a specific section
  function showSection(sectionId) {
    // Hide all sections
    sections.forEach(section => {
      section.classList.remove('active-section');
    });
    
    // Show the selected section
    const activeSection = document.getElementById(sectionId);
    if (activeSection) {
      activeSection.classList.add('active-section');
      
      // Scroll to top of the section
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  }
  
  // Add click event listeners to navigation links
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const sectionId = this.getAttribute('data-section');
      showSection(sectionId);
      
      // Update active link styling if desired
      navLinks.forEach(navLink => navLink.classList.remove('active'));
      this.classList.add('active');
    });
  });
  
  // Also handle the button clicks in the hero section
  const heroButtons = document.querySelectorAll('.hero-buttons a');
  heroButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      const sectionId = this.getAttribute('data-section');
      showSection(sectionId);
    });
  });
  
  // Show home section by default
  showSection('home');
});

// Admin resume upload functionality
document.addEventListener('DOMContentLoaded', function() {
  // This would be triggered when you're logged in as admin
  // For demo purposes, we'll use a simple password prompt
  const isAdmin = false; // Change this in your actual implementation
  
  if (isAdmin) {
    const uploadForm = document.getElementById('resume-upload-form');
    uploadForm.style.display = 'block';
    
    document.getElementById('uploadForm').addEventListener('submit', function(e) {
      e.preventDefault();
      
      // In a real implementation, you would upload the files to your server here
      const pdfFile = document.getElementById('pdfFile').files[0];
      const wordFile = document.getElementById('wordFile').files[0];
      
      if (!pdfFile && !wordFile) {
        alert('Please select at least one file to upload');
        return;
      }
      
      // Simulate upload success
      alert('Resume files updated successfully!');
      // Reset form
      this.reset();
    });
  }
  
  // For actual implementation, you would need server-side code to:
  // 1. Handle authentication
  // 2. Receive and save the uploaded files
  // 3. Update the download links
});

// Contact form handling
document.getElementById('contactForm').addEventListener('submit', function(e) {
  e.preventDefault();
  
  // Get form values
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const message = document.getElementById('message').value;
  
  // Simple validation
  if (!name || !email || !message) {
    alert('Please fill in all fields');
    return;
  }
  
  // In a real implementation, you would:
  // 1. Send this data to your server
  // 2. Have server-side code email you the message
  // 3. Show success/error message to user
  
  // For demo purposes:
  console.log('Message received:', { name, email, message });
  alert('Thank you for your message! I will get back to you soon.');
  this.reset();
  
  // For actual implementation, you could use:
  // - Formspree (https://formspree.io/)
  // - Netlify Forms (if hosting on Netlify)
  // - A custom backend solution (Node.js, PHP, etc.)
});