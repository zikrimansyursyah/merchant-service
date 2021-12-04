const { merchantRegis, merchantDelete, productAdd, productDelete, productUpdate, productList, login, getLogin } = require("../store");
const jwt = require('jsonwebtoken')

module.exports = {
	m_regis: function (req, res) {
		const { name, password, address, phone } = req.body;
		merchantRegis(name, password, address, phone, res)
	},
	m_delete: function (req, res) {
		const { id } = req.body;
		merchantDelete(id, res)
	},
	p_add: function (req, res) {
		const { mid, name, qty, price } = req.body;
		productAdd(mid, name, qty, price, res)
	},
	p_delete: function (req, res) {
		const { id } = req.body;
		productDelete(id, res)
	},
	p_update: function (req, res) {
		let { id, mid, name, qty, price } = req.body;
		productUpdate(id, mid, name, qty, price, res)
	},
	p_list: function (req, res) {
		let { mid } = req.params;
		productList(mid, res)
	},
	login: login,
	logoutAuth: (req, res) => {
		return res
			.clearCookie("access_token")
			.status(200)
			.json({ message: "Successfully logged out 😏 🍀" });
	},
	loginAuth: (req, res) => {
		auth = req.headers.authorization
		const logData = atob(auth.slice(6)).split(":")
		const user = { name: logData[0] }

		const token = jwt.sign(user, "YOUR_SECRET_KEY")
		return res
			.cookie("access_token", token, {
				httpOnly: true,
				secure: process.env.NODE_ENV === "production",
			})
			.status(200)
			.json({ message: "Logged in successfully 😊 👌" });
	}
}
