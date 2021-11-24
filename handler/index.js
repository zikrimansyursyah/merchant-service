const express = require('express')
const service = require('../services')

const app = express()
const port = 8000

app.use(express.json())
app.post("/api/merchant/regis", service.m_regis)
app.delete("/api/merchant/delete", service.m_delete)
app.post("/api/product/add", service.p_add)
app.delete("/api/product/delete", service.p_delete)
app.post("/api/product/update", service.p_update)
app.get("/api/product/:mid", service.p_list)

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
})