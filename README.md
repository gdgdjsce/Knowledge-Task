# MERN Knowledge Task – Issue Tracker

## Objective

Build a small full-stack MERN application that demonstrates:

- Clean project structure
- Sensible API design
- Predictable React state management
- Proper error handling
- Strong Git discipline
- Ability to read and follow instructions

**This is not about feature count or polish.**  
**This is about clarity, correctness, and decision-making.**

**Expected time:** 3–4 hours

---

## Rules (Read Carefully)

- **Do not commit anything to main**
- Create your own branch:  
  `task/<your-name>`
- Follow the given folder structure
- **Incomplete or instruction-violating submissions will be rejected without review**

---

## Problem Statement

Build an **Issue Tracker** for a fictional product team.

The app should allow users to:

- Create issues
- View a list of issues
- Filter issues
- Update issues
- Delete issues

**Frontend creativity is encouraged.**  
**Backend logic must be clean and boring.**

---

## Tech Stack

- **Frontend:** React
- **Backend:** Node.js + Express
- **Database:** MongoDB
- **Language:** JavaScript

---

## Backend Requirements

### Issue Model (Minimum Fields)
```json
{
  "title": "String",
  "description": "String",
  "priority": "low | medium | high",
  "status": "open | in-progress | closed",
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

### Required API Endpoints

| Method | Route              | Description       |
|--------|--------------------|-------------------|
| POST   | /api/issues        | Create an issue   |
| GET    | /api/issues        | Get all issues    |
| GET    | /api/issues/:id    | Get issue by id   |
| PATCH  | /api/issues/:id    | Update issue      |
| DELETE | /api/issues/:id    | Delete issue      |

### Filtering (Mandatory)

`GET /api/issues` must support:

- `status`
- `priority`

**Example:**
```
/api/issues?status=open&priority=high
```

### Backend Expectations

- Proper HTTP status codes
- Centralized error handling
- Input validation
- No crashing on bad input

---

## Frontend Requirements

### Required Screens

- **Issue List**
  - Display all issues
  - Filter by status and priority
- **Create Issue**
- **Update Issue**
- **Error Handling UI**
  - Backend failures must be visible to the user

### State Management Expectations

- Use React hooks
- Clear separation between:
  - Server state
  - UI state
- No unnecessary global state

**You don't need Redux.**  
**If you use it, justify it.**

---

## Authentication (Optional, But Evaluated)

**You must choose one:**

1. Implement authentication (JWT / session / mock auth)
2. Do not implement auth and explain why

**Rules:**

- Bad or half-implemented auth is worse than no auth
- Your reasoning matters more than the choice
- Explain your decision in the README.

---

## Git Discipline (Very Important)

### Branching

- Work only on your branch
- Naming: `task/<your-name>`

### Commits

- Minimum **5 commits**
- Each commit must represent **one logical change**
- No vague messages

#### ❌ Bad examples:
```
final commit
fix
changes
update
```

#### ✅ Good examples:
```
add issue model and schema
add issue creation endpoint
handle validation errors globally
add issue list UI
```

**Poor commit history = downgrade.**

---

## Folder Structure (Do Not Change)
```
root/
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── models/
│   │   ├── middleware/
│   │   ├── config/
│   │   └── app.js
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── hooks/
│   │   ├── services/
│   │   └── App.jsx
│   └── package.json
│
├── README.md
```

**You may add files inside these folders.**  
**Do not restructure.**

---

## Submission README (Mandatory)

Your branch must include a README section with:

1. **Architecture decisions**
   - Why this structure?
2. **API design**
   - Why these routes and methods?
3. **State management**
   - How state flows in the frontend
4. **Authentication decision**
   - Implemented or skipped, and why
5. **Known limitations**
   - Be honest

**If you skip this, you fail.**

---

## Evaluation Criteria

### Automatic Rejection

- Wrong branch
- Broken structure
- Missing endpoints
- No filtering
- No error handling
- Poor Git discipline

### Manual Review (Ranking)

- API clarity
- State management sanity
- Error handling quality
- Auth decision reasoning
- Code readability

---

## Final Note

**You are not expected to build a production app.**  
**You are expected to think like an engineer.**

**Clarity beats cleverness.**  
**Discipline beats features.**
## 📺 Optional Learning Resources

* MERN Stack Tutorial — https://www.youtube.com/watch?v=Jcs_2jNPgtE
* MERN Stack with Deployment — https://www.youtube.com/watch?v=F9gB5b4jgOI
* MERN Crash Course — https://www.youtube.com/watch?v=FCtD13uNAQE

### React & State
* React Context API Explained — https://www.youtube.com/watch?v=fJlQ4dzBDWM
* React State Management Concepts — https://www.youtube.com/watch?v=qqqyUTTS-9g

### Optional Auth
* Full MERN with Auth Tutorial — https://www.youtube.com/watch?v=9hoyiyut0lE
