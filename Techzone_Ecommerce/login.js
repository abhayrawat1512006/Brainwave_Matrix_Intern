// Toggle Login/Register
let isLogin = true;

function toggleForm() {
  isLogin = !isLogin;

  document.getElementById("formTitle").innerText = isLogin ? "🔐 Login" : "📝 Register";
  document.getElementById("submitBtn").innerText = isLogin ? "Login" : "Register";
  document.getElementById("toggleText").innerHTML = isLogin
    ? `New user? <a href="#" onclick="toggleForm()">Register here</a>`
    : `Already have an account? <a href="#" onclick="toggleForm()">Login here</a>`;
    
  document.getElementById("extraFields").style.display = isLogin ? "none" : "block";
}

// Dummy Submit (you can link it with backend later)
document.getElementById("authForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const pass = document.getElementById("password").value;

  if (isLogin) {
    alert(`✅ Logged in as ${email}`);
  } else {
    const name = document.getElementById("fullname").value;
    const username = document.getElementById("username").value;
    alert(`✅ Registered as ${name} (${username})`);
  }

  this.reset();
});