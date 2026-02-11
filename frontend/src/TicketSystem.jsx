import React, { useState } from 'react';
import './TicketSystem.css';

function TicketSystem() {
  // State to store form data
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [issueType, setIssueType] = useState('');
  const [description, setDescription] = useState('');
  
  // State to store the ticket response
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      // Send data to backend
      const response = await fetch('http://localhost:3001/api/tickets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name,
          email: email,
          issueType: issueType,
          description: description
        })
      });
      
      const data = await response.json();
      setTicket(data);
      
      
    } catch (err) {
      setError('Could not connect to server. Make sure backend is running on port 3001.');
    }
    
    setLoading(false);
  };

  return (
    <div className="ticket-container">
      <h1 className="ticket-title">Support Ticket System</h1>
      
      <div className="ticket-content">
        {/* Left Side - Form */}
        <div className="form-box">
          <h2 className="box-heading">Submit a Ticket</h2>
          
          {error && <div className="error-message">{error}</div>}
           
          <form onSubmit={handleSubmit}>  {/*here we calling the submition function called handleSubmit*/}
            <div className="form-group">
              <label className="form-label">Your Name:</label>  {/* a controlled input is implemented  to get nam email and other details*/}
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="form-input"
                placeholder="Enter your name"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Email:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="form-input"
                placeholder="Enter your email"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Issue Type:</label>
              <select
                value={issueType}
                onChange={(e) => setIssueType(e.target.value)}
                required
                className="form-select"
              >
                <option value="">-- Select Issue Type --</option>
                <option value="Payment Issue">Payment Issue</option>
                <option value="Login Problem">Login Problem</option>
                <option value="Bug Report">Bug Report</option>
                <option value="General Question">General Question</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Description:</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                rows="4"
                className="form-textarea"
                placeholder="Describe your issue..."
              />
            </div>

            <button type="submit" disabled={loading} className="submit-button">
              {loading ? 'Sending...' : 'Submit Ticket'}
            </button>
          </form>
        </div>

        {/* Right Side - Response */}
        <div className="response-box">
          <h2 className="box-heading">Ticket Response</h2>
          
          {!ticket ? (
            <div className="empty-state">
              <p>Submit a ticket to see the response here</p>
            </div>
          ) : (
            <div>
              <div className="ticket-info">
                <p><strong>Ticket ID:</strong> #{ticket.id}</p>
                <p><strong>Status:</strong> {ticket.status}</p>
                <p><strong>Assigned Team:</strong> {ticket.team}</p>
              </div>
              
              <div className="details-box">
                <p><strong>Name:</strong> {ticket.name}</p>
                <p><strong>Email:</strong> {ticket.email}</p>
                <p><strong>Issue Type:</strong> {ticket.issueType}</p>
                <p><strong>Description:</strong></p>
                <p className="description-text">{ticket.description}</p>
              </div>
              
              <div className="reply-box">
                <p className="reply-label">Reply from {ticket.team} Team:</p>
                <p className="reply-text">{ticket.reply}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default TicketSystem;