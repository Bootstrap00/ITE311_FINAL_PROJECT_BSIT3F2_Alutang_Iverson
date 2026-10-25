document.getElementById("signupForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const msg = document.getElementById("message");
  const password = document.getElementById("password").value;
  if (password !== document.getElementById("confirm").value) {
    msg.textContent = "Passwords do not match.";
    return;
  }
  msg.textContent = "Creating account...";
  try {
    const res = await fetch(`${DIRECTUS_URL}/users/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        first_name: document.getElementById("first_name").value,
        last_name: document.getElementById("last_name").value,
        email: document.getElementById("email").value,
        password
      })
    });
    if (!res.ok) {
      const json = await res.json();
      throw new Error(json.errors?.[0]?.message || "Registration failed");
    }
    msg.textContent = "Account created! Redirecting to login...";
    setTimeout(() => (window.location.href = "login.html"), 1500);
  } catch (err) {
    msg.textContent = err.message;
  }
});