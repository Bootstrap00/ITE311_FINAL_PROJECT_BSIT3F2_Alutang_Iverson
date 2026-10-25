document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const msg = document.getElementById("message");
  msg.textContent = "Signing in...";
  try {
    const res = await fetch(`${DIRECTUS_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: document.getElementById("email").value,
        password: document.getElementById("password").value
      })
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.errors?.[0]?.message || "Login failed");
    localStorage.setItem("fc_token", json.data.access_token);
    localStorage.setItem("fc_refresh", json.data.refresh_token);
    msg.textContent = "Success! Redirecting...";
    window.location.href = "dashboard.html"; // built in a later feature
  } catch (err) {
    msg.textContent = err.message;
  }
});