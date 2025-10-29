const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

signUpButton.addEventListener('click', () => {
  container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
  container.classList.remove("right-panel-active");
});
// Forgot Password Popup
const forgotLink = document.getElementById('forgotLink');
const popupOverlay = document.getElementById('popupOverlay');
const closePopup = document.getElementById('closePopup');
const resetBtn = document.getElementById('resetBtn');

forgotLink.addEventListener('click', (e) => {
  e.preventDefault();
  popupOverlay.style.display = 'flex';
});

closePopup.addEventListener('click', () => {
  popupOverlay.style.display = 'none';
});

window.addEventListener('click', (e) => {
  if (e.target === popupOverlay) {
    popupOverlay.style.display = 'none';
  }
});

resetBtn.addEventListener('click', () => {
  const email = document.getElementById('resetEmail').value;
  if (email.trim() === '') {
    alert('Please enter your email.');
  } else {
    alert(`Password reset link sent to ${email}`);
    popupOverlay.style.display = 'none';
  }
});
