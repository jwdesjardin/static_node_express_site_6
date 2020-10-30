const express = require('express');
const { projects } = require('./data.json');

const app = express();

app.set('view engine', 'pug');
app.use('/static', express.static('public'));

app.get('/', (req, res) => {
    res.render('index', { projects });
    // res.send('home');
});

app.get('/about', (req, res) => {
    res.render('abouts');
    // res.snd('about');
});

app.get('/project/:id', (req, res) => {
    const id = req.params.id;
    const project = projects[id];
    res.render('project', { project });
    // const id = req.params.id;
    // res.send(`project ${id}`);
});

//My 404 handler
app.use((req, res, next) => {
    const err = new Error('Sorry, page was not found');
    err.status = 404;
    console.log(`${err.status}: ${err.message} \n ${err.stack}`);
    next(err);
});

//my global error handler
app.use((err, req, res, next) => {
    //make sure status and message exist
    if (err.status === 404){
        res.render('page-not-foud', { err });
    }
    err.status = err.status || 500;
    err.message = err.message || 'Server Error';
    console.log(`ERROR HANDLER: ${err.status}: ${err.message}`);
    res.locals.err = err;
    res.status(err.status);
    res.render('error');
});

app.listen(3000, () => {
    console.log('Listeing at PORT 3000');
});