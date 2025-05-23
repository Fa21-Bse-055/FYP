import React, { useEffect, useState } from 'react';
import { useAuth } from '../../Components/context/AuthContext';
import { Navigate } from 'react-router-dom';
import './AdminPanel.css';
import Footer from '../../Components/Footer/Footer';

const AdminPanel = () => {
  const [organizations, setOrganizations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionInProgress, setActionInProgress] = useState(false);
  const { isAuthenticated, hasRole } = useAuth();

  const fetchOrganizations = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:3000/api/admin/organizations', {
        credentials: 'include',
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch organizations');
      }
      
      const data = await response.json(); 
      setOrganizations(data);
      setError(null);
    } catch (error) {
      console.error('Error fetching organizations:', error);
      setError('Failed to load organizations. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrganizations();
  }, []);

  const handleApprove = async (id) => {
    try {
      setActionInProgress(true);
      const response = await fetch(`http://localhost:3000/api/admin/approve/${id}`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      alert('Organization approved successfully');
    } catch (error) {
      console.error('Error approving organization:', error);
      alert('Error approving organization: ' + error.message);
    } finally {
      setActionInProgress(false);
      fetchOrganizations(); // Refresh after action
    }
  };

  const handleReject = async (id) => {
    try {
      setActionInProgress(true);
      const response = await fetch(`http://localhost:3000/api/admin/reject/${id}`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      alert('Organization rejected successfully');
    } catch (error) {
      console.error('Error rejecting organization:', error);
      alert('Error rejecting organization: ' + error.message);
    } finally {
      setActionInProgress(false);
      fetchOrganizations(); // Refresh after action
    }
  };

  // Redirect if not authenticated or not an admin
  if (!isAuthenticated() || !hasRole(['admin', 'super-admin'])) {
    return <Navigate to="/adminLogin" />;
  }

  return (
    <div className="admin-container">
      <div className="admin-panel">
        <div className="admin-box">
          <aside className="sidebar">
            <h2>Admin Panel</h2>
            <ul>
              <li className="active"><a href="#organizations">Organizations</a></li>
              <li><a href="#documents">Documents</a></li>
              <li><a href="#users">Users</a></li>
              <li><a href="#settings">Settings</a></li>
            </ul>
          </aside>

          <div className="main-content">
            <header className="header">
              <h1>All Organizations</h1>
              <button
                className="refresh-button"
                onClick={fetchOrganizations}
                disabled={loading || actionInProgress}
              >
                {loading ? 'Refreshing...' : 'Refresh List'}
              </button>
            </header>

            <section className="content">
              {error && <div className="error-message">{error}</div>}

              {loading ? (
                <div className="loading-spinner">Loading organizations...</div>
              ) : organizations.length > 0 ? (
                <table>
                  <thead>
                    <tr>
                      <th>Organization Name</th>
                      <th>Email</th>
                      <th>Website</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {organizations.map((org) => (
                      <tr key={org._id}>
                        <td>{org.organization_name}</td>
                        <td>{org.email}</td>
                        <td>
                          <a href={org.organization_web_url} target="_blank" rel="noopener noreferrer">
                            {org.organization_web_url}
                          </a>
                        </td>
                        <td>
                          {org.organizationVerified ? (
                            <span className="status-verified">Verified</span>
                          ) : (
                            <span className="status-pending">Pending</span>
                          )}
                        </td>
                        <td className="action-buttons">
                          {!org.organizationVerified && (
                            <>
                              <button
                                className="approve-button"
                                onClick={() => handleApprove(org._id)}
                                disabled={actionInProgress}
                              >
                                Approve
                              </button>
                              <button
                                className="reject-button"
                                onClick={() => handleReject(org._id)}
                                disabled={actionInProgress}
                              >
                                Reject
                              </button>
                            </>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="no-data-message">
                  <p>No organizations found.</p>
                </div>
              )}
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AdminPanel;
