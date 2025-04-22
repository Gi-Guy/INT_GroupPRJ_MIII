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
