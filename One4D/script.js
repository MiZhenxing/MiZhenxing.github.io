document.addEventListener('DOMContentLoaded', () => {
    const thumbs = document.querySelectorAll('.thumb-item');

    thumbs.forEach(thumb => {
        thumb.addEventListener('click', () => {
            const targetId = thumb.getAttribute('data-target');
            const videoSrc = thumb.getAttribute('data-src');
            const mainVideo = document.getElementById(targetId);

            if (thumb.classList.contains('active')) return;

            const siblings = thumb.parentElement.querySelectorAll('.thumb-item');
            siblings.forEach(sib => sib.classList.remove('active'));
            thumb.classList.add('active');

            if (mainVideo) {
                mainVideo.classList.add('fade-out');

                setTimeout(() => {
                    mainVideo.src = videoSrc;
                    mainVideo.load();

                    mainVideo.onloadeddata = () => {
                        mainVideo.play();
                        mainVideo.classList.remove('fade-out');
                        mainVideo.onloadeddata = null;
                    };
                }, 160);
            }
        });
    });
});
