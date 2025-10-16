document.addEventListener("DOMContentLoaded", () => {
  const loginBox = document.getElementById("loginBox");
  const registerBox = document.getElementById("registerBox");
  const showRegister = document.getElementById("showRegister");
  const showLogin = document.getElementById("showLogin");

  if (showRegister) {
    showRegister.addEventListener("click", (e) => {
      e.preventDefault();
      loginBox.classList.add("hidden");
      registerBox.classList.remove("hidden");
    });
  }

  if (showLogin) {
    showLogin.addEventListener("click", (e) => {
      e.preventDefault();
      registerBox.classList.add("hidden");
      loginBox.classList.remove("hidden");
    });
  }

  // --- регистрация ---
  const registerForm = document.getElementById("registerForm");
  if (registerForm) {
    registerForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const username = document.getElementById("registerUsername").value.trim();
      const password = document.getElementById("registerPassword").value;
      const confirm = document.getElementById("confirmPassword").value;

      if (password !== confirm) {
        alert("Пароли не совпадают");
        return;
      }

      if (localStorage.getItem(username)) {
        alert("Такой пользователь уже существует");
        return;
      }

      localStorage.setItem(username, JSON.stringify({ password }));
      alert("Регистрация успешна!");
      registerBox.classList.add("hidden");
      loginBox.classList.remove("hidden");
    });
  }

  // --- вход ---
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const username = document.getElementById("loginUsername").value.trim();
      const password = document.getElementById("loginPassword").value;

      const user = localStorage.getItem(username);
      if (!user) {
        alert("Пользователь не найден");
        return;
      }

      const parsed = JSON.parse(user);
      if (parsed.password !== password) {
        alert("Неверный пароль");
        return;
      }

      localStorage.setItem("loggedUser", username);
      alert("Вы вошли как " + username);
      window.location.href = "../index.html";
    });
  }

//   --- когда полльзователь вошел в акк--
  const loginLink = document.getElementById("loginLink");
  const usernameLink = document.getElementById("username");

  if (loginLink && usernameLink) {
    const loggedUser = localStorage.getItem("loggedUser");

    if (loggedUser) {
      loginLink.style.display = "none";
      usernameLink.style.display = "inline";
      usernameLink.textContent = loggedUser;

    //  выход из аккаунта
      usernameLink.addEventListener("click", (e) => {
        e.preventDefault();

        const ok = confirm("Хотите выйти из аккаунта?");
        if (ok) {
          localStorage.removeItem("loggedUser");
          alert("Вы вышли из аккаунта");
          location.reload();
        }
      });
    } else {
      loginLink.style.display = "inline";
      usernameLink.style.display = "none";
    }
  }
});
