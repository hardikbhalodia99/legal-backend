const { Sequelize } = require("sequelize");

const ClientModel = require("../../../models/sql/legal/client.js");
const EmployeeModel = require("../../../models/sql/legal/employee.js");
const InvoiceModel = require("../../../models/sql/legal/invoice.js");
const OrderModel = require("../../../models/sql/legal/order.js");
const ProductModel = require("../../../models/sql/legal/product.js");
const OrganizationModel = require("../../../models/sql/legal/organization.js");
const PaymentModel = require("../../../models/sql/legal/payment.js");

async function getSequelize() {
	const sequelize = new Sequelize(
		process.env.DB_NAME,
		process.env.DB_USERNAME,
		process.env.DB_PASSWORD,
		{
			host: process.env.DB_HOST,
			dialect: "mysql",
			logging: false,
			pool: {
				max: 1,
				min: 0,
				idle: 5000,
				acquire: 15000,
				evict: 5000,
			},
		}
	);
	try {
		await sequelize.authenticate();
		return sequelize;
	} catch (err) {
		console.log("Connection Error : ", err);
	}
}

let cachedDB = null;
/**
 * Reference : https://sequelize.org/docs/v6/other-topics/aws-lambda/
 */
async function getLegalDB() {
	if (cachedDB) {
		console.log("Cached sql connection");
		cachedDB.connectionManager.initPools();

		if (cachedDB.connectionManager.hasOwnProperty("getConnection")) {
			delete cachedDB.connectionManager.getConnection;
		}
		return cachedDB;
	} else {
		console.log("Non cached sql connection");
		let sequelize = await getSequelize();
		cachedDB = sequelize;
		return cachedDB;
	}
}


async function getClientModel(sequelize) {
	const Clients = ClientModel(sequelize, Sequelize);
	await Clients.sync({ alter: false, force: false });
	return Clients;
}

async function getOrganizationModel(sequelize) {
	const Organization = OrganizationModel(sequelize, Sequelize);
	await Organization.sync({ alter: false, force: false });
	return Organization;
}

async function getProductModel(sequelize) {
	const Product = ProductModel(sequelize, Sequelize);
	await Product.sync({ alter: true, force: false });
	return Product;
}

async function getEmployeeModel(sequelize) {
	const Employee = EmployeeModel(sequelize, Sequelize);
	await Employee.sync({ alter: false, force: false });
	return Employee;
}

async function getInvoiceModel(sequelize) {
	const Invoice = InvoiceModel(sequelize, Sequelize);
	await Invoice.sync({ alter: false, force: false });
	return Invoice;
}

async function getOrderModel(sequelize) {
	const Order = OrderModel(sequelize, Sequelize);
	await Order.sync({ alter: false, force: false });
	return Order;
}

async function getPaymentModel(sequelize) {
	const Payment = PaymentModel(sequelize, Sequelize);
	await Payment.sync({ alter: false, force: false });
	return Payment;
}


module.exports.getLegalDB = getLegalDB
module.exports.getClientModel = getClientModel
module.exports.getOrganizationModel = getOrganizationModel
module.exports.getProductModel = getProductModel
module.exports.getEmployeeModel = getEmployeeModel
module.exports.getInvoiceModel = getInvoiceModel
module.exports.getOrderModel = getOrderModel
module.exports.getPaymentModel = getPaymentModel