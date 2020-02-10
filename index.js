const job = require('./jobs');
const candidate = require('./candidate'); 
const authenticate = require('./authenticate');
const express = require('express');
const app = express();
const morgan = require('morgan')
app.use (express.json());
app.use (morgan('combined'));

// API - Welcome
app.get('/', (req,res) => {
    res.send("Welcome to Application Portal");
});

// API - Authenticate user
app.get ('/login',authenticate.login)

// API's for jobs
// API - Get all jobs
app.get("/jobs",job.getJobs);

// API - Get Open/Close Jobs
app.get ('/jobs/:status/',job.getOpClJobs);

// API - Get Jobs Pagination
app.get ('/jobs/page/:offset',job.getJobPg);

// API - Get Open/Close Jobs Pagination
app.get ('/jobs/:status/page/:offset', job.getOpClJobPg);

// API - Get specific jobs
app.get ('/jobs/jobid/:jobid',job.getSpecJob);

// API - Add jobs
app.post ('/jobs',job.postJob);

// API's for candidates
// API - Get all Candidates
app.get ('/candidate',candidate.getCandidates)

// API - Get user profile
app.get('/:userid',candidate.getProfile)

// API - Get Companies with job openings
app.get('/candidate/companies',candidate.getCompanies)

// 
// PORT ENVIORNMENT VARIABLE
const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port} .. `)); 