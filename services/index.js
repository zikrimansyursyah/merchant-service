const db = require("../store")

let merchantRegis = function (req, res) {
    const {
        name,
        password,
        address,
        phone
    } = req.body
    const sql = `INSERT INTO ecommerce.merchant (password, name, address, phone_number) 
    VALUES ('${password}', '${name}', '${address}', '${phone}');`
    db.con.query(sql, function (err, result) {
        res.send(`Success add ${name}`)
    })
}

let merchantDelete = function (req, res) {
    const {
        id
    } = req.body
    const sql = `DELETE FROM ecommerce.merchant WHERE id=${Number(id)};`
    db.con.query(sql, function (err, result) {
        res.send(`Success Delete ${id} from Merchant`)
    })
}

let productAdd = function (req, res) {
    const {
        mid,
        name,
        qty,
        price
    } = req.body
    const sql = `INSERT INTO ecommerce.product (merchant_id, name, quantity, price) 
    VALUES ('${Number(mid)}', '${name}', '${Number(qty)}', '${Number(price)}');`
    db.con.query(sql, function (err, result) {
        res.send(`Success Add ${name} to Product`)
    })
}

let productDelete = function (req, res) {
    const {
        id
    } = req.body
    const sql = `DELETE FROM ecommerce.product WHERE id=${Number(id)};`
    db.con.query(sql, function (err, result) {
        res.send(`Success Delete ${id} from Product`)
    })
}

let productUpdate = function (req, res) {
    let {
        id,
        mid,
        name,
        qty,
        price
    } = req.body
    const select = `SELECT * FROM product WHERE id=${Number(id)} AND merchant_id=${Number(mid)}`
    db.con.query(select, function (err, result) {
        console.log(`select product ${id} from ${mid}`);
        if (!result.length) {
            console.log("tidak ada data")
            res.send(`Data id=${id} di Merchant ${mid} tidak ada`)
        } else {
            if (name === undefined || name === "") {
                name = result[0].name
            }
            if (qty === undefined || qty === "") {
                qty = result[0].quantity
            }
            if (price === undefined || price === "") {
                price = result[0].price
            }

            const sql = `UPDATE ecommerce.product SET name='${name}', quantity='${Number(qty)}', price='${Number(price)}' WHERE  id=${Number(id)};`
            db.con.query(sql, function (err, result) {
                res.send(`Success Update Id=${id} from Product mid=${mid}`)
            })
        }
    })
}

let productList = function (req, res) {
    let {
        mid
    } = req.params
    const sql = `SELECT * FROM product WHERE merchant_id=${Number(mid)}`
    db.con.query(sql, function (err, result) {
        res.send(result)
    })
}

module.exports = {
    m_regis: merchantRegis,
    m_delete: merchantDelete,
    p_add: productAdd,
    p_delete: productDelete,
    p_update: productUpdate,
    p_list: productList
}