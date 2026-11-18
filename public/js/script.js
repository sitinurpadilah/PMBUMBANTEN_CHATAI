const chatWidget = document.getElementById('chatWidget');
const chatBox = document.getElementById('chatBox');
const userInput = document.getElementById('userInput');

function toggleChat() {
    chatWidget.classList.toggle('open');
}

document.getElementById('chatToggleButton').addEventListener('click', toggleChat);
document.getElementById('closeChatButton').addEventListener('click', toggleChat);
document.getElementById('sendButton').addEventListener('click', sendMessage);
document.getElementById('footerChatButton').addEventListener('click', toggleChat);

function appendMessage(text, isUser) {
    const msgDiv = document.createElement('div');
    msgDiv.classList.add('message', isUser ? 'user-message' : 'bot-message');
    msgDiv.textContent = text;
    chatBox.appendChild(msgDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
}

async function sendMessage() {
    const message = userInput.value.trim();
    if (!message) return;

    appendMessage(message, true);
    userInput.value = '';

    try {
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message })
        });
        const data = await response.json();
        appendMessage(data.reply, false);
    } catch (error) {
        appendMessage('Maaf, server sedang tidak terhubung.', false);
    }
}

userInput.addEventListener('keypress', event => {
    if (event.key === 'Enter') sendMessage();
});

const slides = Array.from(document.querySelectorAll('.hero-slide'));
const indicators = Array.from(document.querySelectorAll('.hero-indicator'));
const hero = document.querySelector('.hero');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const slideInterval = 5000;
let activeSlide = 0;
let slideTimer;

function showSlide(index) {
    activeSlide = (index + slides.length) % slides.length;

    slides.forEach((slide, slideIndex) => {
        const isActive = slideIndex === activeSlide;
        slide.classList.toggle('is-active', isActive);
        slide.setAttribute('aria-hidden', String(!isActive));
        indicators[slideIndex].classList.toggle('is-active', isActive);
        indicators[slideIndex].setAttribute('aria-current', String(isActive));
    });
}

function stopSlideShow() {
    clearInterval(slideTimer);
    slideTimer = null;
}

function startSlideShow() {
    stopSlideShow();
    if (
        slides.length < 2 ||
        prefersReducedMotion.matches ||
        document.hidden ||
        hero.matches(':hover') ||
        hero.contains(document.activeElement)
    ) {
        return;
    }

    slideTimer = setInterval(() => showSlide(activeSlide + 1), slideInterval);
}

document.querySelector('.hero-prev').addEventListener('click', () => {
    showSlide(activeSlide - 1);
    startSlideShow();
});

document.querySelector('.hero-next').addEventListener('click', () => {
    showSlide(activeSlide + 1);
    startSlideShow();
});

indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
        showSlide(index);
        startSlideShow();
    });
});

hero.addEventListener('mouseenter', stopSlideShow);
hero.addEventListener('mouseleave', startSlideShow);
hero.addEventListener('focusin', stopSlideShow);
hero.addEventListener('focusout', event => {
    if (!hero.contains(event.relatedTarget)) startSlideShow();
});
document.addEventListener('visibilitychange', startSlideShow);
startSlideShow();
