import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../Components/context/AuthContext';
import './Dashboard.css';

const Dashboard = () => {
  const { currentUser } = useAuth();
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({
    total: 0,
    generatedCount: 0
  });
  const [refreshKey, setRefreshKey] = useState(0);

  const fetchDocuments = async () => {
    setLoading(true);
    try {
      // First try the primary endpoint
      let response = await fetch('http://localhost:3000/api/users/my-documents', {
        credentials: 'include',
        cache: 'no-cache' // Add no-cache to prevent caching
      });

      let useLocalStorage = false;

      if (!response.ok) {
        console.log("Primary endpoint failed, trying alternative...");
        try {
          response = await fetch('http://localhost:3000/api/users/documents', {
            credentials: 'include',
            cache: 'no-cache'
          });
        } catch (err) {
          console.error("Alternative endpoint also failed:", err);
          useLocalStorage = true;
        }
      }

      let docs = [];

      if (!response.ok || useLocalStorage) {
        console.log("API endpoints failed, using localStorage instead");
        // If API fails, use localStorage as fallback but filter by current organization ID
        const localDocs = JSON.parse(localStorage.getItem('blockSecureDocuments') || '[]');
        // Only show documents for the current organization
        docs = localDocs.filter(doc => doc.userId === currentUser?.id);
        console.log("Documents loaded from localStorage (filtered by organization):", docs);
      } else {
        const data = await response.json();
        console.log("Fetched documents from API:", data);
        docs = data.documents || [];
        
        // Merge with any documents in localStorage that belong to this organization
        const localDocs = JSON.parse(localStorage.getItem('blockSecureDocuments') || '[]');
        if (localDocs.length > 0) {
          console.log("Merging with localStorage documents for this organization");
          // Filter by current organization and content hash
          const apiHashes = docs.map(doc => doc.contentHash);
          const uniqueLocalDocs = localDocs.filter(doc => 
            !apiHashes.includes(doc.contentHash) && 
            doc.contentHash && 
            doc.userId === currentUser?.id
          );
          docs = [...docs, ...uniqueLocalDocs];
        }
      }
      
      setDocuments(docs);
      
      // Get generated documents count from localStorage - only for current organization
      const allGeneratedDocs = JSON.parse(localStorage.getItem('generatedDocuments') || '[]');
      const generatedDocs = allGeneratedDocs.filter(doc => doc.userId === currentUser?.id);
      
      // Calculate stats
      const total = docs.length;
      const generatedCount = generatedDocs.length;
      
      setStats({ total, generatedCount });
    } catch (err) {
      console.error("Error fetching documents:", err);
      setError(err.message);
      
      // Last resort: try localStorage
      try {
        const localDocs = JSON.parse(localStorage.getItem('blockSecureDocuments') || '[]');
        // Filter by current organization
        const filteredDocs = localDocs.filter(doc => doc.userId === currentUser?.id);
        console.log("Using localStorage as last resort (filtered by organization):", filteredDocs);
        setDocuments(filteredDocs);
        
        // Get generated documents count - only for current organization
        const allGeneratedDocs = JSON.parse(localStorage.getItem('generatedDocuments') || '[]');
        const generatedDocs = allGeneratedDocs.filter(doc => doc.userId === currentUser?.id);
        
        // Calculate stats
        const total = filteredDocs.length;
        const generatedCount = generatedDocs.length;
        
        setStats({ total, generatedCount });
      } catch (localStorageError) {
        console.error("Even localStorage failed:", localStorageError);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = () => {
    setRefreshKey(prevKey => prevKey + 1);
  };

  useEffect(() => {
    fetchDocuments();
  }, [refreshKey]);

  if (loading && documents.length === 0) {
    return (
      <div className="dashboard-container">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div className="header-content">
          <h1>Organization Dashboard</h1>
          <p>Welcome, {currentUser?.organization_name || 'Organization'}</p>
        </div>
        <button onClick={handleRefresh} className="refresh-button" title="Refresh dashboard">
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
        <Link to="/uploadDocument" className="action-button">
          <span className="button-icon">+</span>
          Upload New Document
        </Link>
        <Link to="/generateDocument" className="action-button">
          <span className="button-icon">📄</span>
          Generate Document
        </Link>
        <Link to="/verificationFile" className="action-button">
          <span className="button-icon">⬇️</span>
          Download Verification File
        </Link>
      </div>

      {error && (
        <div className="error-message">
          <p>{error}</p>
          <button onClick={handleRefresh}>Try Again</button>
        </div>
      )}

      <div className="documents-section">
        <h2>Your Documents</h2>
        {loading && documents.length > 0 && (
          <div className="loading-overlay">Refreshing documents...</div>
        )}
        {documents.length === 0 ? (
          <div className="no-documents">
            <p>You haven't uploaded any documents yet.</p>
            <Link to="/uploadDocument" className="upload-link">Upload your first document</Link>
          </div>
        ) : (
          <div className="documents-grid">
            {documents.map((doc) => (
              <div key={doc._id} className={`document-card ${doc.status}`}>
                <div className="document-header">
                  <h3>{doc.title}</h3>
                  <span className={`status-badge ${doc.status}`}>
                    {doc.status.charAt(0).toUpperCase() + doc.status.slice(1)}
                  </span>
                </div>
                <p className="document-description">{doc.description}</p>
                <div className="document-footer">
                  <span className="document-date">
                    Uploaded: {new Date(doc.createdAt).toLocaleDateString()}
                  </span>
                  {doc.feedback && (
                    <div className="document-feedback">
                      <strong>Feedback:</strong> {doc.feedback}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard; 