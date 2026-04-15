const authContainer = document.getElementById('authContainer');
const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');
const termsPopup = document.getElementById('termsPopup');

function setAuthMode(mode) {
  const isSignup = mode === 'signup';

  authContainer?.classList.toggle('signup-active', isSignup);
  loginForm?.classList.toggle('active', !isSignup);
  signupForm?.classList.toggle('active', isSignup);
}

function toggleAuth() {
  const nextMode = signupForm?.classList.contains('active') ? 'login' : 'signup';
  setAuthMode(nextMode);
}

function openTerms() {
  if (!termsPopup) return;
  termsPopup.style.display = 'flex';
  document.body.style.overflow = 'hidden';
}

function closeTerms() {
  if (!termsPopup) return;
  termsPopup.style.display = 'none';
  document.body.style.overflow = '';
}

window.toggleAuth = toggleAuth;
window.openTerms = openTerms;
window.closeTerms = closeTerms;

window.addEventListener('click', (event) => {
  if (event.target === termsPopup) {
    closeTerms();
  }
});

window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeTerms();
  }
});

setAuthMode('login');
