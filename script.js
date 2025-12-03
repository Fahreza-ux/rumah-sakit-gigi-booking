// DOM Ready
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    menuToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        menuToggle.querySelector('i').classList.toggle('fa-bars');
        menuToggle.querySelector('i').classList.toggle('fa-times');
    });
    
    // Close menu when clicking on a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            menuToggle.querySelector('i').classList.remove('fa-times');
            menuToggle.querySelector('i').classList.add('fa-bars');
        });
    });
    
    // Set minimum date for booking to today
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('date').min = today;
    
    // Set default date to tomorrow
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowFormatted = tomorrow.toISOString().split('T')[0];
    document.getElementById('date').value = tomorrowFormatted;
    
    // Booking Form Submission
    const bookingForm = document.getElementById('bookingForm');
    const confirmationDiv = document.getElementById('confirmation');
    
    bookingForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const service = document.getElementById('service').value;
        const dentist = document.getElementById('dentist').value;
        const date = document.getElementById('date').value;
        const time = document.getElementById('time').value;
        const notes = document.getElementById('notes').value;
        
        // Validate required fields
        if (!time) {
            alert('Silakan pilih waktu janji temu');
            return;
        }
        
        // Format date to Indonesian format
        const dateObj = new Date(date);
        const formattedDate = dateObj.toLocaleDateString('id-ID', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        
        // Get service name and price
        const serviceSelect = document.getElementById('service');
        const serviceText = serviceSelect.options[serviceSelect.selectedIndex].text;
        
        // Get dentist name
        let dentistText = "Dokter Tersedia";
        if (dentist) {
            const dentistSelect = document.getElementById('dentist');
            dentistText = dentistSelect.options[dentistSelect.selectedIndex].text;
        }
        
        // Generate booking ID
        const bookingId = 'BK' + Date.now().toString().substr(-6);
        
        // Create confirmation message
        const confirmationHTML = `
            <h4><i class="fas fa-calendar-check"></i> Booking Dikonfirmasi!</h4>
            <p><strong>ID Booking:</strong> ${bookingId}</p>
            <p><strong>Nama:</strong> ${name}</p>
            <p><strong>Layanan:</strong> ${serviceText}</p>
            <p><strong>Dokter:</strong> ${dentistText}</p>
            <p><strong>Tanggal:</strong> ${formattedDate}</p>
            <p><strong>Waktu:</strong> ${time}:00 WIB</p>
            <p><strong>Status:</strong> <span style="color: #27ae60; font-weight: 600;">Dikonfirmasi</span></p>
            <p style="margin-top: 15px; padding: 10px; background-color: #e3f2fd; border-radius: 5px;">
                <i class="fas fa-info-circle"></i> Detail booking telah dikirim ke email ${email}. 
                Silakan hadir 15 menit sebelum waktu janji temu.
            </p>
        `;
        
        // Display confirmation
        confirmationDiv.innerHTML = confirmationHTML;
        confirmationDiv.style.backgroundColor = '#e8f5e9';
        
        // Scroll to confirmation
        confirmationDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        
        // Reset form
        bookingForm.reset();
        document.getElementById('date').value = tomorrowFormatted;
        
        // Show success message
        alert('Booking berhasil! Detail telah dikirim ke email Anda.');
        
        // In a real application, you would send this data to a server
        console.log('Booking Data:', {
            bookingId,
            name,
            email,
            phone,
            service: serviceText,
            dentist: dentistText,
            date,
            time,
            notes
        });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Highlight current section in navigation
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-links a');
        
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 100) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });
    
    // Add active class to current nav link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function() {
            document.querySelectorAll('.nav-links a').forEach(item => {
                item.classList.remove('active');
            });
            this.classList.add('active');
        });
    });
    
    // Form validation on blur
    document.querySelectorAll('#bookingForm input, #bookingForm select').forEach(element => {
        element.addEventListener('blur', function() {
            if (this.hasAttribute('required') && !this.value) {
                this.style.borderColor = '#e74c3c';
            } else {
                this.style.borderColor = '#e9ecef';
            }
        });
    });
});
