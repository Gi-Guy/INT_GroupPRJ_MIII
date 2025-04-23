// Define the workout data
interface Workout {
  name: string;
  calories: number;
  description: string;
  category: string;
}

const workouts: Workout[] = [
  {
    name: 'Push Ups',
    calories: 100,
    description: 'Push-ups are a great bodyweight exercise for building upper body strength.',
    category: 'strength',
  },
  {
    name: 'Squats',
    calories: 120,
    description: 'Squats are excellent for building leg and glute strength.',
    category: 'strength',
  },
  {
    name: 'Burpees',
    calories: 150,
    description: 'Burpees are a full-body exercise that improves cardiovascular fitness.',
    category: 'cardio',
  },
  {
    name: 'High Knees',
    calories: 130,
    description: 'High knees are a great cardio workout to improve endurance and agility.',
    category: 'cardio',
  },
  {
    name: 'Yoga Stretch',
    calories: 50,
    description: 'A flexibility workout that stretches and relaxes your body.',
    category: 'flexibility',
  },
];

// Function to create a workout card
export function createWorkoutCard(workout: Workout, index: number): HTMLElement {
  const card = document.createElement('div');
  card.classList.add('workout-card');

  const title = document.createElement('h3');
  title.textContent = workout.name;

  const calories = document.createElement('p');
  calories.textContent = `Calories Burned: ${workout.calories}`;

  const description = document.createElement('p');
  description.textContent = workout.description;

  const category = document.createElement('p');
  category.textContent = `Category: ${workout.category}`;

  const saveButton = document.createElement('button');
  saveButton.textContent = 'Save Workout';

  // Add functionality to save the workout to localStorage
  saveButton.addEventListener('click', () => {
    saveWorkout(workout);  // Save workout to localStorage
  });

  card.appendChild(title);
  card.appendChild(calories);
  card.appendChild(description);
  card.appendChild(category);
  card.appendChild(saveButton);

  return card;
}

// Function to save the workout to localStorage
function saveWorkout(workout: Workout) {
  const savedWorkouts = JSON.parse(localStorage.getItem('savedWorkouts') || '[]');
  
  // Check if the workout is already saved
  const isAlreadySaved = savedWorkouts.some((savedWorkout: Workout) => savedWorkout.name === workout.name);
  
  if (!isAlreadySaved) {
    savedWorkouts.push(workout);
    localStorage.setItem('savedWorkouts', JSON.stringify(savedWorkouts));
    alert(`${workout.name} saved to your profile!`);
  } else {
    alert(`${workout.name} is already saved!`);
  }
}

// Function to display saved workouts from localStorage
function displaySavedWorkouts() {
  const savedWorkouts = JSON.parse(localStorage.getItem('savedWorkouts') || '[]');
  const savedWorkoutsContainer = document.getElementById('saved-workouts') as HTMLElement;

  if (savedWorkouts.length === 0) {
    const noWorkoutsMessage = document.createElement('p');
    noWorkoutsMessage.textContent = 'No saved workouts yet!';
    savedWorkoutsContainer.appendChild(noWorkoutsMessage);
  } else {
    savedWorkouts.forEach((workout: Workout, index: number) => {
      const card = createWorkoutCard(workout, index);
      savedWorkoutsContainer.appendChild(card);
    });
  }
}

// Function to filter workouts based on minimum calories
function filterWorkouts() {
  const minCalories = parseInt((document.getElementById('min-calories') as HTMLInputElement).value, 10);

  // If the value isn't a number, use all workouts
  const filteredWorkouts = workouts.filter(workout => workout.calories >= minCalories);

  displayWorkouts(filteredWorkouts);
}

// Function to display all workouts
function displayWorkouts(filteredWorkouts: Workout[]) {
  const workoutCardsContainer = document.getElementById('workout-cards') as HTMLElement;
  workoutCardsContainer.innerHTML = ''; // Clear previous cards

  // If no workouts match the filter, show a message
  if (filteredWorkouts.length === 0) {
    const noWorkoutsMessage = document.createElement('p');
    noWorkoutsMessage.textContent = 'No workouts found with the selected calorie limit.';
    workoutCardsContainer.appendChild(noWorkoutsMessage);
  } else {
    // Otherwise, display the filtered workouts
    filteredWorkouts.forEach(workout => {
      const card = createWorkoutCard(workout, 0); // No need for an index here
      workoutCardsContainer.appendChild(card);
    });
  }
}

// Event listener for the min-calories input
document.getElementById('min-calories')?.addEventListener('input', filterWorkouts);

// Load all workouts initially (with no filter applied)
window.onload = () => {
  displayWorkouts(workouts);  // Display all workouts when the page loads
  displaySavedWorkouts();  // Display saved workouts
};
