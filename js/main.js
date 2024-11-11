document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS with refined settings
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            offset: 100,
            once: true,
            mirror: true, // Enables animations on scroll up
            anchorPlacement: 'center-bottom',
            easing: 'ease-out-cubic'
        });
    }

    // Enhanced Particles.js with more intuitive interaction
    if (typeof particlesJS !== 'undefined' && document.getElementById('particles-js')) {
        particlesJS('particles-js', {
            particles: {
                number: { value: 30, density: { enable: true, value_area: 800 } },
                color: { 
                    value: document.body.classList.contains('dark-mode') ? '#ffffff' : '#3b82f6'
                },
                shape: {
                    type: ["circle", "triangle"], // Multiple shapes for variety
                    stroke: { width: 0, color: "#000000" },
                },
                opacity: {
                    value: 0.6,
                    random: true,
                    anim: { enable: true, speed: 1, opacity_min: 0.1, sync: false }
                },
                size: {
                    value: 3,
                    random: true,
                    anim: { enable: true, speed: 2, size_min: 0.1, sync: false }
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: document.body.classList.contains('dark-mode') ? '#ffffff' : '#3b82f6',
                    opacity: 0.4,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 3,
                    direction: "none",
                    random: false,
                    straight: false,
                    out_mode: "bounce", // Changed to bounce for more engaging interaction
                    attract: { enable: true, rotateX: 600, rotateY: 1200 }
                }
            },
            interactivity: {
                detect_on: "canvas",
                events: {
                    onhover: {
                        enable: true,
                        mode: "bubble" // Changed to bubble for more intuitive feedback
                    },
                    onclick: {
                        enable: true,
                        mode: "push"
                    },
                    resize: true
                },
                modes: {
                    bubble: {
                        distance: 100,
                        size: 6,
                        duration: 0.3,
                        opacity: 0.8,
                        speed: 3
                    },
                    push: {
                        particles_nb: 3
                    }
                }
            },
            retina_detect: true
        });
    }

    // Enhanced theme toggle with smooth transition
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
        const savedTheme = localStorage.getItem('theme') === 'dark';
        if (savedTheme) {
            document.body.classList.add('dark-mode');
            themeToggle.innerHTML = '<span class="toggle-icon">☀️</span>';
        }

        themeToggle.addEventListener('click', () => {
            // Add rotation animation to theme toggle
            themeToggle.style.transform = 'rotate(180deg)';
            setTimeout(() => themeToggle.style.transform = '', 300);

            document.body.classList.toggle('dark-mode');
            const isDark = document.body.classList.contains('dark-mode');
            themeToggle.innerHTML = `<span class="toggle-icon">${isDark ? '☀️' : '🌙'}</span>`;
            localStorage.setItem('theme', isDark ? 'dark' : 'light');

            // Update particles with transition
            if (typeof pJSDom !== 'undefined' && pJSDom[0]) {
                const newColor = isDark ? '#ffffff' : '#3b82f6';
                pJSDom[0].pJS.particles.color.value = newColor;
                pJSDom[0].pJS.particles.line_linked.color = newColor;
                pJSDom[0].pJS.fn.particlesRefresh();
            }
        });
    }

    // Enhanced smooth scroll with progress indicator
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                // Add visual feedback on click
                this.classList.add('clicked');
                setTimeout(() => this.classList.remove('clicked'), 300);

                if (typeof gsap !== 'undefined') {
                    gsap.to(window, {
                        duration: 0.8,
                        scrollTo: {
                            y: target,
                            offsetY: 50
                        },
                        ease: "power2.inOut"
                    });
                } else {
                    target.scrollIntoView({ 
                        behavior: 'smooth',
                        block: 'center'
                    });
                }
            }
        });
    });

    // GSAP Animations with enhanced interactivity
    if (typeof gsap !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        // Interactive hero text animation
        const heroTitle = document.querySelector('.hero h1');
        if (heroTitle) {
            const text = heroTitle.textContent;
            heroTitle.innerHTML = text.split('').map(char => 
                `<span class="char-wrapper"><span class="char">${char === ' ' ? '&nbsp;' : char}</span></span>`
            ).join('');

            // Initial animation
            gsap.from('.char-wrapper .char', {
                opacity: 0,
                yPercent: 100,
                stagger: 0.03,
                duration: 0.6,
                ease: "back.out(1.7)",
                onComplete: () => {
                    // Add hover effect after initial animation
                    document.querySelectorAll('.char-wrapper').forEach(wrapper => {
                        wrapper.addEventListener('mouseenter', () => {
                            gsap.to(wrapper.querySelector('.char'), {
                                yPercent: -50,
                                duration: 0.3,
                                ease: "power2.out"
                            });
                        });
                        wrapper.addEventListener('mouseleave', () => {
                            gsap.to(wrapper.querySelector('.char'), {
                                yPercent: 0,
                                duration: 0.3,
                                ease: "power2.in"
                            });
                        });
                    });
                }
            });
        }

        // Interactive service cards
        const serviceCards = document.querySelectorAll('.service-card');
        if (serviceCards.length) {
            serviceCards.forEach(card => {
                // Hover animation
                card.addEventListener('mouseenter', () => {
                    gsap.to(card, {
                        scale: 1.03,
                        duration: 0.3,
                        ease: "power2.out",
                        boxShadow: "0 10px 20px rgba(0,0,0,0.15)"
                    });
                });

                card.addEventListener('mouseleave', () => {
                    gsap.to(card, {
                        scale: 1,
                        duration: 0.3,
                        ease: "power2.in",
                        boxShadow: "0 5px 10px rgba(0,0,0,0.1)"
                    });
                });

                // Scroll animation
                ScrollTrigger.create({
                    trigger: card,
                    start: "top bottom-=100",
                    onEnter: () => {
                        gsap.fromTo(card,
                            {
                                y: 50,
                                opacity: 0,
                                rotation: 5
                            },
                            {
                                y: 0,
                                opacity: 1,
                                rotation: 0,
                                duration: 0.6,
                                ease: "power2.out"
                            }
                        );
                    }
                });
            });
        }

        // Enhanced timeline animation
        const timelineItems = document.querySelectorAll('.timeline-item');
        if (timelineItems.length) {
            timelineItems.forEach((item, index) => {
                const direction = index % 2 === 0 ? -1 : 1;
                
                ScrollTrigger.create({
                    trigger: item,
                    start: "top bottom-=100",
                    onEnter: () => {
                        gsap.fromTo(item,
                            {
                                x: 30 * direction,
                                y: 50,
                                opacity: 0,
                                rotation: 3 * direction
                            },
                            {
                                x: 0,
                                y: 0,
                                opacity: 1,
                                rotation: 0,
                                duration: 0.8,
                                ease: "power2.out"
                            }
                        );
                    }
                });

                // Add hover effect
                item.addEventListener('mouseenter', () => {
                    gsap.to(item, {
                        scale: 1.02,
                        duration: 0.3,
                        ease: "power2.out"
                    });
                });

                item.addEventListener('mouseleave', () => {
                    gsap.to(item, {
                        scale: 1,
                        duration: 0.3,
                        ease: "power2.in"
                    });
                });
            });
        }

        // Magnetic floating elements
        document.querySelectorAll('.floating').forEach(element => {
            const bounds = element.getBoundingClientRect();
            const centerX = bounds.left + bounds.width / 2;
            const centerY = bounds.top + bounds.height / 2;

            element.addEventListener('mousemove', (e) => {
                const deltaX = (e.clientX - centerX) / 20;
                const deltaY = (e.clientY - centerY) / 20;

                gsap.to(element, {
                    x: deltaX,
                    y: deltaY,
                    duration: 0.5,
                    ease: "power2.out"
                });
            });

            element.addEventListener('mouseleave', () => {
                gsap.to(element, {
                    x: 0,
                    y: 0,
                    duration: 0.5,
                    ease: "elastic.out(1, 0.3)"
                });
            });
        });
    }
});