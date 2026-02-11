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

### Step 1: Clone the Repository

```bash
git clone https://github.com/ArlieRohan/Centralized-Ticket-Tool-.git
cd ticket-system
```

### Step 2: Install Backend Dependencies

```bash
cd backend
npm install
```

### Step 3: Install Frontend Dependencies

```bash
cd ../frontend
npm install
```

---

## 💻 Usage

### Starting the Application

You need to run both the backend and frontend servers simultaneously.

#### Terminal 1 - Start Backend Server

```bash
cd backend
node server.js
```

Expected output:
```
Server is running on http://localhost:3001
Ready to receive tickets!
```

#### Terminal 2 - Start Frontend Development Server

```bash
cd frontend
npm run dev
```

Expected output:
```
VITE v5.0.0  ready in 500 ms

➜  Local:   http://localhost:5173/
```

### Accessing the Application

Open your browser and navigate to:
```
http://localhost:5173
```

### Testing the Backend API

You can verify the backend is running by visiting:
```
http://localhost:3001/api/tickets
```

Expected response: `[]` (empty array)

---

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

## 📡 API Documentation

### Base URL
```
http://localhost:3001/api
```

### Endpoints

#### 1. Create New Ticket

**Endpoint:** `POST /api/tickets`

**Description:** Creates a new support ticket and assigns it to the appropriate team.

**Request Headers:**
```json
{
  "Content-Type": "application/json"
}
```

**Request Body:**
```json
{
  "name": "string",          // Required - User's full name
  "email": "string",         // Required - Valid email address
  "issueType": "string",     // Required - Type of issue
  "description": "string"    // Required - Detailed description
}
```

**Example Request:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "issueType": "Payment Issue",
  "description": "My payment was declined but amount was deducted"
}
```

**Response (Success - 200 OK):**
```json
{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com",
  "issueType": "Payment Issue",
  "description": "My payment was declined but amount was deducted",
  "team": "Finance",
  "reply": "Thank you! Our Finance team will help you with your payment issue within 24 hours.",
  "status": "Open"
}
```

**Response Fields:**
- `id` (number) - Unique ticket identifier (incremental)
- `name` (string) - User's name
- `email` (string) - User's email
- `issueType` (string) - Type of issue reported
- `description` (string) - Detailed issue description
- `team` (string) - Assigned team (Finance/Tech/Support)
- `reply` (string) - Automated response message
- `status` (string) - Current ticket status (always "Open" initially)

**Team Assignment Rules:**
| Issue Type Contains | Assigned Team | Reason |
|---------------------|---------------|---------|
| "Payment"           | Finance       | Financial transactions and billing |
| "Login"             | Tech          | Technical authentication issues |
| "Bug"               | Tech          | Software defects and errors |
| Others              | Support       | General questions and inquiries |

---

#### 2. Get All Tickets

**Endpoint:** `GET /api/tickets`

**Description:** Retrieves all submitted tickets from the system.

**Request Headers:** None required

**Response (Success - 200 OK):**
```json
[
  {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "issueType": "Payment Issue",
    "description": "My payment was declined",
    "team": "Finance",
    "reply": "Thank you! Our Finance team will help you...",
    "status": "Open"
  },
  {
    "id": 2,
    "name": "Jane Smith",
    "email": "jane@example.com",
    "issueType": "Login Problem",
    "description": "Cannot log in to my account",
    "team": "Tech",
    "reply": "Thank you! Our Tech team is looking into...",
    "status": "Open"
  }
]
```

**Empty Response (when no tickets exist):**
```json
[]
```

---

### API Testing Examples

#### Using cURL

**Create a ticket:**
```bash
curl -X POST http://localhost:3001/api/tickets \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "issueType": "Payment Issue",
    "description": "Testing the API"
  }'
```

**Get all tickets:**
```bash
curl http://localhost:3001/api/tickets
```

#### Using Browser

Simply visit:
```
http://localhost:3001/api/tickets
```

#### Using JavaScript (Frontend)

```javascript
// Create ticket
const response = await fetch('http://localhost:3001/api/tickets', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'John Doe',
    email: 'john@example.com',
    issueType: 'Bug Report',
    description: 'Found a bug in the system'
  })
});

const ticket = await response.json();
console.log(ticket);

// Get all tickets
const allTickets = await fetch('http://localhost:3001/api/tickets');
const tickets = await allTickets.json();
console.log(tickets);
```

---

## 🎯 Assumptions & Simplifications

### 1. Data Storage


### 2. Authentication & Authorization


---

### 3. Ticket IDs

---

### 4. Team Assignment


---

### 5. Automated Responses

---

### 6. Status Management

---

### 7. Error Handling


---

### 8. Frontend-Backend Communication

---

### 9. Input Validation


---

### 10. Scalability

---

## 🚀 Future Improvements


**Must-Have for Production (HIGH):**
1. Database Integration
2. User Authentication
3. Admin Dashboard
4. Testing Suite
5. Security Enhancements
6. Deployment Pipeline

**Nice-to-Have (MEDIUM):**
1. Email Notifications
2. Real-time Updates
3. Advanced Team Assignment
4. File Attachments
5. Search & Filtering
6. Ticket History
7. Analytics Dashboard

**Future Enhancements (LOW):**
1. Internationalization
2. Mobile App
3. AI-powered features

**Total Estimated Time:** 40-55 days of full-time development
---


---

## 👨‍💻 Author

**Your Name**
- GitHub: [@yourusername](https://github.com/yourusername)
- Email: your.email@example.com



