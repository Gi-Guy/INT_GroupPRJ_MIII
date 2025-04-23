import { createWorkoutCard } from './workouts-card';  // Import the workout card creation function

export function displaySavedWorkouts() {
  const savedWorkouts = JSON.parse(localStorage.getItem('savedWorkouts') || '[]');
  const savedWorkoutsContainer = document.getElementById('saved-workouts') as HTMLElement;

  if (savedWorkouts.length === 0) {
    const noWorkoutsMessage = document.createElement('p');
    noWorkoutsMessage.textContent = 'No saved workouts yet!';
    savedWorkoutsContainer.appendChild(noWorkoutsMessage);
  } else {
    savedWorkouts.forEach((workout: { name: string; calories: number; description: string; category: string; rating: number }, index: number) => {
      const card = createWorkoutCard(workout, index);  // Pass `false` to not show the image
      savedWorkoutsContainer.appendChild(card);
    });
  }
}
