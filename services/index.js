const { merchantRegis, merchantDelete, productAdd, productDelete, productUpdate, productList } = require("../store");

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
	}
};
