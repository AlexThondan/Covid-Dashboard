document.addEventListener("DOMContentLoaded", () => {
    // Handle Signup
    const signupForm = document.getElementById("signup-form");
    if (signupForm) {
        signupForm.addEventListener("submit", async (event) => {
            event.preventDefault();
            const name = document.getElementById("signup-name").value;
            const email = document.getElementById("signup-email").value;
            const password = document.getElementById("signup-password").value;
            
            const response = await fetch("/auth/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password })
            });

            const data = await response.json();
            if (response.ok) {
                alert("Signup successful! You can now log in.");
                window.location.href = "login.html"; // Redirect to login
            } else {
                document.getElementById("signup-error").innerText = data.message || "Signup failed.";
            }
        });
    }

    // Handle Login
    const loginForm = document.getElementById("login-form");
    if (loginForm) {
        loginForm.addEventListener("submit", async (event) => {
            event.preventDefault();
            const email = document.getElementById("login-email").value;
            const password = document.getElementById("login-password").value;
            
            const response = await fetch("/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();
            if (response.ok) {
                localStorage.setItem("token", data.token); // Store token
                window.location.href = "index.html"; // Redirect to dashboard
            } else {
                document.getElementById("login-error").innerText = data.message || "Login failed.";
            }
        });
    }

    // Logout Function
    const logoutButton = document.getElementById("logout-button");
    if (logoutButton) {
        logoutButton.addEventListener("click", () => {
            localStorage.removeItem("token"); // Remove token
            window.location.href = "login.html"; // Redirect to login
        });
    }

    // Protect Dashboard (Redirect if not logged in)
    if (window.location.pathname === "/index.html") {
        const token = localStorage.getItem("token");
        if (!token) {
            alert("You must be logged in to access the dashboard.");
            window.location.href = "login.html"; // Redirect to login
        }
    }
});
