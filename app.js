const express = require('express');
const { projects } = require('./data.json');

const app = express();

app.set('view engine', 'pug');
app.use('/static', express.static('public'));

app.get('/', (req, res) => {
    res.render('index', { projects });
});

app.get('/about', (req, res) => {
    res.render('about');
});

app.get('/project/:id', (req, res) => {
    const id = req.params.id;
    const project = projects[id];
    res.render('project', { project });
});

//My 404 handler - catch all
app.get((req, res) => {
    const err = new Error('Sorry, page was not found');
    err.status = 404;
    throw error;
});

//my global error handler
app.use((err, req, res, next) => {
    //make sure status and message exist
    if (err.status === 404){
        res.render('page-not-foud', { err });
    }
    err.status = err.status || 500;
    err.message = err.message || 'Server Error';

    res.locals.err = err;
    res.status(err.status);
    res.render('error');
});

app.listen(3000, () => {
    console.log('Listening at PORT 3000');
});