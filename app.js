const express = require('express');
const { projects } = require('./data.json');
const app = express();


app.set('view engine', 'pug');
app.use('/static', express.static('public'));

//HOME ROUTE - shows projects dynamically 
app.get('/', (req, res) => {
    res.render('index', { projects });
});

//ABOUT ROUTE - routes to the about.pug view
app.get('/about', (req, res) => {
    res.render('about');
});

//DYNAMIC ROUTE - renders project.pug with the project that matches the id param
app.get('/project/:id', (req, res) => {
    const id = req.params.id;
    const project = projects[id];
    if (project) {
        res.render('project', { project });
    } else {
        const error = new Error('Sorry, page was not found');
        error.status = 404;
        throw error;
    }
});

//404 handler - catches any route not already matched above
app.use((req, res) => {
    const error = new Error('Sorry, page was not found');
    error.status = 404;
    throw error;
});

//my global error handler
app.use((err, req, res, next) => {

    //make sure status and message exist
    err.status = err.status || 500;
    err.message = err.message || 'Server Error';

    //log out error to the node console
    console.error(err.message, err.status);

    //render different page for 404 and other server errors
    if (err.status === 404){
        res.status(404).render('page-not-found', { err });
    } else {
        res.status(err.status).render('error', { err });
    }

});

app.listen(3000, () => {
    console.log('Listening at PORT 3000');
});