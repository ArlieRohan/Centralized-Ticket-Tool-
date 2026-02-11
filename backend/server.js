// Simple Support Ticket System - Backend
// This is a basic Express server that handles support tickets

const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3001;

// Allow frontend to connect to backend
app.use(cors());
app.use(express.json());

// Store tickets in an array (temporary storage)
let tickets = [];
let ticketCounter = 1;

// Function to decide which team handles the ticket
function getTeam(issueType) {
  if (issueType.includes('Payment')) {
    return 'Finance';
  } else if (issueType.includes('Login') || issueType.includes('Bug')) {
    return 'Tech';
  } else {
    return 'Support';
  }
}

// Function to create a reply message
function getReplyMessage(team) {
  if (team === 'Finance') {
    return 'Thank you! Our Finance team will help you with your payment issue within 24 hours.';
  } else if (team === 'Tech') {
    return 'Thank you! Our Tech team is looking into your issue and will fix it soon.';
  } else {
    return 'Thank you! Our Support team will get back to you shortly.';
  }
}

// CREATE A NEW TICKET (This was missing!)
app.post('/api/tickets', (req, res) => {
  const { name, email, issueType, description } = req.body;
  
  // Assign team
  const team = getTeam(issueType);
  
  // Create reply
  const reply = getReplyMessage(team);
  
  // Create ticket object
  const ticket = {
    id: ticketCounter,
    name: name,
    email: email,
    issueType: issueType,
    description: description,
    team: team,
    reply: reply,
    status: 'Open'
  };
  
  tickets.push(ticket);
  ticketCounter++;
  
  res.json(ticket);
});

// GET ALL TICKETS (This was missing!)
app.get('/api/tickets', (req, res) => {
  res.json(tickets);
});

// Start the server
app.listen(PORT, () => {
  console.log('Server is running on http://localhost:3001');
  console.log('Ready to receive tickets!');
});