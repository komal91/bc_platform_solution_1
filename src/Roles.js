import React, { useState } from 'react';
import axios from 'axios';
import './Roles.css'; // Import the CSS file

const Roles = () => {
  const [customerRoles, setCustomerRoles] = useState('');
  const [syncResult, setSyncResult] = useState(null);

  const handleInputChange = (e) => {
    setCustomerRoles(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/sync_roles', { customerRoles });
      setSyncResult(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Customer Roles:</label>
        <input type="text" value={customerRoles} onChange={handleInputChange} />
        <button type="submit">Sync Roles</button>
      </form>

      {syncResult && (
        <div>
          <h3>Sync Result:</h3>
          <p>Deleted Roles: {syncResult.deletedRoles.join(', ')}</p>
          <p>Added Roles: {syncResult.addedRoles.join(', ')}</p>
          <p>Unchanged Roles: {syncResult.unchangedRoles.join(', ')}</p>
        </div>
      )}
    </div>
  );
};

export default Roles;
