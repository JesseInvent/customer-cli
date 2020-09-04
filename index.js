const mongoose = require('mongoose');


// Connect to db
const db = mongoose.connect('mongodb://localhost:27017/customercli', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// model
const Customer = require('./models/customer');

// Add Customer
const addCustomer = (customer) => {
  Customer.create(customer).then(customer => {
    console.info('New Customer Added');
    process.exit()
  })
  .catch (error => console.log(erro))
}

// Find Customer
const findCustomer = (name) => {
  // Make case insensitive
  const search = new RegExp(name, 'i');
  Customer.find({$or: [{firstname: search}, {lastname: search}]})
    .then(customer => {
      console.info(customer);
      console.info(`${customer.length} matches`);
      process.exit()
    })
    .catch (error => console.log(erro));

}

//Update customer
const updateCustomer = (_id, customer) => {
  Customer.updateOne({_id}, customer)
  .then(customer => {
    console.info('Customer Updated');
    process.exit();
  })
}

// Remove customer
const removeCustomer = (_id) => {
  Customer.deleteOne({_id})
  .then(customer => {
    console.info('Customer Removed');
    process.exit();
  })
}

// List all Customers
const listCustomers = () => {
  Customer.find()
  .then(customers => {
    console.info(customers);
    console.info(`${customers.length} customers`);
    process.exit();
  });
}

// Export Methods
module.exports = {
  addCustomer,
  findCustomer,
  updateCustomer,
  removeCustomer,
  listCustomers
}
