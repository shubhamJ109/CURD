const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MySQL connection
const db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'yoursql#@123A', // Replace with your password
    database: 'CollegeDB'
});

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL');
});

// Get all students
app.get('/students', (req, res) => {
    db.query('SELECT * FROM Students', (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// Add a new student
app.post('/students', (req, res) => {
    const { name, age, course } = req.body;
    const sql = 'INSERT INTO Students (name, age, course) VALUES (?, ?, ?)';
    db.query(sql, [name, age, course], (err) => {
        if (err) throw err;
        res.send('Student added');
    });
});

// Update a student
app.put('/students/:id', (req, res) => {
    const { id } = req.params;
    const { name, age, course } = req.body;
    const sql = 'UPDATE Students SET name = ?, age = ?, course = ? WHERE id = ?';
    db.query(sql, [name, age, course, id], (err) => {
        if (err) throw err;
        res.send('Student updated');
    });
});

// Delete a student
app.delete('/students/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM Students WHERE id = ?';
    db.query(sql, [id], (err) => {
        if (err) throw err;
        res.send('Student deleted');
    });
});

app.listen(3306, () => {
    console.log('Server running on port 3306');
});
