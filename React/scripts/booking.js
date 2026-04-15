const slides = Array.from(document.querySelectorAll('.slide'));
const dots = Array.from(document.querySelectorAll('.slide-dot'));
const sameInfoCheckbox = document.getElementById('same-info');
const bookingForm = document.getElementById('bookingForm');
const bookingStatus = document.getElementById('bookingStatus');
const serviceTypeInput = document.getElementById('book-service-type');
const serviceSelect = document.getElementById('book-service');

const accountProfile = {
  name: 'Jon Snow',
  phone: '09354334633',
  email: 'jdncanthtall8678@mail.com'
};

let currentSlide = 0;

function updateSlider(nextIndex) {
  slides.forEach((slide, index) => {
    slide.classList.toggle('active', index === nextIndex);
  });

  dots.forEach((dot, index) => {
    dot.classList.toggle('active', index === nextIndex);
  });
}

function nextSlide() {
  if (!slides.length) return;
  currentSlide = (currentSlide + 1) % slides.length;
  updateSlider(currentSlide);
}

function fillFromAccount(checked) {
  const nameInput = document.getElementById('book-name');
  const phoneInput = document.getElementById('book-phone');
  const emailInput = document.getElementById('book-email');

  if (!nameInput || !phoneInput || !emailInput) return;

  nameInput.value = checked ? accountProfile.name : '';
  phoneInput.value = checked ? accountProfile.phone : '';
  emailInput.value = checked ? accountProfile.email : '';
}

function fillSelectedService() {
  const selectedService = sessionStorage.getItem('selectedService');
  if (!selectedService) return;

  if (serviceTypeInput && !serviceTypeInput.value) {
    serviceTypeInput.value = selectedService;
  }

  if (serviceSelect) {
    const matchingOption = Array.from(serviceSelect.options).find((option) => option.text === selectedService);
    if (matchingOption) {
      serviceSelect.value = matchingOption.value;
    }
  }

  sessionStorage.removeItem('selectedService');
  sessionStorage.removeItem('selectedServiceCategory');
}

sameInfoCheckbox?.addEventListener('change', (event) => {
  fillFromAccount(event.target.checked);
});

bookingForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  bookingStatus.textContent = 'Appointment request submitted. We will contact you to confirm your schedule.';
});

bookingForm?.addEventListener('reset', () => {
  window.setTimeout(() => {
    bookingStatus.textContent = 'Form cleared.';
  }, 0);
});

if (slides.length > 1) {
  window.setInterval(nextSlide, 4000);
}

fillSelectedService();
updateSlider(0);
