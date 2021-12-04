const express = require('express')
const cookieParser = require("cookie-parser");
const basicAuth = require('express-basic-auth')
const service = require('../services')
const jwt = require('jsonwebtoken')
const app = express()
const port = 8000

app.use(cookieParser())
app.use(express.json())

function authorization(req, res, next) {
    const token = req.cookies.access_token;
    if (!token) {
        return res.sendStatus(403);
    }
    try {
        const data = jwt.verify(token, "YOUR_SECRET_KEY");
        req.user = data.name
        return next();
    } catch {
        return res.sendStatus(403);
    }
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

app.post("/login", login, service.loginAuth)
app.get("/logout", authorization, service.logoutAuth);
app.post("/api/merchant/regis", service.m_regis)
app.delete("/api/merchant/delete", authorization, service.m_delete)
app.post("/api/product/add", authorization, service.p_add)
app.delete("/api/product/delete", authorization, service.p_delete)
app.post("/api/product/update", authorization, service.p_update)
app.get("/api/product/:mid", authorization, service.p_list)

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
})
