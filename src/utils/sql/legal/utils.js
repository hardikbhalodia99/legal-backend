import { Sequelize } from "sequelize";

import ClientModel from "../../../models/sql/legal/client.js";
import EmployeeModel from "../../../models/sql/legal/employee.js";
import InvoiceModel from "../../../models/sql/legal/invoice.js";
import OrderModel from "../../../models/sql/legal/order.js";
import ProductModel from "../../../models/sql/legal/product.js";
import OrganizationModel from "../../../models/sql/legal/organization.js";
import PaymentModel from "../../../models/sql/legal/payment.js";


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
export async function getLegalDB() {
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


export async function getClientModel(sequelize) {
	const Clients = ClientModel(sequelize, Sequelize);
	await Clients.sync({ alter: false, force: false });
	return Clients;
}

export async function getOrganizationModel(sequelize) {
	const Organization = OrganizationModel(sequelize, Sequelize);
	await Organization.sync({ alter: false, force: false });
	return Organization;
}

export async function getProductModel(sequelize) {
	const Product = ProductModel(sequelize, Sequelize);
	await Product.sync({ alter: false, force: false });
	return Product;
}

export async function getEmployeeModel(sequelize) {
	const Employee = EmployeeModel(sequelize, Sequelize);
	await Employee.sync({ alter: false, force: false });
	return Employee;
}

export async function getInvoiceModel(sequelize) {
	const Invoice = InvoiceModel(sequelize, Sequelize);
	await Invoice.sync({ alter: false, force: false });
	return Invoice;
}

export async function getOrderModel(sequelize) {
	const Order = OrderModel(sequelize, Sequelize);
	await Order.sync({ alter: false, force: false });
	return Order;
}

export async function getPaymentModel(sequelize) {
	const Payment = PaymentModel(sequelize, Sequelize);
	await Payment.sync({ alter: false, force: false });
	return Payment;
}

