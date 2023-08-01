// Global variable to store the bearer token
let token = '';

// Function to handle authentication and get the bearer token
function authenticateUser() {
  const loginId = document.getElementById('login_id').value;
  const password = document.getElementById('password').value;

  const requestBody = {
    login_id: loginId,
    password: password
  };

  fetch('https://qa2.sunbasedata.com/sunbase/portal/api/assignment_auth.jsp', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(requestBody)
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Authentication failed');
    }
    return response.json();
  })
  .then(data => {
    token = data.token; // Save the bearer token
    // After successful authentication, redirect to the customer list screen
    window.location.href = 'customer_list.html';
  })
  .catch(error => {
    alert('Authentication failed. Please check your credentials.');
    console.error(error);
  });
}

// Function to get the list of customers
function getCustomerList() {
  fetch('https://qa2.sunbasedata.com/sunbase/portal/api/assignment.jsp?cmd=get_customer_list', {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Failed to fetch customer list');
    }
    return response.json();
  })
  .then(data => {
    // Process the customer list data and display it in the table
    const customerTable = document.getElementById('customerTable');
    // Clear existing rows
    customerTable.innerHTML = '<tr><th>First Name</th><th>Last Name</th><th>Email</th><th>Phone</th><th>Action</th></tr>';

    data.forEach(customer => {
      const row = `<tr>
        <td>${customer.first_name}</td>
        <td>${customer.last_name}</td>
        <td>${customer.email}</td>
        <td>${customer.phone}</td>
        <td><button onclick="viewCustomerDetails('${customer.uuid}')">View/Edit</button></td>
      </tr>`;
      customerTable.innerHTML += row;
    });
  })
  .catch(error => {
    alert('Failed to fetch customer list. Please try again later.');
    console.error(error);
  });
}

// Function to view customer details
function viewCustomerDetails(uuid) {
  // Implement this function to get the customer details by UUID and redirect to the customer details screen
  // (Not implemented in this example, you can use the same Fetch API approach)
}

// Function to create or update a customer
function createOrUpdateCustomer() {
  const firstName = document.getElementById('first_name').value;
  const lastName = document.getElementById('last_name').value;
  const email = document.getElementById('email').value;
  const phone = document.getElementById('phone').value;

  const requestBody = {
    first_name: firstName,
    last_name: lastName,
    email: email,
    phone: phone
  };

  let url, method;
  // Implement the logic to check if a customer is being created or updated
  // and set the URL and method accordingly

  fetch(url, {
    method: method,
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(requestBody)
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Failed to create/update customer');
    }
    return response.json();
  })
  .then(data => {
    alert('Customer created/updated successfully.');
    // Implement the logic to redirect to the customer list screen after successful creation/update
    // (e.g., window.location.href = 'customer_list.html';)
  })
  .catch(error => {
    alert('Failed to create/update customer. Please try again later.');
    console.error(error);
  });
}

// Function to delete a customer
function deleteCustomer() {
  const confirmDelete = confirm('Are you sure you want to delete this customer?');
  if (!confirmDelete) {
    return;
  }

  const uuid = ''; // Get the UUID of the customer to be deleted (you can store it somewhere when viewing the customer details)

  fetch('https://qa2.sunbasedata.com/sunbase/portal/api/assignment.jsp?cmd=delete&uuid=' + uuid, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Failed to delete customer');
    }
    return response.json();
  })
  .then(data => {
    alert('Customer deleted successfully.');
    // Implement the logic to redirect to the customer list screen after successful deletion
    // (e.g., window.location.href = 'customer_list.html';)
  })
  .catch(error => {
    alert('Failed to delete customer. Please try again later.');
    console.error(error);
  });
}

// Function to logout and clear the bearer token
function logout() {
  token = '';
  // Redirect to the login page after logout
  window.location.href = 'index.html';
}

// Function to go back to the customer list screen from the customer details screen
function backToCustomerList() {
  // Implement the logic to redirect to the customer list screen
  // (e.g., window.location.href = 'customer_list.html';)
}

// Perform actions when the customer list page is loaded
document.addEventListener('DOMContentLoaded', function () {
  // Implement the logic to check if the user is logged in and redirect to the login page if not
  // (e.g., if (!token) window.location.href = 'index.html';)
  // If the user is logged in, load the customer list
  getCustomerList();
});
