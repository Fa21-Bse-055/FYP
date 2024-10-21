import React, { useEffect, useState } from 'react';
import './AdminPanel.css';
import Footer from '../../Components/Footer/Footer';

const AdminPanel = () => {
  const [organizations, setOrganizations] = useState([]);

  useEffect(() => {
    const fetchUnverifiedOrganizations = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/admin/review');
        if (!response.ok) {
          throw new Error('Failed to fetch unverified organizations');
        }
        const data = await response.json(); 
        console.log("Fetched data:", data); 
        setOrganizations(data);
      } catch (error) {
        console.error('Error fetching unverified organizations:', error);
      }
    };
    fetchUnverifiedOrganizations();
  }, []);
  

  const handleApprove = async (id) => {
    try {
        console.log("id: ",id);
        
        const response = await fetch(`http://127.0.0.1:3000/api/admin/approve/${id}`, {
          method: 'POST',
          credentials: 'include'
        });
      
        // Check if the response is okay (status in the range 200-299)
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
      
        // Parse the response as JSON
        const data = await response.json(); // This line converts the response to JSON
        // Use 'data' instead of 'response.data'
        console.log("handel ",data);
        
      
      } catch (error) {
        console.error("error:", error);
      }      
  };
  
  const handleReject = async (id) => {
    try {
        
      const response = await fetch(`http://localhost:3000/api/admin/reject/${id}`, {
        method: 'POST',
      });
      if (response.ok) {
        // setOrganizations(organizations.filter(org => org._id !== id));
        alert("Organization rejected successfully");
      } else {
        throw new Error('Failed to reject organization');
      }
    } catch (error) {
      console.error('Error rejecting organization:', error);
      alert('Error rejecting organization');
    }
  };
  

  return (
    <div className="admin-panel">
      <div className='admin-box'>
        <aside className="sidebar">
          <h2>Admin Panel</h2>
          <ul>
            <li><a href="/dashboard">Dashboard</a></li>
            <li><a href="/users">Users</a></li>
            <li><a href="/reports">Reports</a></li>
            <li><a href="/settings">Settings</a></li>
          </ul>
        </aside>

        <div className="main-content">
          <header className="header">
            <h1>Organizations Pending Verification</h1>
          </header>
          
          <section className="content">
            {organizations.length > 0 ? (
              <table>
                <thead>
                  <tr>
                    <th>Organization Name</th>
                    <th>Email</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {organizations.map(org => (
                    <tr key={org._id}>
                      <td>{org.organization_name}</td>
                      <td>{org.email}</td>
                      <td>
                            <button onClick={() => handleApprove(org._id)}>Approve</button>
                            <button onClick={() => handleReject(org._id)}>Reject</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No organizations pending verification.</p>
            )}
          </section>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default AdminPanel;
