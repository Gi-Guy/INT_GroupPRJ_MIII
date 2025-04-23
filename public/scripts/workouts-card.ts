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


  saveButton.addEventListener('click', () => {
    saveWorkout(workout);  
  });

  card.appendChild(title);
  card.appendChild(calories);
  card.appendChild(description);
  card.appendChild(category);
  card.appendChild(saveButton);

  return card;
}


function saveWorkout(workout: Workout) {
  const savedWorkouts = JSON.parse(localStorage.getItem('savedWorkouts') || '[]');
  
  
  const isAlreadySaved = savedWorkouts.some((savedWorkout: Workout) => savedWorkout.name === workout.name);
  
  if (!isAlreadySaved) {
    savedWorkouts.push(workout);
    localStorage.setItem('savedWorkouts', JSON.stringify(savedWorkouts));
    alert(`${workout.name} saved to your profile!`);
  } else {
    alert(`${workout.name} is already saved!`);
  }
}


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


function filterWorkouts() {
  const minCalories = parseInt((document.getElementById('min-calories') as HTMLInputElement).value, 10);

  
  const filteredWorkouts = workouts.filter(workout => workout.calories >= minCalories);

  displayWorkouts(filteredWorkouts);
}


function displayWorkouts(filteredWorkouts: Workout[]) {
  const workoutCardsContainer = document.getElementById('workout-cards') as HTMLElement;
  workoutCardsContainer.innerHTML = ''; 


  if (filteredWorkouts.length === 0) {
    const noWorkoutsMessage = document.createElement('p');
    noWorkoutsMessage.textContent = 'No workouts found with the selected calorie limit.';
    workoutCardsContainer.appendChild(noWorkoutsMessage);
  } else {
    
    filteredWorkouts.forEach(workout => {
      const card = createWorkoutCard(workout, 0); 
      workoutCardsContainer.appendChild(card);
    });
  }
}


document.getElementById('min-calories')?.addEventListener('input', filterWorkouts);


window.onload = () => {
  displayWorkouts(workouts);  
  displaySavedWorkouts();  
};
