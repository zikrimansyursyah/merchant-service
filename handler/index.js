const express = require('express')
const basicAuth = require('express-basic-auth')
const service = require('../services')

const app = express()
const port = 8000

app.use((req, res, next) => {
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
})
app.use(express.json())

app.post("/login", (req, res) => {
    auth = req.headers.authorization
    const logData = atob(auth.slice(6)).split(":")
    res.json({
        login: 'Success',
        username: logData[0]
    })
})
app.post("/api/merchant/regis", service.m_regis)
app.delete("/api/merchant/delete", service.m_delete)
app.post("/api/product/add", service.p_add)
app.delete("/api/product/delete", service.p_delete)
app.post("/api/product/update", service.p_update)
app.get("/api/product/:mid", service.p_list)

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
})
