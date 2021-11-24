const mysql = require('mysql')

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: ""
})

con.connect(function (err) {
    let sql = "CREATE DATABASE IF NOT EXISTS todos"
    let tbl_merchant = `CREATE TABLE IF NOT EXISTS merchant (
        id INT(10) NOT NULL,
        password VARCHAR(20) NOT NULL,
        name VARCHAR(30) NOT NULL,
        address VARCHAR(100) NOT NULL,
        join_date VARCHAR(20) NOT NULL,
        phone_number INT(15) NOT NULL,
        PRIMARY KEY (id)
    )
    COLLATE='utf8mb4_general_ci'
    ;`
    let tbl_product = `CREATE TABLE IF NOT EXISTS product (
        id INT(10) NOT NULL,
        name VARCHAR(50) NOT NULL,
        quantity INT(10) NOT NULL,
        price INT(15) NOT NULL,
        PRIMARY KEY (id)
    )
    COLLATE='utf8mb4_general_ci'
    ;`

    con.query(sql, function (err, result) {
        // database = "todos"
        con.query("USE todos", function (err, result) {
            con.query(tbl_merchant, function (err, result) {
                console.log("Table Merchant Created")
            })
            con.query(tbl_product, function (err, result) {
                console.log("Table Product Created")
            })
            console.log("Database Used")
        })
        console.log("Database created")
    })
})


module.exports = {
    con: con
}