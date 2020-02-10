const Client = require('pg').Client;
const client = new Client({
    user: "postgres",
    password: "root",
    host: "localhost",
    port: 5432,
    database: "apportal"
});
let itemsPerPage=5;
const joi = require('joi');

start();

async function start(){
    try {
        await client.connect();
    } catch(e) {
        err.error_code(e);
    }
}

// Function - Get all jobs
async function getJobs (req,res){
    try {
        // await client.connect();
        console.log("Connected Successfully");
        const results = await client.query("select * from jobs;");
        // console.table(results.rows)
        // console.log(results)
        res.send(results.rows); 
    }
    catch(e) {
        err.error_code(e);
        res.send("ERROR");
    }
    finally{
        // await client.end();
        // console.log("Client disconnected Successfully")
    }
    return
}

// Function - Get Open/Close Jobs
async function getOpClJobs (req,res) {
    try {
        const results = await client.query("select * from jobs where job_status=$1;",[req.params.status]);
        res.send(results.rows); 
    }
    catch(e) {
        err.error_code(e);
        res.send("ERROR");
    }
    return;
};

// Function - Get Jobs Pagination
async function getJobPg (req,res) {
    try {
        const results = await client.query("select * from jobs LIMIT $1 OFFSET $2;",[itemsPerPage,(req.params.offset - 1) * itemsPerPage]);
        res.send(results.rows); 
    }
    catch(e) {
        err.error_code(e);
        res.send("ERROR");
    }
    return;
}

// Function - Get Open/Close Jobs Pagination
async function getOpClJobPg (req,res) {
    try {
        const results = await client.query("select * from jobs where job_status=$1 LIMIT $2 OFFSET $3;",[req.params.status,itemsPerPage,(req.params.offset - 1) * itemsPerPage]);
        res.send(results.rows); 
    }
    catch(e) {
        err.error_code(e);
        res.send("ERROR");
    }
    return;
}

// Function - Get specific jobs
async function getSpecJob(req,res){
    try {
        const results = await client.query("select * from jobs where job_id=$1;",[req.params.jobid]);
        res.send(results.rows); 
    }
    catch(e) {
        err.error_code(e);
        res.send("ERROR");
    }
}

async function postJob(req,res) {
    const { error } = validateJob(req.body);
    console.log([req.body.job_id,req.body.job_title,req.body.company_name,req.body.salary,req.body.availability,req.body.joining_date,req.body.skills,req.body.job_status,req.body.user_id])
    if (error)
        res.status(400).send(error)
    client.query("insert into jobs (job_id, job_title, company_name, salary, availability, joining_date, skills, job_status, user_id) values ($1,$2,$3,$4,$5,$6,$7,$8,$9);",
    [req.body.job_id,req.body.job_title,req.body.company_name,req.body.salary,req.body.availability,req.body.joining_date,req.body.skills,req.body.job_status,req.body.user_id])
    res.send(res.body)
}

function validateJob (job) {
    const schema = {
        job_id: joi.number().integer().required(),
        job_title: joi.string().min(3).required(),
        company_name: joi.string().min(3).required(),
        salary: joi.number().required(),
        availability: joi.number().integer().max(100).required(),
        joining_date: joi.date().required(),
        skills: joi.string().min(3).required(),
        job_status: joi.string().valid('Open', 'Close'),
        user_id:joi.number().integer()
    };
    console.log(joi.validate(job, schema))
    return joi.validate(job, schema);
};
module.exports = {
    getJobs: getJobs,
    getOpClJobs: getOpClJobs,
    getJobPg:getJobPg,
    getOpClJobPg:getOpClJobPg,
    getSpecJob:getSpecJob,
    postJob:postJob
};