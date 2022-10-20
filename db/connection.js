const mysql = require('mysql2');
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'BlueMoon',
        database: 'employees'
    },
    
)

db.connect((err) => {
    console.log(err);
    if (err) throw err;
});

module.exports = db.promise();