// =========================
// UI: Sign In / Sign Up Toggle
// =========================
const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

signUpButton.addEventListener('click', () => {
  container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
  container.classList.remove("right-panel-active");
});

// =========================
// UI: Forgot Password Popup
// =========================
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

// Forgot Password Functionality
resetBtn.addEventListener('click', async () => {
  const email = document.getElementById('resetEmail').value.trim();

  if (!email) {
    alert('Please enter your email.');
    return;
  }

  try {
    const response = await fetch("https://auth-system-p7mn.onrender.com/api/auth/forgot-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();

    if (response.ok) {
      alert("✅ Reset link sent to your email!");
      popupOverlay.style.display = 'none';
    } else {
      alert(`⚠️ ${data.msg || "Error sending reset link"}`);
    }
  } catch (error) {
    console.error("Error:", error);
    alert("❌ Something went wrong. Try again later.");
  }
});



// =========================
// BACKEND INTEGRATION
// =========================

// Select both forms
const signUpForm = document.querySelector(".sign-up-container form");
const signInForm = document.querySelector(".sign-in-container form");

// ✅ REGISTER USER
signUpForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = signUpForm.querySelector('input[placeholder="Name"]').value.trim();
  const email = signUpForm.querySelector('input[placeholder="Email"]').value.trim();
  const password = signUpForm.querySelector('input[placeholder="Password"]').value.trim();

  if (!name || !email || !password) {
    alert("Please fill all fields");
    return;
  }

  try {
    const res = await fetch("https://auth-system-p7mn.onrender.com/api/auth/register",{
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await res.json();
    alert(data.msg);

    if (res.ok) {
      // Redirect to home
      window.location.href = "./HOME/home.html";
    }
  } catch (err) {
    alert("Error: " + err.message);
  }
});

// ✅ LOGIN USER
signInForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = signInForm.querySelector('input[placeholder="Email"]').value.trim();
  const password = signInForm.querySelector('input[placeholder="Password"]').value.trim();

  if (!email || !password) {
    alert("Please enter both email and password");
    return;
  }

  try {
    const res = await fetch("https://auth-system-p7mn.onrender.com/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (res.ok) {
      alert("Login Successful");
      localStorage.setItem("token", data.token);
      window.location.href = "./HOME/home.html";
    } else {
      alert(data.msg);
    }
  } catch (err) {
    alert("Error: " + err.message);
  }
});
