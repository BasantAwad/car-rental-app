import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminDashboard.css';

const AdminDashboard = ({ user, onLogout }) => {
  const [rentals, setRentals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchAllRentals();
  }, []);

  const fetchAllRentals = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/rentals', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setRentals(response.data.data);
    } catch (err) {
      setError('Failed to fetch rentals');
    } finally {
      setLoading(false);
    }
  };

  const deleteRental = async (rentalId) => {
    if (!window.confirm('Are you sure you want to delete this rental?')) return;

    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/rentals/${rentalId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setRentals(rentals.filter(rental => rental._id !== rentalId));
      alert('Rental deleted successfully');
    } catch (err) {
      alert('Failed to delete rental');
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div className="admin-dashboard">
      <div className="dashboard-header">
        <h2>Admin Dashboard</h2>
        <button onClick={onLogout} className="logout-btn">Logout</button>
      </div>

      <div className="admin-stats">
        <div className="stat-card">
          <h3>Total Rentals</h3>
          <p>{rentals.length}</p>
        </div>
        <div className="stat-card">
          <h3>Active Rentals</h3>
          <p>{rentals.filter(r => new Date(r.returnDate) > new Date()).length}</p>
        </div>
        <div className="stat-card">
          <h3>Completed Rentals</h3>
          <p>{rentals.filter(r => new Date(r.returnDate) <= new Date()).length}</p>
        </div>
      </div>

      <div className="rentals-management">
        <h3>All Rentals</h3>
        
        {loading ? (
          <p>Loading rentals...</p>
        ) : error ? (
          <p className="error-message">{error}</p>
        ) : (
          <div className="rentals-table-container">
            <table className="rentals-table">
              <thead>
                <tr>
                  <th>Customer</th>
                  <th>Car</th>
                  <th>Pickup Date</th>
                  <th>Return Date</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {rentals.map((rental) => (
                  <tr key={rental._id}>
                    <td>{rental.name}</td>
                    <td>{rental.carName}</td>
                    <td>{formatDate(rental.pickupDate)}</td>
                    <td>{formatDate(rental.returnDate)}</td>
                    <td>
                      <span className={`status ${new Date(rental.returnDate) > new Date() ? 'active' : 'completed'}`}>
                        {new Date(rental.returnDate) > new Date() ? 'Active' : 'Completed'}
                      </span>
                    </td>
                    <td>
                      <button 
                        onClick={() => deleteRental(rental._id)}
                        className="delete-btn"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
