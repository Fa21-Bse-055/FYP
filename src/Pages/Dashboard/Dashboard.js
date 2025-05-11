import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../Components/context/AuthContext';
import TransactionsTable from '../TranscationPage/TransactionsTable';
import './Dashboard.css';

const Dashboard = () => {
  const { currentUser } = useAuth();
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({ total: 0, generatedCount: 0 });
  const [refreshKey, setRefreshKey] = useState(0);

  const [students, setStudents] = useState([]); // student list
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [chatMessages, setChatMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const fetchStudents = async () => {
    try {
      const res = await fetch('http://localhost:3000/api/chat/by-student');
      const data = await res.json();
      setStudents(data.chats);
    } catch (err) {
      console.error("Failed to load student list", err);
    }
  };

  const fetchChatMessages = async (email) => {
    try {
      const res = await fetch(`http://localhost:3000/api/chat/${email}`);
      const data = await res.json();
      setChatMessages(data.messages || []);
    } catch (err) {
      console.error("Failed to fetch messages", err);
    }
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !selectedStudent) return;

    const newMsg = { studentEmail: selectedStudent, sender: 'org', content: newMessage.trim() };

    try {
      const res = await fetch('http://localhost:3000/api/chat/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newMsg),
      });

      const data = await res.json();
      if (data.success) {
        setChatMessages(data.chat.messages);
        setNewMessage("");
      }
    } catch (err) {
      console.error("Failed to send message", err);
    }
  };

  const fetchDocuments = async () => {
    setLoading(true);
    try {
      let response = await fetch('http://localhost:3000/api/users/my-documents', {
        credentials: 'include',
        cache: 'no-cache'
      });

      let useLocalStorage = false;

      if (!response.ok) {
        response = await fetch('http://localhost:3000/api/users/documents', {
          credentials: 'include',
          cache: 'no-cache'
        });
      }

      let docs = [];
      if (!response.ok) {
        const localDocs = JSON.parse(localStorage.getItem('blockSecureDocuments') || '[]');
        docs = localDocs.filter(doc => doc.userId === currentUser?.id);
      } else {
        const data = await response.json();
        docs = data.documents || [];
        const localDocs = JSON.parse(localStorage.getItem('blockSecureDocuments') || '[]');
        const apiHashes = docs.map(doc => doc.contentHash);
        const uniqueLocalDocs = localDocs.filter(doc =>
          !apiHashes.includes(doc.contentHash) &&
          doc.contentHash &&
          doc.userId === currentUser?.id
        );
        docs = [...docs, ...uniqueLocalDocs];
      }

      setDocuments(docs);
      const allGeneratedDocs = JSON.parse(localStorage.getItem('generatedDocuments') || '[]');
      const generatedDocs = allGeneratedDocs.filter(doc => doc.userId === currentUser?.id);
      setStats({ total: docs.length, generatedCount: generatedDocs.length });

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = () => setRefreshKey(prev => prev + 1);

  useEffect(() => {
    fetchDocuments();
    fetchStudents();
  }, [refreshKey]);

  useEffect(() => {
    if (selectedStudent) fetchChatMessages(selectedStudent);
  }, [selectedStudent]);

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div className="header-content">
          <h1>Organization Dashboard</h1>
          <p>Welcome, {currentUser?.organization_name || 'Organization'}</p>
        </div>
        <button onClick={handleRefresh} className="refresh-button">
          {loading ? "Refreshing..." : "Refresh"}
        </button>
      </div>

      <div className="stats-container">
        <div className="stat-card">
          <h3>Total Uploaded Documents</h3>
          <p className="stat-number">{stats.total}</p>
        </div>
        <div className="stat-card generated">
          <h3>Generated Documents</h3>
          <p className="stat-number">{stats.generatedCount}</p>
        </div>
      </div>

      <div className="action-buttons">
        <Link to="/uploadDocument" className="action-button">+ Upload New Document</Link>
        <Link to="/generateDocument" className="action-button">📄 Generate Document</Link>
        <Link to="/verificationFile" className="action-button">⬇️ Download Verification File</Link>
      </div>

      {error && (
        <div className="error-message">
          <p>{error}</p>
          <button onClick={handleRefresh}>Try Again</button>
        </div>
      )}

      <div className="documents-section">
        <h2>Your Documents</h2>
        {documents.length === 0 ? (
          <p>You haven't uploaded any documents yet.</p>
        ) : (
          <div className="documents-grid">
            {documents.map(doc => (
              <div key={doc._id} className={`document-card ${doc.status}`}>
                <div className="document-header">
                  <h3>{doc.title}</h3>
                  <span className={`status-badge ${doc.status}`}>
                    {doc.status.charAt(0).toUpperCase() + doc.status.slice(1)}
                  </span>
                </div>
                <p>{doc.description}</p>
                <span>Uploaded: {new Date(doc.createdAt).toLocaleDateString()}</span>
              </div>
            ))}
          </div>
        )}
      </div>
      <div>
        <TransactionsTable/>
      </div>

      {/* Chat Panel */}
      <div className="chat-panel">
        <h2>Chat with Students</h2>
        <select onChange={(e) => setSelectedStudent(e.target.value)} value={selectedStudent || ''}>
          <option value="" disabled>Select a student</option>
          {students.map(email => (
            <option key={email} value={email}>{email}</option>
          ))}
        </select>

        {selectedStudent && (
          <>
            <div className="chat-box">
              {chatMessages.length === 0 ? (
                <p className="no-messages">No messages yet.</p>
              ) : (
                chatMessages.map((msg, idx) => (
                  <div key={idx} className={`chat-message ${msg.sender === 'org' ? 'sent' : 'received'}`}>
                    <p><strong>{msg.sender === 'org' ? "You" : "Student"}:</strong> {msg.content}</p>
                    <span className="timestamp">{new Date(msg.timestamp).toLocaleString()}</span>
                  </div>
                ))
              )}
            </div>
            <div className="chat-input-container">
              <input
                type="text"
                placeholder="Type your message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              />
              <button onClick={handleSendMessage}>Send</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
