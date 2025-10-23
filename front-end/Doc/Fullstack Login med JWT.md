# Mini-projekt: Fullstack Login med JWT og Beskyttede Sider

I denne opgave skal eleverne bygge et **fuldt login-system** med backend (Express + JWT + bcrypt) og frontend (React). Eleverne vil lære at beskytte sider, håndtere tokens, lave login/logout og (valgfrit) refresh-token.

Opgaven kombinerer frihed til at strukturere mini-projektet med konkrete trin, som guider eleverne.

---

## Læringsmål

- Forstå login-flow mellem frontend og backend
- Implementere JWT-token-baseret authentication
- Beskytte sider med “private routes” i React
- Hashing af passwords med bcrypt
- Håndtere login-status, logout og (valgfrit) refresh tokens

---

## Opgavebeskrivelse

### 1. Login & logout

- Lav en loginformular med felter til **email** og **password**
- Når brugeren indsender formularen, send en **POST-request** til backend (fx `http://localhost:3042/auth/signin`)
- Når serveren returnerer en JWT-token, gem denne i **localStorage**
- Implementér en **logout-knap**, som sletter tokenen og sender brugeren tilbage til login-siden

---

### 2. Beskyttede sider / private routes

- Opret en **profil-side eller backoffice-side**, som kun kan tilgås, hvis brugeren er logget ind
- Brug en funktion til at tjekke, om token findes i localStorage
- Hvis tokenen ikke findes, redirect brugeren automatisk til login-siden

---

### 3. Backend / server

- Hash passwords med **bcrypt** ved oprettelse af brugere
- Backend skal returnere **JWT-token** ved login
- Tokenen skal kunne bruges til at validere adgang til beskyttede endpoints

---

### 4. Frontend komponenter (forslag)

- **Login.jsx**: Formular til login
- **Profil.jsx / Backoffice.jsx**: Beskyttet side
- **NavBar / Header.jsx**: Inkluderer logout-knap
- **App.jsx**: Implementér **protected routes** med React Router

---

### 5. (Valgfrit) Refresh-token system

- Implementér refresh-token, så brugeren kan forny JWT uden at logge ind igen
- Gem refresh-token sikkert på backend og brug det til at udstede nye JWT’er

---

## Krav

- Login- og logout-funktionalitet
- JWT-token gemt i **localStorage**
- Beskyttet side (profil- eller backoffice-side)
- Hashing af passwords med **bcrypt**
- (Ekstra) Refresh-token system

---

## Tips / trin-for-trin vejledning

1. Opret komponenter:
   - Login.jsx
   - Profil/Backoffice.jsx
2. Implementér loginformularen:
   - Send POST-request til serveren med email + password
   - Gem token i localStorage
3. Beskyt dine sider:
   - Tjek login-status ved adgang
   - Redirect til login, hvis token mangler
4. Implementér logout-knap:
   - Slet token fra localStorage
   - Redirect til login-siden
5. (Ekstra) Refresh-token:
   - Når token udløber, brug refresh-token til at hente nyt token

---

## Indlevering

- Aflevering skal ske via et URL fra Github Repository senest kl. 14:00 til underviseren.
- Løsningen skal kunne vise hele **authentication-flowet**, inkl. login, beskyttede sider og logout

---

## Mål for dagen

Du kan **selvstændigt samle hele authentication-flowet** i en mini fullstack-applikation, hvor frontend og backend arbejder sammen, og hvor sikkerhed, token-håndtering og private routes er implementeret.
