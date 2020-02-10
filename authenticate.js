const Client = require('pg').Client;
const client = new Client({
    user: "postgres",
    password: "root",
    host: "localhost",
    port: 5432,
    database: "apportal"
});
const err=require('./error')
start();

async function start(){
    try {
        await client.connect();
    } catch(e) {
        err.error_code(e);
    }
}

// Function - Authenticate user
async function login(req,res) {
    try {
        console.log(parseInt(req.body.userid),req.body.password)
        const results = await client.query("select * from personal_details where user_id=$1 AND password=$2;",[parseInt(req.body.userid),req.body.password]);
        if (results.rows.length==0)
            res.send("Invalid Username Password");
        else
            res.send("Login successfull");
    }
    catch(e) {
        err.error_code(e);
        res.send("ERROR");
    }
    // finally {
    //     client.end(() =>
    //     console.log("Disconnected"));
    // }
    return;
}
// client.end( () =>
// console.log("Disconnected"));
module.exports = {
    login:login
};