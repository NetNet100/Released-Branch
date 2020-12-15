const express = require('express');
const path = require('path');
const asyncHandler = require('express-async-handler')
const bodyParser = require('body-parser');
const git = require('./server/common/git');
const branchesRouter = require('./server/routes/branches.router');

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/git', asyncHandler(branchesRouter));

git.init();

// Serve any static files
app.use(express.static(path.join(__dirname, 'client/build')));

// Handle React routing, return all requests to React app
app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

app.listen(port, () => console.log(`Listening on port ${port}`));
