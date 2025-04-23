document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm') as HTMLFormElement;
  const signupForm = document.getElementById('signupForm') as HTMLFormElement;
  const loginTab = document.getElementById('loginTab') as HTMLButtonElement;
  const signupTab = document.getElementById('signupTab') as HTMLButtonElement;

  loginTab.addEventListener('click', () => {
    loginTab.classList.add('active');
    signupTab.classList.remove('active');
    loginForm.classList.add('active');
    signupForm.classList.remove('active');
  });

  signupTab.addEventListener('click', () => {
    signupTab.classList.add('active');
    loginTab.classList.remove('active');
    signupForm.classList.add('active');
    loginForm.classList.remove('active');
  });

  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const usernameInput = loginForm.querySelector('input[type="username"]') as HTMLInputElement;
    const passwordInput = loginForm.querySelector('input[type="password"]') as HTMLInputElement;
    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();

    if (!username || !password) {
      alert('Please enter username and password.');
      return;
    }

    try {
      const response = await fetch('/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ username, password })
      });

      if (response.ok) {
        window.location.href = '/homePage.html';
      } else {
        const data = await response.json();
        alert(data.error || 'Login failed');
      }
    } catch (error) {
      alert('Login failed. Please try again later.');
    }
  });

  signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const usernameInput = signupForm.querySelector('input[type="username"]') as HTMLInputElement;
    const passwordInput = signupForm.querySelector('input[type="password"]') as HTMLInputElement;
    const genderSelect = document.getElementById('registerGender') as HTMLSelectElement;

    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();
    const gender = genderSelect.value;

    if (!username || !password || !gender) {
      alert('Please fill all fields.');
      return;
    }

    try {
      const response = await fetch('/api/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ username, password, gender })
      });

      if (response.ok) {
        alert('Registration successful! You can now login.');
        loginTab.click();
      } else {
        const data = await response.json();
        alert(data.error || 'Registration failed');
      }
    } catch (error) {
      alert('Registration failed. Please try again later.');
    }
  });
});
