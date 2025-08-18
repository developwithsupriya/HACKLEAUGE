document.addEventListener("DOMContentLoaded", function() {
    const user = JSON.parse(localStorage.getItem("user"));
    
    if (!user) {
      // If no user is found, send them to the sign-in page
      window.location.href = "signin.html";
    } else {
      // Update page with user info
      document.getElementById("welcome").textContent = "Welcome, " + user.username + "!";
      document.getElementById("email").textContent = "Email: " + user.email;
    }
  });
  
  function logout() {
    localStorage.removeItem("user");
    window.location.href = "signin.html";
  }