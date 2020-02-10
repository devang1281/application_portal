const Client = require('pg').Client;
const client = new Client({
    user: "postgres",
    password: "root",
    host: "localhost",
    port: 5432,
    database: "apportal"
});

const err=require('./error')
// let itemsPerPage=5;
// const joi = require('joi');

start();

async function start(){
    try {
        await client.connect();
    } catch(e) {
        err.error_code(e);
    }
}

// Function - Get all candidates
async function getCandidates(req,res) {
    try{
        const results = await client.query("select user_id,name from personal_details where user_type=$1;",['Candidate']);
        if (results.rows.length==0)
            res.send("No Candidates");
        else
            res.send(results.rows);
    } catch (e) {
        err.error_code(e);
        res.send("ERROR");
    }
}

// Function - Get User Profile
async function getProfile(req,res) {
    try {
        const results = await client.query("select * from personal_details where user_id=$1",[req.params.userid]);
        if (results.rows.length==0)
            res.send("User does not exist");
        else
            res.send(results.rows);
    } catch(e) {
        err.error_code(e);
        res.send("ERROR");
    }
}

// Function - Get companies with job openings
async function getCompanies(req,res) {
    try {
        const results = await client.query("select company_name from jobs where job_status = 'Open';");
        if (results.rows.length==0)
            res.send("No Job Openings");
        else
            res.send(results.rows);
    } catch (e) {
        err.error_code(e);
        res.send("ERROR");
    }
}
module.exports = {
    getCandidates: getCandidates,
    getProfile:getProfile,
    getCompanies: getCompanies
};