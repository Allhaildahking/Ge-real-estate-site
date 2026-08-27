const header = document.querySelector('.header');
const menuButton = document.querySelector('.menu-btn');
const mobileMenu = document.querySelector('.mobile-menu');
const mobileLinks = document.querySelectorAll('.mobile-menu a');
const videoModal = document.querySelector('#video-modal');
const video = document.querySelector('#property-video');
const videoClose = document.querySelector('.video-close');
const videoTriggers = document.querySelectorAll('.video-trigger');

window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 30);
});

menuButton.addEventListener('click', () => {
    const open = mobileMenu.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', open);
    menuButton.innerHTML = open
        ? '<i class="fa-solid fa-xmark"></i>'
        : '<i class="fa-solid fa-bars"></i>';
});

mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        menuButton.setAttribute('aria-expanded', 'false');
        menuButton.innerHTML = '<i class="fa-solid fa-bars"></i>';
    });
});

function closeVideo() {
    videoModal.classList.remove('open');
    videoModal.setAttribute('aria-hidden', 'true');
    video.pause();
    video.removeAttribute('src');
    video.load();
}

videoTriggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
        const source = trigger.dataset.video;

        // Video files can be connected later by adding a path to data-video.
        if (!source) return;

        video.src = source;
        videoModal.classList.add('open');
        videoModal.setAttribute('aria-hidden', 'false');
        video.play().catch(() => {});
    });
});

videoClose.addEventListener('click', closeVideo);
document.querySelector('.video-modal-backdrop').addEventListener('click', closeVideo);

document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && videoModal.classList.contains('open')) closeVideo();
});
