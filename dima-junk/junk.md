body {
  margin: 0;
  font-family: 'Georgia', serif;
  background-color: #f9f5ec;
  color: #4e342e;
}

.navbar {
  background-color: #c2a47e;
  display: flex;
  align-items: center;     /* vertical centering */
  padding: 1rem 2rem;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}

/* left and right groups each take equal flex‑space */
.nav-left,
.nav-right {
  flex: 1;
  display: flex;
  gap: 1rem;               /* space between links */
  align-items: center;
}

.nav-right {
  justify-content: flex-end;
}

.nav-link {
  color: #fffaf0;
  text-decoration: none;
  font-weight: bold;
  font-size: 1.1rem;
}

.nav-link:hover {
  text-decoration: dotted;
}

/* logo sits between the two flex:1 groups */
.img-logo {
  flex: 0;                 /* don’t stretch */
  width: 100px;
  height: auto;
}


// home

<section class="exercise-grid">
        
        <div class="exercise-card">
          <div class="exercise-sketch sketch-1"><img src="/public/img/vector push up.png" alt="push up"></div>
          <p class="exercise-title">Push Ups</p>
          <p>100cal/15min</p>
        </div>
    
        <div class="exercise-card">
          <div class="exercise-sketch sketch-2"><img src="/public/img/squats.png" alt="squats"></div>
          <p class="exercise-title">Squats</p>
          <p>100cal/15min</p>
        </div>
    
        <div class="exercise-card">
          <div class="exercise-sketch sketch-3"><img src="/public/img/lunges.png" alt="lunges"></div>
          <p class="exercise-title">Lunges</p>
          <p>100cal/15min</p>
        </div>
    
        <div class="exercise-card">
          <div class="exercise-sketch sketch-4"><img src="/public/img/cardio.jpg" alt=""></div>
          <p class="exercise-title">Cardio</p>
          <p>100cal/15min</p>
        </div>
    
        <div class="exercise-card">
          <div class="exercise-sketch sketch-5"><img src="/public/img/burpee.jpg" alt="burpee"></div>
          <p class="exercise-title">Burpees</p>
          <p>100cal/15min</p>
        </div>
    
        <div class="exercise-card">
          <div class="exercise-sketch sketch-6"> <img src="/public/img/Jumping Jacks.jpg" alt="Jumping Jacks"></div>
          <p class="exercise-title">Jumping Jacks</p>
          <p>100cal/15min</p>
        </div>
    
        <div class="exercise-card">
          <div class="exercise-sketch sketch-7"><img src="/public/img/High Knees.jpg" alt="High Knees"></div>
          <p class="exercise-title">High Knees</p>
          <p>100cal/15min</p>
        </div>
    
        <div class="exercise-card">
          <div class="exercise-sketch sketch-8"><img src="/public/img/Plank.jpg" alt="Plank"></div>
          <p class="exercise-title">Plank</p>
          <p>100cal/15min</p>
        </div>
    
      </section>
    