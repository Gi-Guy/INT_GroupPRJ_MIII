const profileForm = document.getElementById('profile-form') as HTMLFormElement;
const profilePicInput = document.getElementById('profile-pic') as HTMLInputElement;
const previewImage = document.getElementById('preview') as HTMLImageElement;
const heightInput = document.getElementById('height') as HTMLInputElement;
const weightInput = document.getElementById('weight') as HTMLInputElement;
const calorieGoalInput = document.getElementById('calorie-goal') as HTMLInputElement;
const ageInput = document.getElementById('age') as HTMLInputElement;


profilePicInput.addEventListener('change', (event) => {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      previewImage.src = reader.result as string;
    };
    reader.readAsDataURL(file);
  }
});


profileForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const formData = new FormData();
  const profilePic = profilePicInput.files?.[0];
  if (profilePic) {
    formData.append('profile-pic', profilePic);
  }
  formData.append('height', heightInput.value);
  formData.append('weight', weightInput.value);
  formData.append('calorie-goal', calorieGoalInput.value);
  formData.append('age', ageInput.value);

  try {
    const response = await fetch('/save-profile', {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      alert('Profile saved successfully!');
    } else {
      alert('Error saving profile.');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('Error saving profile.');
  }
});
