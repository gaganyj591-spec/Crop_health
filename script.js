<<<<<<< HEAD
// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 5px 30px rgba(0,0,0,0.1)';
    } else {
        navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.05)';
    }
});

// Counter animation
const counters = document.querySelectorAll('.counter');
const speed = 200;

const animateCounter = (counter) => {
    const target = +counter.getAttribute('data-target');
    const count = +counter.innerText;
    const increment = target / speed;

    if (count < target) {
        counter.innerText = Math.ceil(count + increment);
        setTimeout(() => animateCounter(counter), 1);
    } else {
        counter.innerText = target;
    }
};

const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counter = entry.target;
            if (!counter.classList.contains('animated')) {
                counter.classList.add('animated');
                animateCounter(counter);
            }
        }
    });
}, observerOptions);

counters.forEach(counter => observer.observe(counter));

// Image upload and preview
const imageInput = document.getElementById('imageInput');
const preview = document.getElementById('preview');
const analyzeBtn = document.getElementById('analyzeBtn');
const result = document.getElementById('result');

imageInput.addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
        if (file.size > 5 * 1024 * 1024) {
            alert('File size must be less than 5MB');
            return;
        }
        
        const reader = new FileReader();
        reader.onload = function(e) {
            preview.innerHTML = `<img src="${e.target.result}" alt="Uploaded leaf image">`;
            analyzeBtn.style.display = 'block';
            result.innerHTML = '';
        };
        reader.readAsDataURL(file);
    }
});

// AI Analysis simulation
analyzeBtn.addEventListener('click', function() {
    analyzeBtn.disabled = true;
    analyzeBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Analyzing...';
    
    // Show loading state
    result.innerHTML = `
        <div style="text-align: center;">
            <div style="font-size: 3rem; color: var(--primary); margin-bottom: 1rem;">
                <i class="fas fa-microscope loading"></i>
            </div>
            <h3>Analyzing Image...</h3>
            <p style="color: var(--gray);">Our AI is processing your image</p>
        </div>
    `;
    
    // Simulate processing time
    setTimeout(() => {
        const diseases = [
            { 
                name: 'Healthy Leaf', 
                confidence: 96, 
                severity: 'None',
                treatment: 'No treatment needed. Your crop is healthy! Continue with regular care and monitoring.',
                prevention: 'Maintain proper irrigation, ensure adequate spacing between plants, and monitor regularly.',
                color: '#10b981'
            },
            { 
                name: 'Early Blight', 
                confidence: 89, 
                severity: 'Moderate',
                treatment: 'Apply fungicide containing chlorothalonil or copper-based compounds. Remove and destroy infected leaves immediately.',
                prevention: 'Improve air circulation, avoid overhead watering, and practice crop rotation.',
                color: '#f59e0b'
            },
            { 
                name: 'Late Blight', 
                confidence: 93, 
                severity: 'High',
                treatment: 'Use systemic fungicides like metalaxyl. Remove severely infected plants to prevent spread.',
                prevention: 'Plant resistant varieties, ensure proper drainage, and avoid working with wet plants.',
                color: '#ef4444'
            },
            { 
                name: 'Leaf Spot Disease', 
                confidence: 87, 
                severity: 'Moderate',
                treatment: 'Apply neem oil spray or copper-based fungicide. Prune affected leaves and improve ventilation.',
                prevention: 'Water at soil level, remove plant debris, and maintain proper plant spacing.',
                color: '#f59e0b'
            },
            { 
                name: 'Powdery Mildew', 
                confidence: 91, 
                severity: 'Low',
                treatment: 'Spray with sulfur-based fungicide or potassium bicarbonate solution. Increase air circulation.',
                prevention: 'Avoid overcrowding, reduce humidity, and apply preventive fungicides during susceptible periods.',
                color: '#eab308'
            }
        ];
        
        const randomDisease = diseases[Math.floor(Math.random() * diseases.length)];
        
        result.innerHTML = `
            <div style="width: 100%;">
                <div style="text-align: center; margin-bottom: 2rem;">
                    <div style="width: 80px; height: 80px; background: linear-gradient(135deg, ${randomDisease.color}, ${randomDisease.color}dd); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1rem; color: white; font-size: 2rem;">
                        <i class="fas fa-check-circle"></i>
                    </div>
                    <h3 style="font-size: 1.8rem; margin-bottom: 0.5rem;">Analysis Complete</h3>
                    <p style="color: var(--gray);">Results generated in 2.3 seconds</p>
                </div>
                
                <div style="background: ${randomDisease.color}15; padding: 1.5rem; border-radius: 15px; margin-bottom: 1.5rem; border-left: 4px solid ${randomDisease.color};">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
                        <div>
                            <strong style="font-size: 1.3rem; color: var(--dark);">${randomDisease.name}</strong>
                            <div style="margin-top: 0.5rem;">
                                <span style="background: ${randomDisease.color}; color: white; padding: 4px 12px; border-radius: 20px; font-size: 0.85rem; font-weight: 600;">
                                    Severity: ${randomDisease.severity}
                                </span>
                            </div>
                        </div>
                        <div style="text-align: right;">
                            <div style="font-size: 2rem; font-weight: 800; color: ${randomDisease.color};">${randomDisease.confidence}%</div>
                            <div style="font-size: 0.85rem; color: var(--gray);">Confidence</div>
                        </div>
                    </div>
                </div>
                
                <div style="background: #f0fdf4; padding: 1.5rem; border-radius: 15px; margin-bottom: 1rem;">
                    <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 1rem;">
                        <i class="fas fa-prescription-bottle" style="color: var(--primary); font-size: 1.3rem;"></i>
                        <strong style="font-size: 1.1rem; color: var(--dark);">Recommended Treatment</strong>
                    </div>
                    <p style="color: var(--gray); line-height: 1.7;">${randomDisease.treatment}</p>
                </div>
                
                <div style="background: #eff6ff; padding: 1.5rem; border-radius: 15px; margin-bottom: 1.5rem;">
                    <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 1rem;">
                        <i class="fas fa-shield-alt" style="color: var(--secondary); font-size: 1.3rem;"></i>
                        <strong style="font-size: 1.1rem; color: var(--dark);">Prevention Tips</strong>
                    </div>
                    <p style="color: var(--gray); line-height: 1.7;">${randomDisease.prevention}</p>
                </div>
                
                <div style="background: #fef3c7; padding: 1rem 1.5rem; border-radius: 10px; display: flex; align-items: start; gap: 12px;">
                    <i class="fas fa-info-circle" style="color: #f59e0b; font-size: 1.2rem; margin-top: 2px;"></i>
                    <p style="font-size: 0.9rem; color: #92400e; line-height: 1.6; margin: 0;">
                        <strong>Note:</strong> This is a demonstration using simulated AI analysis. For actual crop diagnosis, please consult with agricultural experts or use our production system with trained models.
                    </p>
                </div>
            </div>
        `;
        
        analyzeBtn.disabled = false;
        analyzeBtn.innerHTML = '<i class="fas fa-microscope"></i> Analyze Image';
    }, 2500);
});

// Contact form
document.querySelector('.contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const btn = this.querySelector('.submit-btn');
    const originalContent = btn.innerHTML;
    
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    btn.disabled = true;
    
    setTimeout(() => {
        alert('Thank you for your message! Our team will get back to you within 24 hours.');
        this.reset();
        btn.innerHTML = originalContent;
        btn.disabled = false;
    }, 1500);
});

// Scroll animations
const fadeElements = document.querySelectorAll('.feature-card, .timeline-item, .stat-card');

const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '0';
            entry.target.style.transform = 'translateY(30px)';
            setTimeout(() => {
                entry.target.style.transition = 'all 0.6s ease';
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, 100);
            fadeObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

fadeElements.forEach(el => fadeObserver.observe(el));
=======
// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 5px 30px rgba(0,0,0,0.1)';
    } else {
        navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.05)';
    }
});

// Counter animation
const counters = document.querySelectorAll('.counter');
const speed = 200;

const animateCounter = (counter) => {
    const target = +counter.getAttribute('data-target');
    const count = +counter.innerText;
    const increment = target / speed;

    if (count < target) {
        counter.innerText = Math.ceil(count + increment);
        setTimeout(() => animateCounter(counter), 1);
    } else {
        counter.innerText = target;
    }
};

const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counter = entry.target;
            if (!counter.classList.contains('animated')) {
                counter.classList.add('animated');
                animateCounter(counter);
            }
        }
    });
}, observerOptions);

counters.forEach(counter => observer.observe(counter));

// Image upload and preview
const imageInput = document.getElementById('imageInput');
const preview = document.getElementById('preview');
const analyzeBtn = document.getElementById('analyzeBtn');
const result = document.getElementById('result');

imageInput.addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
        if (file.size > 5 * 1024 * 1024) {
            alert('File size must be less than 5MB');
            return;
        }
        
        const reader = new FileReader();
        reader.onload = function(e) {
            preview.innerHTML = `<img src="${e.target.result}" alt="Uploaded leaf image">`;
            analyzeBtn.style.display = 'block';
            result.innerHTML = '';
        };
        reader.readAsDataURL(file);
    }
});

// AI Analysis simulation
analyzeBtn.addEventListener('click', function() {
    analyzeBtn.disabled = true;
    analyzeBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Analyzing...';
    
    // Show loading state
    result.innerHTML = `
        <div style="text-align: center;">
            <div style="font-size: 3rem; color: var(--primary); margin-bottom: 1rem;">
                <i class="fas fa-microscope loading"></i>
            </div>
            <h3>Analyzing Image...</h3>
            <p style="color: var(--gray);">Our AI is processing your image</p>
        </div>
    `;
    
    // Simulate processing time
    setTimeout(() => {
        const diseases = [
            { 
                name: 'Healthy Leaf', 
                confidence: 96, 
                severity: 'None',
                treatment: 'No treatment needed. Your crop is healthy! Continue with regular care and monitoring.',
                prevention: 'Maintain proper irrigation, ensure adequate spacing between plants, and monitor regularly.',
                color: '#10b981'
            },
            { 
                name: 'Early Blight', 
                confidence: 89, 
                severity: 'Moderate',
                treatment: 'Apply fungicide containing chlorothalonil or copper-based compounds. Remove and destroy infected leaves immediately.',
                prevention: 'Improve air circulation, avoid overhead watering, and practice crop rotation.',
                color: '#f59e0b'
            },
            { 
                name: 'Late Blight', 
                confidence: 93, 
                severity: 'High',
                treatment: 'Use systemic fungicides like metalaxyl. Remove severely infected plants to prevent spread.',
                prevention: 'Plant resistant varieties, ensure proper drainage, and avoid working with wet plants.',
                color: '#ef4444'
            },
            { 
                name: 'Leaf Spot Disease', 
                confidence: 87, 
                severity: 'Moderate',
                treatment: 'Apply neem oil spray or copper-based fungicide. Prune affected leaves and improve ventilation.',
                prevention: 'Water at soil level, remove plant debris, and maintain proper plant spacing.',
                color: '#f59e0b'
            },
            { 
                name: 'Powdery Mildew', 
                confidence: 91, 
                severity: 'Low',
                treatment: 'Spray with sulfur-based fungicide or potassium bicarbonate solution. Increase air circulation.',
                prevention: 'Avoid overcrowding, reduce humidity, and apply preventive fungicides during susceptible periods.',
                color: '#eab308'
            }
        ];
        
        const randomDisease = diseases[Math.floor(Math.random() * diseases.length)];
        
        result.innerHTML = `
            <div style="width: 100%;">
                <div style="text-align: center; margin-bottom: 2rem;">
                    <div style="width: 80px; height: 80px; background: linear-gradient(135deg, ${randomDisease.color}, ${randomDisease.color}dd); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1rem; color: white; font-size: 2rem;">
                        <i class="fas fa-check-circle"></i>
                    </div>
                    <h3 style="font-size: 1.8rem; margin-bottom: 0.5rem;">Analysis Complete</h3>
                    <p style="color: var(--gray);">Results generated in 2.3 seconds</p>
                </div>
                
                <div style="background: ${randomDisease.color}15; padding: 1.5rem; border-radius: 15px; margin-bottom: 1.5rem; border-left: 4px solid ${randomDisease.color};">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
                        <div>
                            <strong style="font-size: 1.3rem; color: var(--dark);">${randomDisease.name}</strong>
                            <div style="margin-top: 0.5rem;">
                                <span style="background: ${randomDisease.color}; color: white; padding: 4px 12px; border-radius: 20px; font-size: 0.85rem; font-weight: 600;">
                                    Severity: ${randomDisease.severity}
                                </span>
                            </div>
                        </div>
                        <div style="text-align: right;">
                            <div style="font-size: 2rem; font-weight: 800; color: ${randomDisease.color};">${randomDisease.confidence}%</div>
                            <div style="font-size: 0.85rem; color: var(--gray);">Confidence</div>
                        </div>
                    </div>
                </div>
                
                <div style="background: #f0fdf4; padding: 1.5rem; border-radius: 15px; margin-bottom: 1rem;">
                    <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 1rem;">
                        <i class="fas fa-prescription-bottle" style="color: var(--primary); font-size: 1.3rem;"></i>
                        <strong style="font-size: 1.1rem; color: var(--dark);">Recommended Treatment</strong>
                    </div>
                    <p style="color: var(--gray); line-height: 1.7;">${randomDisease.treatment}</p>
                </div>
                
                <div style="background: #eff6ff; padding: 1.5rem; border-radius: 15px; margin-bottom: 1.5rem;">
                    <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 1rem;">
                        <i class="fas fa-shield-alt" style="color: var(--secondary); font-size: 1.3rem;"></i>
                        <strong style="font-size: 1.1rem; color: var(--dark);">Prevention Tips</strong>
                    </div>
                    <p style="color: var(--gray); line-height: 1.7;">${randomDisease.prevention}</p>
                </div>
                
                <div style="background: #fef3c7; padding: 1rem 1.5rem; border-radius: 10px; display: flex; align-items: start; gap: 12px;">
                    <i class="fas fa-info-circle" style="color: #f59e0b; font-size: 1.2rem; margin-top: 2px;"></i>
                    <p style="font-size: 0.9rem; color: #92400e; line-height: 1.6; margin: 0;">
                        <strong>Note:</strong> This is a demonstration using simulated AI analysis. For actual crop diagnosis, please consult with agricultural experts or use our production system with trained models.
                    </p>
                </div>
            </div>
        `;
        
        analyzeBtn.disabled = false;
        analyzeBtn.innerHTML = '<i class="fas fa-microscope"></i> Analyze Image';
    }, 2500);
});

// Contact form
document.querySelector('.contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const btn = this.querySelector('.submit-btn');
    const originalContent = btn.innerHTML;
    
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    btn.disabled = true;
    
    setTimeout(() => {
        alert('Thank you for your message! Our team will get back to you within 24 hours.');
        this.reset();
        btn.innerHTML = originalContent;
        btn.disabled = false;
    }, 1500);
});

// Scroll animations
const fadeElements = document.querySelectorAll('.feature-card, .timeline-item, .stat-card');

const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '0';
            entry.target.style.transform = 'translateY(30px)';
            setTimeout(() => {
                entry.target.style.transition = 'all 0.6s ease';
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, 100);
            fadeObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

fadeElements.forEach(el => fadeObserver.observe(el));
>>>>>>> 4ab2f5e9fbe1ce02e64d0214931e3a8cc0676f6a
