const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

app.use(methodOverride('postMethodOverride'));

var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'dog'
});

app.listen(3000, function () {
    console.log("up");
});

connection.connect();

connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
    if (error) throw error;
    console.log('connected');
});



app.use(bodyParser.urlencoded({ extended: false }))

// let age = 0;
// let name = '';
// function calculate(uname, birthYear) {
//     name = uname;
//     age = 2019 - birthYear;

// };

// app.get('/', function (req, res) {
//     res.render('index.ejs', { age: age, name: name });
// });

// app.post('/calculate', function (req, res) {
//     console.log(req.body);
//     calculate(req.body.name, req.body.birthYear);
//     res.redirect('/');
// });

app.get('/addDog', function (req, res) {
    res.render('addDog.ejs');
});

//get all
app.get('/dog', function (req, res) {
    connection.query('SELECT * FROM `dogtable`', function (error, results) {
        if (error) throw error;
        //console.log(results[0].id);
        res.render('dog.ejs', { dogs: results });
    });

});


//create
app.post('/dog', function (req, res) {
    console.log(req.body)
    connection.query(`INSERT INTO dogtable (breed, image, age) VALUES ('${req.body.breed}','${req.body.image}',${req.body.age})`, function (error, results) {
        if (error) throw error;
        //console.log(results[0].id);
        console.log(results);
        res.redirect('/dog')
    });

});


//get single dog
app.get('/dog/:id', function (req, res) {
    console.log(req.params.id);
    connection.query(`SELECT breed, image, age FROM dogtable WHERE id=2`, function (error,results){
        if(error) throw error;
        console.log(results);
        res.render('selectDog.ejs',{ dogs: results});
    });
});


///update(post) single dog
app.put('/dog/:id', function (req, res) {
    console.log(req.params.id);
    connection.query(`SELECT breed, image, age FROM dogtable WHERE id=2`, function (error,results){
        if(error) throw error;
        console.log(results);
        res.render('editDog.ejs',{ dog: results});
    });
});


//delete single dog
app.delete('/dog/:id', function (req, res) {

});


