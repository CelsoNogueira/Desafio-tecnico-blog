const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const db = require('./database/db');
const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/post/:id', (req, res) => {
    const postId = req.params.id;
    db.get("SELECT * FROM posts WHERE id = ?", [postId], (err, row) => {
        if (err) {
            throw err;
        }     
        res.json(row); 
    });
});


app.get('/criar', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'criarPost.html'));
});

app.post('/criar', (req, res) => {
    const { title, body } = req.body;
    db.run("INSERT INTO posts (title, body) VALUES (?, ?)", [title, body], (err) => {
        if (err) {
            throw err;
        }
        res.redirect('/');
    });
});

app.get('/posts', (req, res) => {
    db.all("SELECT * FROM posts ORDER BY created_at DESC", [], (err, rows) => {
        if (err) {
            throw err;
        }
        res.json(rows);
    });
});

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
