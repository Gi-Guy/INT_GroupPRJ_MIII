document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('exerciseForm') as HTMLFormElement;
    const message = document.getElementById('message') as HTMLElement;
  
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
  
      const name = (form.elements.namedItem('name') as HTMLInputElement).value.trim();
      const description = (form.elements.namedItem('description') as HTMLInputElement).value.trim();
      const totalCalories = parseInt((form.elements.namedItem('totalCalories') as HTMLInputElement).value);
  
      if (!name || !description || isNaN(totalCalories)) {
        alert('Please fill in all fields correctly.');
        return;
      }
  
      try {
        const response = await fetch('/api/exercises', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({
            name,
            description,
            totalCalories
          })
        });
  
        const data = await response.json();
        if (response.ok) {
          message.textContent = 'Exercise created successfully!';
          form.reset();
        } else {
          message.textContent = data.error || 'Failed to create exercise';
        }
      } catch (err) {
        message.textContent = 'Server error. Please try again later.';
      }
    });
  });