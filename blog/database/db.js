const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./blog.db', (err) => {
    if (err){
        console.error('Erro ao conectar ao banco de dados: ', err)
    } else{
        console.log('Banco de dados conectado!');
    }
});

db.serialize(() => {
    db.run("CREATE TABLE IF NOT EXISTS posts( id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, body TEXT, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)");
});

module.exports = db;