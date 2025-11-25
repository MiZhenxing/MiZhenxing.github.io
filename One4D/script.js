document.addEventListener('DOMContentLoaded', () => {
    // Select elements to animate
    const elements = document.querySelectorAll('.card, .showcase-item, .diagram-container, h2, .bibtex-section');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    elements.forEach(el => {
        el.style.opacity = 0;
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
        observer.observe(el);
    });
});

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Scroll Animation Logic (From previous step)
    const elements = document.querySelectorAll('.card, .showcase-item, .diagram-container, h2, .bibtex-section');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    elements.forEach(el => {
        el.style.opacity = 0;
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
        observer.observe(el);
    });

    // 2. Video Gallery Logic
    const thumbs = document.querySelectorAll('.thumb-item');

    thumbs.forEach(thumb => {
        thumb.addEventListener('click', () => {
            // Get data from clicked thumbnail
            const targetId = thumb.getAttribute('data-target');
            const videoSrc = thumb.getAttribute('data-src');
            const mainVideo = document.getElementById(targetId);

            // If we clicked the already active video, do nothing
            if(thumb.classList.contains('active')) return;

            // Remove active class from siblings
            const siblings = thumb.parentElement.querySelectorAll('.thumb-item');
            siblings.forEach(sib => sib.classList.remove('active'));

            // Add active class to clicked
            thumb.classList.add('active');

            // Swap Video Source with a smooth "Wait for Load" logic
            if (mainVideo) {
                // 1. Fade out completely
                mainVideo.classList.add('fade-out');

                setTimeout(() => {
                    // 2. Change source inside the timeout (after fade animation starts)
                    mainVideo.src = videoSrc;
                    mainVideo.load(); // Ensure browser starts loading immediately

                    // 3. Wait until the video is actually ready to play before showing it
                    // This prevents the "flash" of an unrendered video
                    mainVideo.onloadeddata = () => {
                        mainVideo.play();
                        // Fade back in only AFTER data is loaded
                        mainVideo.classList.remove('fade-out');
                        
                        // Clean up the event listener so it doesn't stack
                        mainVideo.onloadeddata = null;
                    };
                    
                }, 300); // Wait 300ms to match CSS transition time usually
            }
        });
    });
});