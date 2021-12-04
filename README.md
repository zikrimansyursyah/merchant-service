# Welcome to Merchant Service by Zikri
Hai! this is the first Merchant Service I Ever Made, This merchant-service is also part of the Backend Mini Project that I am currently working on in the Dibimbing Bootcamp Program. this is an open source API that I created and developed, criticism and suggestions for this resource are very wide open. thank you

See ARCHITECTURE.md for architecture details

## Requirement
- Node Js (v16.6.1)
- Express (v4.17.1)
- Express-basic-auth (v1.2.0)
- JWT (v8.5.1)
- MySql (v2.18.11) 
- cookie-parser (v.1.4.6)
- nodemon
- postman (optional)
> **Note:** - in this case, i use XAMPP for running mysql server (host: localhost, user: root, password: none)
> express port set 8000 

## Start?
#### install all requirement :
- `npm init`
- `npm i express express-basic-auth jsonwebtoken mysql cookie-parser`
- `npm i --save-dev nodemon`
#### run merchant-service
- `npm start`

## API List
|                |url                            |Requirement                  |Description
|----------------|-------------------------------|-----------------------------|---
|Register Merchant|POST `/api/merchant/regis` | set body json `{ name, password, address, phone }` | Add Merchant Account|
|Login|POST `/login`|set basic auth on authorization |get cookie login token|
|Add Product|POST `/api/product/add` |set body json `{ mid, name, qty, price }` | Add product to Merchant|
|Update Product|POST `/api/product/update`|set body json `{ id, mid, name, qty, price }`| Update Product|
|List Product|GET `/api/product/:mid` | set `:mid` to Merchant Id | Show List Product from Merchant|
|Delete Product| DELETE `/api/product/delete` | set body json `{ id }` | delete Product with id from body json|
|Delete Merchant| DELETE `/api/merchant/delete` | set body json `{ id }` | delete Merchant with id from body json|
|Logout| GET `/logout` | login first | Logout from API

> **Note** : Login first before use any API

### Zikri Mansyursyah - 2021
