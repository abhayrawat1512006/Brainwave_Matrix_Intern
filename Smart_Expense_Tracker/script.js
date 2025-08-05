// Register User
function registerUser(event) {
  event.preventDefault();

  const name = document.querySelector('#register-name').value.trim();
  const email = document.querySelector('#register-email').value.trim();
  const password = document.querySelector('#register-password').value.trim();
  const confirmPassword = document.querySelector('#register-confirm').value.trim();

  if (password !== confirmPassword) {
    alert("Passwords do not match!");
    return;
  }

  const userData = {
    name: name,
    email: email,
    password: password
  };

  // Save to localStorage
  localStorage.setItem("smartUser", JSON.stringify(userData));
  alert("Registration successful!");
  window.location.href = "index.html"; // redirect to login
}

// Login User
function loginUser(event) {
  event.preventDefault();

  const email = document.querySelector('#login-email').value.trim();
  const password = document.querySelector('#login-password').value.trim();

  const storedUser = JSON.parse(localStorage.getItem("smartUser"));

  if (!storedUser || storedUser.email !== email || storedUser.password !== password) {
    alert("Invalid credentials!");
    return;
  }

  alert("Login successful!");
  window.location.href = "dashboard.html"; // redirect to expense dashboard
}