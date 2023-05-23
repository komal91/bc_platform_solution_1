const express = require('express');
const cors = require('cors');

const app = express();
const port = 3000;

// Enable CORS for all routes
app.use(cors());

// Parse JSON bodies
app.use(express.json());

// Define the mapping between customer-roles and bc-roles
const roleMapping = {
  "001 - Admin": "BC_ADMIN",
  "002 - Clinical personnel": "BC_CLINICAL",
  "003 - Warehouse personnel": "BC_WAREHOUSE"
};

// Current roles stored in memory
let currentRoles = ["BC_ADMIN", "BC_CLINICAL"];

app.post('/sync_roles', (req, res) => {
  const { customerRoles } = req.body;

  // Perform the synchronization
  const deletedRoles = currentRoles.filter(role => !customerRoles.includes(role));
  const addedRoles = customerRoles.filter(role => !currentRoles.includes(role));
  const unchangedRoles = customerRoles.filter(role => currentRoles.includes(role));

  // Update the current roles
  currentRoles = customerRoles;

  // Map customer roles to bc roles
  const mappedCustomerRoles = customerRoles.map(role => roleMapping[role] || role);

  // Return the synchronization outcome
  res.json({
    deletedRoles: deletedRoles.map(role => roleMapping[role] || role),
    addedRoles: addedRoles.map(role => roleMapping[role] || role),
    unchangedRoles: unchangedRoles.map(role => roleMapping[role] || role),
    mappedCustomerRoles: mappedCustomerRoles
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
