Assignment: Login and Registration
Create a login and registration that uses back-end validation, catches errors, and displays them to the client.

Required Registration Fields:

email
first_name
last_name
password
password_confirm
birthday
Each registration field should have at least one back-end validation on it! Besides password_confirmation.

email should use a unique:true as one of key:value pairs in the objects schema. How are we going to deal with uniqueness errors (note the error object from unique:true is different!)?

The login form should just have password and email