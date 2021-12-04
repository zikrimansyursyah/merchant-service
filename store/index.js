const mysql = require("mysql");

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
});

//db init
con.connect(function (err) {
    if (err) throw err;
    let sql = "CREATE DATABASE IF NOT EXISTS ecommerce";
    let tbl_merchant = `CREATE TABLE IF NOT EXISTS merchant (
        id INT(10) NOT NULL AUTO_INCREMENT,
        password VARCHAR(20) NOT NULL,
        name VARCHAR(30) NOT NULL,
        address VARCHAR(100) NOT NULL,
        join_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(),
        phone_number VARCHAR(15) NOT NULL,
        PRIMARY KEY (id)
    )
    COLLATE='utf8mb4_general_ci'
    ;`;
    let tbl_product = `CREATE TABLE IF NOT EXISTS product (
        id INT(10) NOT NULL AUTO_INCREMENT,
        merchant_id INT(10) NOT NULL,
        name VARCHAR(50) NOT NULL,
        quantity INT(10) NOT NULL,
        price INT(15) NOT NULL,
        PRIMARY KEY (id),
        CONSTRAINT mid FOREIGN KEY (merchant_id) REFERENCES merchant (id) ON UPDATE CASCADE ON DELETE CASCADE
    )
    COLLATE='utf8mb4_general_ci'
    ;`;

    con.query(sql, function (err, result) {
        con.query("USE ecommerce", function (err, result) {
            con.query(tbl_merchant, function (err, result) {
                console.log("Table Merchant Created");
            });
            con.query(tbl_product, function (err, result) {
                console.log("Table Product Created");
            });
            console.log("Database Used");
        });
        console.log("Database created");
    });
});

// api request
module.exports = {
    merchantRegis: function (name, password, address, phone, res) {
        const select = `SELECT * FROM ecommerce.merchant WHERE name='${name}'`
        con.query(select, function (err, result) {
            if (err) throw err;
            console.log(`select ${name} from merchant`);
            if (!result.length) {
                const sql = `INSERT INTO ecommerce.merchant (password, name, address, phone_number) VALUES ('${password}', '${name}', '${address}', '${phone}');`;
                con.query(sql, function (err, result) {
                    if (err) throw err;
                    return res.json({
                        register: 'success',
                        name: name
                    })
                });
            } else {
                console.log("username sudah terpakai");
                return res.status(406).send({ error: `${name} is Exist on Database` });
            }
        });

    },
    merchantDelete: function (id, res) {
        const select = `SELECT * FROM ecommerce.merchant WHERE id=${Number(id)}`
        con.query(select, function (err, result) {
            if (err) throw err;
            console.log(`select ${id} from merchant`);
            if (!result.length) {
                console.log("tidak ada data");
                return res.status(404).send({ error: `Merchant ${id} is Not Exist on Database` });
            } else {
                const sql = `DELETE FROM ecommerce.merchant WHERE id=${Number(id)};`;
                con.query(sql, function (err, result) {
                    if (err) throw err;
                    return res.json({
                        deleteMerchant: 'success',
                        id: id
                    })
                });
            }
        });
    },
    productAdd: function (mid, name, qty, price, res) {
        const select = `SELECT * FROM ecommerce.merchant WHERE id=${Number(mid)}`
        con.query(select, function (err, result) {
            if (err) throw err;
            console.log(`select ${mid} from merchant`);
            if (!result.length) {
                console.log("tidak ada data");
                return res.status(404).send({ error: `Merchant ${mid} is Not Exist on Database` });
            } else {
                const sql = `INSERT INTO ecommerce.product (merchant_id, name, quantity, price) VALUES ('${Number(mid)}', '${name}', '${Number(qty)}', '${Number(price)}');`;
                con.query(sql, function (err, result) {
                    if (err) throw err;
                    return res.json({
                        addProduct: 'success',
                        name: name,
                        mid: mid
                    })
                });
            }
        });

    },
    productDelete: function (id, res) {
        const select = `SELECT * FROM product WHERE id=${Number(id)}`
        con.query(select, function (err, result) {
            if (err) throw err;
            console.log(`select ${id} from merchant`);
            if (!result.length) {
                console.log("tidak ada data");
                return res.status(404).send({ error: `Product ${id} is Not Exist on Database` });
            } else {
                const sql = `DELETE FROM ecommerce.product WHERE id=${Number(id)};`;
                con.query(sql, function (err, result) {
                    if (err) throw err;
                    return res.json({
                        deleteProduct: 'success',
                        id: id
                    })
                });
            }
        });
    },
    productUpdate: function (id, mid, name, qty, price, res) {
        const select = `SELECT * FROM product WHERE id=${Number(
            id
        )} AND merchant_id=${Number(mid)}`;
        con.query(select, function (err, result) {
            if (err) throw err;
            console.log(`select product ${id} from ${mid}`);
            if (!result.length) {
                console.log("tidak ada data");
                return res.status(404).send({ error: `Product ${id} on Merchant ${mid} is Not Exist on Database` });
            } else {
                if (name === undefined || name === "") {
                    name = result[0].name;
                }
                if (qty === undefined || qty === "") {
                    qty = result[0].quantity;
                }
                if (price === undefined || price === "") {
                    price = result[0].price;
                }

                const sql = `UPDATE ecommerce.product SET name='${name}', quantity='${Number(
                    qty
                )}', price='${Number(price)}' WHERE  id=${Number(id)};`;
                con.query(sql, function (err, result) {
                    if (err) throw err;
                    return res.json({
                        updateProduct: 'success',
                        product_id: id,
                        mid: mid
                    })
                });
            }
        });
    },
    productList: function (mid, res) {
        const select = `SELECT * FROM ecommerce.merchant WHERE id=${Number(mid)}`
        con.query(select, function (err, result) {
            if (err) throw err;
            console.log(`select ${mid} from merchant`);
            if (!result.length) {
                console.log("tidak ada data");
                return res.status(404).send({ error: `Merchant ${mid} is Not Exist on Database` });
            } else {
                const sql = `SELECT * FROM product WHERE merchant_id=${Number(mid)}`;
                con.query(sql, function (err, result) {
                    if (err) throw err;
                    if (!result.length) {
                        console.log("tidak ada data");
                        return res.status(404).send({ error: `there are no products at this merchant` });
                    } else return res.json(result)
                });
            }
        });
    },
    login: function (arr, fn) {
        const username = arr[0]
        const password = arr[1]
        con.query(`SELECT * FROM merchant WHERE name = '${username}' AND password = '${password}'`, function (err, result) {
            fn(result)
        });
    },
};