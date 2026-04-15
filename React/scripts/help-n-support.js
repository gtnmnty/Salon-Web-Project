document.addEventListener('DOMContentLoaded', () => {

  const revealElements = document.querySelectorAll('.reveal');

  const revealOnScroll = () => {
    for (let i = 0; i < revealElements.length; i++) {
      let windowHeight = window.innerHeight;
      let elementTop = revealElements[i].getBoundingClientRect().top;
      let elementVisible = 100;

      if (elementTop < windowHeight - elementVisible) {
        revealElements[i].classList.add('active');
      }
    }
  };

  window.addEventListener('scroll', revealOnScroll);
  revealOnScroll();

  const contactForm = document.getElementById('supportForm');

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const submitBtn = contactForm.querySelector('.submit-btn');
    const originalText = submitBtn.innerText;

    submitBtn.innerText = "SENDING...";
    submitBtn.style.opacity = "0.7";
    submitBtn.disabled = true;

    setTimeout(() => {
      alert("Thank you! Your message has been sent. We'll be in touch shortly.");
      submitBtn.innerText = originalText;
      submitBtn.style.opacity = "1";
      submitBtn.disabled = false;
      contactForm.reset();
    }, 2000);
  });

  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    item.addEventListener('click', () => {
      console.log(`Navigating to: ${item.innerText}`);
    });
  });
});