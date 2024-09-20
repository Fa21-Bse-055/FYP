import React, { useState, useEffect } from 'react';

export default function AdminPanel() {
  const [requests, setRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data from API
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await fetch('http://192.168.100.20:3000/api/admin/review'); // Replace with your API endpoint
        if (!response.ok) {
          throw new Error('Failed to fetch requests');
        }
        const data = await response.json();
        console.log("data : ",data);
        
        setRequests(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  const handleApprove = (id) => {
    const updatedRequests = requests.map(req => req.id === id ? { ...req, status: 'Approved' } : req);
    setRequests(updatedRequests);
  };

  const handleReject = (id) => {
    const updatedRequests = requests.map(req => req.id === id ? { ...req, status: 'Rejected' } : req);
    setRequests(updatedRequests);
  };

  const openDetailsModal = (request) => {
    setSelectedRequest(request);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const renderRequestItem = (item) => (
    <div style={styles.row} key={item.id}>
      <span style={styles.column}>{item.name}</span>
      <span style={styles.column}>{item.email}</span>
      <span style={styles.column}>{item.status}</span>
      <div style={styles.actions}>
        <button style={styles.approveButton} onClick={() => handleApprove(item.id)}>Approve</button>
        <button style={styles.rejectButton} onClick={() => handleReject(item.id)}>Reject</button>
        <button style={styles.detailsButton} onClick={() => openDetailsModal(item)}>Details</button>
      </div>
    </div>
  );

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Admin Panel</h1>

      {/* Loading and Error Handling */}
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Request List */}
      {!loading && !error && (
        <div style={styles.tableContainer}>
          <div style={styles.tableHeader}>
            <span style={styles.headerColumn}>Name</span>
            <span style={styles.headerColumn}>Email</span>
            <span style={styles.headerColumn}>Status</span>
            <span style={styles.headerColumn}>Actions</span>
          </div>
          <div>
            {requests.map(renderRequestItem)}
          </div>
        </div>
      )}

      {/* Details Modal */}
      {isModalVisible && (
        <div style={styles.modalBackground}>
          <div style={styles.modalContent}>
            {selectedRequest && (
              <>
                <h2 style={styles.modalTitle}>Request Details</h2>
                <p style={styles.modalText}>Name: {selectedRequest.name}</p>
                <p style={styles.modalText}>Email: {selectedRequest.email}</p>
                <p style={styles.modalText}>Status: {selectedRequest.status}</p>

                {/* Close Modal Button */}
                <button style={styles.closeButton} onClick={closeModal}>Close</button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    padding: '20px',
    backgroundColor: '#001833', // Dark Reddish Theme
    minHeight: '100vh',
    color: '#00eaff', // Lighter text color for dark theme
    padding: '15px 600px',
  },
  header: {
    fontSize: '32px',
    fontWeight: 'bold',
    marginBottom: '20px',
  },
  tableContainer: {
    overflowX: 'auto', // Horizontal scrolling for wider tables
  },
  tableHeader: {
    display: 'flex',
    backgroundColor: '#001833',
    padding: '10px',
    borderBottom: '2px solid #00eaff',
  },
  headerColumn: {
    flex: 1,
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: '16px',
  },
  row: {
    display: 'flex',
    backgroundColor: '#002244', // Slightly lighter dark shade for row background
    marginBottom: '10px',
    padding: '15px',
    borderRadius: '10px',
  },
  column: {
    flex: 1,
    fontSize: '16px',
    textAlign: 'center',
  },
  actions: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '10px', // Space between buttons
  },
  approveButton: {
    backgroundColor: '#28a745', // Green for Approve
    padding: '10px 15px',
    borderRadius: '5px',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
  },
  rejectButton: {
    backgroundColor: '#dc3545', // Red for Reject
    padding: '10px 15px',
    borderRadius: '5px',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
  },
  detailsButton: {
    backgroundColor: '#007bff', // Blue for Details
    padding: '10px 15px',
    borderRadius: '5px',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
  },
  modalBackground: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dark semi-transparent background for modal
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#002244', // Dark modal background
    padding: '20px',
    borderRadius: '10px',
    width: '400px',
    textAlign: 'center',
  },
  modalTitle: {
    fontSize: '24px',
    marginBottom: '20px',
  },
  modalText: {
    fontSize: '18px',
    marginBottom: '10px',
  },
  closeButton: {
    backgroundColor: '#00eaff', // Lighter button for dark modal
    padding: '10px 20px',
    borderRadius: '5px',
    color: '#001833',
    cursor: 'pointer',
    border: 'none',
  },
};
