document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("signin-form");
  
    form.addEventListener("submit", function (event) {
      event.preventDefault(); // Stop form from refreshing the page
  
      const username = document.getElementById("username").value.trim();
      const email = document.getElementById("email").value.trim();
      const password = document.getElementById("password").value;
  
      // Try to get an existing user from localStorage
      let storedUser = JSON.parse(localStorage.getItem("user"));
  
      // Simple "hash" using Base64 for demonstration only
      const hashedPassword = btoa(password);
  
      if (!storedUser) {
        // No user stored yet -> Create new user
        storedUser = { username, email, password: hashedPassword };
        localStorage.setItem("user", JSON.stringify(storedUser));
        alert("Profile created successfully!");
        window.location.href = "profile.html";
      } else {
        // User already exists -> Check credentials
        if (
          storedUser.username === username &&
          storedUser.password === hashedPassword
        ) {
          // Password matches -> Log in
          alert("Login successful!");
          window.location.href = "profile.html";
        } else {
          // Password or username incorrect
          alert("Invalid credentials. Please try again.");
        }
      }
    });
  });