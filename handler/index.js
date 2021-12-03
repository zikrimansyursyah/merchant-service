require('dotenv').config()

const express = require('express')
const basicAuth = require('express-basic-auth')
const service = require('../services')
const jwt = require('jsonwebtoken')
const app = express()
const port = 8000

app.use(express.json())

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        console.log(err)
        if (err) return res.sendStatus(403)
        req.user = user
        next()
    })
}

function login(req, res, next) {
    let name, pass;
    auth = req.headers.authorization
    const arr = atob(auth.slice(6)).split(":")
    service.login(arr, function (result) {
        if (!result.length) {
            res.send('Login Gagal')
        } else {
            name = result[0].name
            pass = result[0].pass
            app.use(basicAuth({
                users: { name: pass }
            }))
            next()
        }
    })
}

app.post("/login", login, (req, res) => {
    auth = req.headers.authorization
    const logData = atob(auth.slice(6)).split(":")
    const user = { name: logData[0] }

    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
    res.json({
        login: 'Success',
        username: logData[0],
        accessToken: accessToken
    })
})
app.post("/api/merchant/regis", authenticateToken, service.m_regis)
app.delete("/api/merchant/delete", authenticateToken, service.m_delete)
app.post("/api/product/add", authenticateToken, service.p_add)
app.delete("/api/product/delete", authenticateToken, service.p_delete)
app.post("/api/product/update", authenticateToken, service.p_update)
app.get("/api/product/:mid", authenticateToken, service.p_list)

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
})
