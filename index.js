const Client = require('pg').Client;
const client = new Client({
    user: "postgres",
    password: "root",
    host: "localhost",
    port: 5432,
    database: "apportal"
});

const express = require('express');
// const Joi = require('joi');
const app = express();
app.use (express.json());

// Read Request handlers
// Display the Message when the URL consist of '/'
app.get('/', (req,res) => {
    res.send("Welcome to Application Portal");
});

// API - Authenticate user

app.get ('/login/:user_id/:password', async (req,res) => {
    await client.connect();
    try {
        console.log("Connected Successfully");
        const results = await client.query("select * from personal_details where user_id=$1 AND password=$2;",[parseInt(req.params.user_id),req.params.password]);
        if (results.rows.length==0)
            res.send("Invalid Username Password");
        else
            res.send("Login successfull");
    }
    catch(e) {
        console.log(`Kuch toh hua hai :P : ${e}`);
        res.send("ERROR");
    }
    finally{
        await client.end();
        console.log("Client disconnected Successfully")
    }
});

// API - Get all jobs
app.get ('/jobs/', async (req,res) => {
    await client.connect();
    try {
        console.log("Connected Successfully");
        const results = await client.query("select * from jobs;");
        console.table(results.rows)
        res.send(results.rows); 
    }
    catch(e) {
        console.log(`Kuch toh hua hai :P : ${e}`);
        res.send("ERROR");
    }
    finally{
        await client.end();
        console.log("Client disconnected Successfully")
    }
});

// API - Get Open Jobs

app.get ('/jobs/open/', async (req,res) => {
    await client.connect();
    try {
        console.log("Connected Successfully");
        const results = await client.query("select * from jobs where job_status='Open';");
        console.table(results.rows)
        res.send(results.rows); 
    }
    catch(e) {
        console.log(`Kuch toh hua hai :P : ${e}`);
        res.send("ERROR");
    }
    finally{
        await client.end();
        console.log("Client disconnected Successfully")
    }
});
/* 
app.get ('/api/customers', (req,res) => {
    res.send(customers);
});

// Display the Information of specific customer when you mention the ID
app.get('/api/customers/:id', (req,res) => {
    const customer=customers.find(c => c.id === parseInt(req.params.id));
// If there is no valid customer ID, then display an error with the following message
    if (!customer) res.status(404).send(`<h2 style="font-family: Malgun Gothic; color = darkred;">Ooops... Can\'t find what you are looking for!</h2>`);
    res.send(customer);
}); */

/* 
// Create Request Handler
// Create New Customer Information
app.post('/api/customers', (req,res) => {
    const { error } = validateCustomer(req.body);
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }

    // Increment the customer id
    const customer = {
        id:customers.length + 1,
        title: req.body.title
    };
    customers.push(customer);
    res.send(customer);
});

// Update request handler
// Update existing customer information
app.put('/api/customers/:id', (req,res) => {
    const customer = customers.find(c=>c.id === parseInt(req.params.id));
    if(!customer) res.status(404).send('<h2 style="font-family: Malgun Gothic; color=darkred">Ooops.... Not Found!</h2>');

    const {error} = validateCustomer(req.body);
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }

    customer.title=req.body.title;
    res.send(customer);
});

// Delete Request Handler
// Delete Customer Deta
app.delete('/api/customers/:id', (req,res) => {

    const customer=customers.find (c=>c.id === parseInt(req.params.id));
    if(!customer) res.status(404).send('<h2 style="font-family: Malgun Gothic; color=darkred">Ooops.... Not Found!</h2>');

    const index = customers.indexOf(customer);
    customers.splice(index,1);

    res.send(customer);
})

// Valisate Information
function validateCustomer (customer) {
    const schema = {
        title: Joi.string().min(3).required()
    };
    return Joi.validate(customer, schema);
};*/
// PORT ENVIORNMENT VARIABLE
const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port} .. `)); 