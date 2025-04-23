document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('min-calories') as HTMLInputElement;
    const button = document.getElementById('generate-plan') as HTMLButtonElement;
    const container = document.getElementById('workout-plan-container') as HTMLElement;
  
    let userId = '';
  
    async function fetchCurrentUser() {
      try {
        const res = await fetch('/api/users/me', {
          credentials: 'include'
        });
        const user = await res.json();
        userId = user.id;
      } catch (err) {
        alert('You must be logged in to use this feature.');
      }
    }
  
    fetchCurrentUser();
  
    button.addEventListener('click', async () => {
      const targetCalories = parseInt(input.value);
      if (!targetCalories || targetCalories <= 0) {
        alert('Please enter a valid number of calories.');
        return;
      }
      if (!userId) {
        alert('User ID not available. Are you logged in?');
        return;
      }
  
      try {
        const response = await fetch(`/api/workout-plans`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({ userId, targetCalories })
        });
  
        const data = await response.json();
        container.innerHTML = '';
        if (data.exercises && data.exercises.length > 0) {
          data.exercises.forEach((ex: any) => {
            const card = document.createElement('div');
            card.className = 'exercise-card';
            card.innerHTML = `
              <h3>${ex.name}</h3>
              <p>${ex.description}</p>
              <p><strong>Calories:</strong> ${ex.totalCalories}</p>
            `;
            container.appendChild(card);
          });
        } else {
          container.innerHTML = '<p>No exercises found for that calorie range.</p>';
        }
      } catch (error) {
        console.error('Error fetching plan:', error);
        alert('Failed to generate workout plan.');
      }
    });
  });
  