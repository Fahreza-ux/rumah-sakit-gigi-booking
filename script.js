// DOM Ready
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    menuToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        const icon = menuToggle.querySelector('i');
        if (icon.classList.contains('fa-bars')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
    
    // Close menu when clicking on a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            menuToggle.querySelector('i').classList.remove('fa-times');
            menuToggle.querySelector('i').classList.add('fa-bars');
            
            // Update active link
            document.querySelectorAll('.nav-links a').forEach(item => {
                item.classList.remove('active');
            });
            link.classList.add('active');
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
        
        if (!name || !email || !phone || !service || !date) {
            alert('Harap lengkapi semua field yang wajib diisi');
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
        const bookingId = 'DCM' + Date.now().toString().substr(-6);
        
        // Create confirmation message
        const confirmationHTML = `
            <h4><i class="fas fa-calendar-check"></i> Booking Dikonfirmasi!</h4>
            <div class="booking-details">
                <p><strong>ID Booking:</strong> <span class="booking-id">${bookingId}</span></p>
                <p><strong>Nama:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Telepon:</strong> ${phone}</p>
                <p><strong>Layanan:</strong> ${serviceText}</p>
                <p><strong>Dokter:</strong> ${dentistText}</p>
                <p><strong>Tanggal:</strong> ${formattedDate}</p>
                <p><strong>Waktu:</strong> ${time}:00 WIB</p>
                <p><strong>Status:</strong> <span class="status-pending">Menunggu Konfirmasi</span></p>
            </div>
            <div class="booking-instructions">
                <i class="fas fa-info-circle"></i> 
                <p>Tim kami akan menghubungi Anda via WhatsApp dalam 1x24 jam untuk konfirmasi booking.</p>
                <a href="https://wa.me/6281234567890?text=Halo DentalCare Moestopo, saya ingin konfirmasi booking dengan ID: ${bookingId}" 
                   class="whatsapp-confirm" target="_blank">
                   <i class="fab fa-whatsapp"></i> Konfirmasi via WhatsApp
                </a>
            </div>
        `;
        
        // Display confirmation
        confirmationDiv.innerHTML = confirmationHTML;
        confirmationDiv.style.backgroundColor = '#e8f5e9';
        
        // Add styles for confirmation
        const style = document.createElement('style');
        style.textContent = `
            .booking-details {
                background: white;
                padding: 15px;
                border-radius: 8px;
                margin: 15px 0;
            }
            .booking-id {
                color: #2d9cdb;
                font-weight: bold;
                font-size: 1.1em;
            }
            .status-pending {
                color: #f39c12;
                font-weight: 600;
                background: #fff8e1;
                padding: 2px 8px;
                border-radius: 4px;
            }
            .booking-instructions {
                background: #e3f2fd;
                padding: 12px;
                border-radius: 8px;
                margin-top: 15px;
                font-size: 0.9em;
            }
            .booking-instructions i {
                color: #2d9cdb;
                margin-right: 8px;
            }
            .whatsapp-confirm {
                display: inline-block;
                background: #25D366;
                color: white;
                padding: 8px 15px;
                border-radius: 5px;
                margin-top: 10px;
                text-decoration: none;
                font-weight: 500;
                transition: all 0.3s ease;
            }
            .whatsapp-confirm:hover {
                background: #128C7E;
                transform: translateY(-2px);
            }
            .whatsapp-confirm i {
                margin-right: 5px;
            }
        `;
        confirmationDiv.appendChild(style);
        
        // Scroll to confirmation smoothly
        setTimeout(() => {
            confirmationDiv.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'start'
            });
        }, 100);
        
        // Show success message
        alert(`✅ Booking berhasil!\n\nID Booking: ${bookingId}\n\nKami akan menghubungi Anda via WhatsApp untuk konfirmasi.`);
        
        // Log booking data (in real app, send to server)
        console.log('📋 Booking Data:', {
            bookingId,
            name,
            email,
            phone,
            service: serviceText,
            dentist: dentistText,
            date,
            time,
            notes,
            timestamp: new Date().toISOString()
        });
        
        // Reset form
        bookingForm.reset();
        document.getElementById('date').value = tomorrowFormatted;
        
        // Store booking in localStorage (simulate database)
        const bookingData = {
            id: bookingId,
            name: name,
            email: email,
            phone: phone,
            service: serviceText,
            dentist: dentistText,
            date: date,
            time: time,
            notes: notes,
            status: 'pending',
            createdAt: new Date().toISOString()
        };
        
        // Save to localStorage
        let bookings = JSON.parse(localStorage.getItem('dentalcare_bookings') || '[]');
        bookings.push(bookingData);
        localStorage.setItem('dentalcare_bookings', JSON.stringify(bookings));
        
        // Send WhatsApp notification (simulated)
        simulateWhatsAppNotification(bookingData);
    });
    
    // Form validation on blur
    document.querySelectorAll('#bookingForm input, #bookingForm select, #bookingForm textarea').forEach(element => {
        element.addEventListener('blur', function() {
            validateField(this);
        });
        
        element.addEventListener('focus', function() {
            this.style.borderColor = '#2d9cdb';
        });
    });
    
    // Field validation function
    function validateField(field) {
        if (field.hasAttribute('required') && !field.value.trim()) {
            field.style.borderColor = '#e74c3c';
            showError(field, 'Field ini wajib diisi');
            return false;
        }
        
        if (field.type === 'email' && field.value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(field.value)) {
                field.style.borderColor = '#e74c3c';
                showError(field, 'Format email tidak valid');
                return false;
            }
        }
        
        if (field.id === 'phone' && field.value) {
            const phoneRegex = /^[0-9+\-\s]+$/;
            if (!phoneRegex.test(field.value)) {
                field.style.borderColor = '#e74c3c';
                showError(field, 'Format nomor telepon tidak valid');
                return false;
            }
        }
        
        field.style.borderColor = '#27ae60';
        hideError(field);
        return true;
    }
    
    // Show error message
    function showError(field, message) {
        let errorElement = field.parentNode.querySelector('.error-message');
        if (!errorElement) {
            errorElement = document.createElement('div');
            errorElement.className = 'error-message';
            field.parentNode.appendChild(errorElement);
        }
        errorElement.textContent = message;
        errorElement.style.color = '#e74c3c';
        errorElement.style.fontSize = '0.8rem';
        errorElement.style.marginTop = '5px';
    }
    
    // Hide error message
    function hideError(field) {
        const errorElement = field.parentNode.querySelector('.error-message');
        if (errorElement) {
            errorElement.remove();
        }
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Update active nav link
                document.querySelectorAll('.nav-links a').forEach(link => {
                    link.classList.remove('active');
                });
                this.classList.add('active');
                
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Active link based on scroll position
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-links a');
        
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop - 100) {
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
    
    // WhatsApp button click tracking
    document.querySelector('.whatsapp-float').addEventListener('click', function() {
        console.log('WhatsApp button clicked');
        // In real app, you might want to track this event
    });
    
    // Form input improvements
    document.getElementById('phone').addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 3 && value.length <= 6) {
            value = value.replace(/(\d{3})(\d{1,3})/, '$1-$2');
        } else if (value.length > 6) {
            value = value.replace(/(\d{3})(\d{3})(\d{1,4})/, '$1-$2-$3');
        }
        e.target.value = value;
    });
    
    // Simulate WhatsApp notification
    function simulateWhatsAppNotification(bookingData) {
        console.log('📱 WhatsApp Notification Simulated:', {
            to: '6281234567890',
            message: `📋 New Booking!\nID: ${bookingData.id}\nName: ${bookingData.name}\nService: ${bookingData.service}\nDate: ${bookingData.date}\nTime: ${bookingData.time}`
        });
        
        // In real implementation, you would use WhatsApp Business API
        // or a service like Twilio to send actual WhatsApp messages
    }
    
    // Initialize date picker with Indonesian locale
    const dateInput = document.getElementById('date');
    if (dateInput) {
        dateInput.addEventListener('change', function() {
            const selectedDate = new Date(this.value);
            const today = new Date();
            const maxDate = new Date();
            maxDate.setMonth(maxDate.getMonth() + 3); // Max 3 months ahead
            
            if (selectedDate < today) {
                alert('Tidak bisa memilih tanggal yang sudah lewat');
                this.value = tomorrowFormatted;
            } else if (selectedDate > maxDate) {
                alert('Booking maksimal 3 bulan ke depan');
                this.value = tomorrowFormatted;
            }
        });
    }
    
    // Preload images for better performance
    window.addEventListener('load', function() {
        console.log('Website DentalCare Moestopo loaded successfully!');
        
        // Check if there are previous bookings
        const previousBookings = JSON.parse(localStorage.getItem('dentalcare_bookings') || '[]');
        if (previousBookings.length > 0) {
            console.log(`Found ${previousBookings.length} previous bookings`);
        }
    });
});
