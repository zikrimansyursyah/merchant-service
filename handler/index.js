const express = require('express')
const basicAuth = require('express-basic-auth')
const service = require('../services')

const app = express()
const port = 8000

app.use(basicAuth({
    users: { 'admin': 'supersecret' }
}))
app.use(express.json())
app.get("/login", (req, res) => {
    res.send('Login Success')
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