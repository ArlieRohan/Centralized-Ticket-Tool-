
# Centralized-Ticket-Tool-

A simple and beginner-friendly support ticket management system built with React (frontend) and Node.js/Express (backend). This project automatically assigns support tickets to the appropriate team based on the issue type and provides instant automated responses.

![Project Status](https://img.shields.io/badge/status-active-success.svg)
![License](https://img.shields.io/badge/license-MIT-blue.svg)

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Usage](#usage)
- [Implementation Details](#implementation-details)
- [API Documentation](#api-documentation)
- [Assumptions & Simplifications](#assumptions--simplifications)
- [Future Improvements](#future-improvements)
- [Contributing](#contributing)
- [License](#license)

---

## ✨ Features

- ✅ Submit support tickets with name, email, issue type, and description
- ✅ Automatic team assignment based on issue type
- ✅ Instant automated response messages
- ✅ Clean and simple user interface
- ✅ Real-time form validation
- ✅ Responsive design for mobile and desktop
- ✅ RESTful API backend

---

## 🛠️ Tech Stack

### Frontend
- **React** (v18+) - UI library
- **CSS3** - Styling (separate CSS file for clean code)
- **Vite** - Build tool and development server

### Backend
- **Node.js** (v14+) - Runtime environment
- **Express.js** (v4.18+) - Web framework
- **CORS** - Cross-origin resource sharing

### Development Tools
- **VS Code** - Code editor
- **npm** - Package manager

---

## 📁 Project Structure

```
ticket-system/
│
├── backend/
│   ├── node_modules/          # Backend dependencies
│   ├── package.json           # Backend package configuration
│   ├── package-lock.json      # Dependency lock file
│   └── server.js              # Express server (main backend file)
│
├── frontend/
│   ├── node_modules/          # Frontend dependencies
│   ├── public/                # Static files
│   ├── src/
│   │   ├── App.jsx            # Main React component
│   │   ├── TicketSystem.jsx   # Ticket form component
│   │   ├── TicketSystem.css   # Component styles
│   │   ├── main.jsx           # React entry point
│   │   └── index.css          # Global styles
│   ├── index.html             # HTML template
│   ├── package.json           # Frontend package configuration
│   ├── vite.config.js         # Vite configuration
│   └── package-lock.json      # Dependency lock file
│
└── README.md                  # This file
```

---

## 🚀 Installation

### Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v14 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js)
- **Git** - [Download here](https://git-scm.com/)

## 🔧 Implementation Details

### Module 1: Frontend (React Application)

**Location:** `/frontend/src/`

**Purpose:** Provides the user interface for submitting and viewing support tickets.

**Key Components:**

1. **TicketSystem.jsx** - Main component containing:
   - Form for ticket submission
   - State management using React Hooks (`useState`)
   - API communication with backend using `fetch()`
   - Response display section
   - Error handling and loading states

2. **TicketSystem.css** - Styling:
   - Clean, modern design
   - Responsive layout using CSS Grid
   - Form validation styles
   - Error message styling
   - Mobile-friendly design

**Why This Module Uses Backend:**

The frontend relies on the backend for several critical reasons:

1. **Data Processing**: 
   - Frontend cannot securely determine team assignments
   - Backend contains business logic that should not be exposed to users
   - Ensures consistent decision-making across all clients

2. **Data Persistence**: 
   - Backend stores all submitted tickets in memory
   - Provides a centralized data store
   - Allows multiple users to view the same data

3. **Security**: 
   - Sensitive logic is hidden from the client
   - Prevents tampering with team assignment rules
   - Input validation happens on the server

4. **Scalability**: 
   - Backend can handle multiple frontend clients simultaneously
   - Can be upgraded to use a database without frontend changes
   - Separates concerns for easier maintenance

**Communication Flow:**
```
1. User fills form
2. Frontend validates input (HTML5 required fields)
3. Frontend sends POST request to backend with JSON data
4. Backend receives and processes data
5. Backend assigns team and generates reply
6. Backend responds with ticket object
7. Frontend receives response and updates UI
```

**State Management:**
```javascript
const [name, setName] = useState('');           // Stores user name
const [email, setEmail] = useState('');         // Stores email
const [issueType, setIssueType] = useState(''); // Stores selected issue
const [description, setDescription] = useState(''); // Stores description
const [ticket, setTicket] = useState(null);     // Stores server response
const [loading, setLoading] = useState(false);  // Loading indicator
const [error, setError] = useState('');         // Error messages
```

---

### Module 2: Backend (Express Server)

**Location:** `/backend/server.js`

**Purpose:** Handles ticket creation, team assignment, automated responses, and data storage.

**Key Features:**

1. **CORS Configuration**
   ```javascript
   app.use(cors());
   ```
   - Allows frontend (port 5173) to communicate with backend (port 3001)
   - Essential for local development where frontend and backend run on different ports
   - Prevents "CORS policy" browser errors

2. **JSON Parsing Middleware**
   ```javascript
   app.use(express.json());
   ```
   - Parses incoming JSON data from frontend
   - Makes request body accessible as `req.body`
   - Required for POST requests

3. **Team Assignment Logic**
   ```javascript
   function getTeam(issueType) {
     if (issueType.includes('Payment')) return 'Finance';
     if (issueType.includes('Login') || issueType.includes('Bug')) return 'Tech';
     return 'Support';
   }
   ```
   - **Payment issues → Finance Team** (handles billing, refunds, transactions)
   - **Login/Bug issues → Tech Team** (handles technical problems)
   - **Everything else → Support Team** (handles general inquiries)
   
   This logic centralizes business rules and ensures consistent assignment across all tickets.

4. **Response Generation**
   ```javascript
   function getReplyMessage(team) {
     if (team === 'Finance') 
       return 'Thank you! Our Finance team will help you with your payment issue within 24 hours.';
     if (team === 'Tech') 
       return 'Thank you! Our Tech team is looking into your issue and will fix it soon.';
     return 'Thank you! Our Support team will get back to you shortly.';
   }
   ```
   - Creates personalized automated responses
   - Provides immediate feedback to users
   - Sets expectations for response time

5. **In-Memory Storage**
   ```javascript
   let tickets = [];        // Array to store all tickets
   let ticketCounter = 1;   // Simple counter for ticket IDs
   ```
   - Stores tickets temporarily during runtime
   - Simple and fast for development
   - **Limitation**: Data is lost when server restarts

**API Routes:**

1. **POST /api/tickets** - Creates a new ticket
   - Receives ticket data from frontend
   - Assigns team based on issue type
   - Generates automated reply
   - Stores ticket in array
   - Returns complete ticket object

2. **GET /api/tickets** - Retrieves all tickets
   - Returns array of all submitted tickets
   - Useful for admin dashboards or viewing history

**Why Backend is Necessary:**

1. ✅ **Centralized Business Logic**
   - All team assignment rules in one place
   - Easy to update without changing frontend
   - Consistent behavior for all users

2. ✅ **Data Validation and Sanitization**
   - Verifies data before processing
   - Prevents malicious input
   - Ensures data integrity

3. ✅ **Consistent Team Assignment Rules**
   - Single source of truth for assignments
   - Cannot be tampered with by users
   - Easy to audit and modify

4. ✅ **Single Source of Truth for Ticket Data**
   - All tickets stored in one place
   - Multiple clients can access same data
   - Foundation for future features

5. ✅ **Foundation for Future Database Integration**
   - Easy to swap in-memory storage for database
   - API remains unchanged for frontend
   - Scalable architecture
---

## 🚀 Future Improvements

If I had more time, here are the enhancements I would prioritize:

### 1. Database Integration ⭐ Priority: HIGH

---

### 2. User Authentication & Authorization ⭐ Priority: HIGH

---

### 3. Email Notifications ⭐ Priority: MEDIUM


### 4. Admin Dashboard ⭐ Priority: HIGH

---

### 5. Real-time Updates with WebSockets ⭐ Priority: MEDIUM

---

### 6. Advanced Team Assignment ⭐ Priority: MEDIUM

---

### 7. File Attachments ⭐ Priority: MEDIUM

---

### 8. Comprehensive Testing Suite ⭐ Priority: HIGH

---

### 9. Security Enhancements ⭐ Priority: HIGH

---


## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---
