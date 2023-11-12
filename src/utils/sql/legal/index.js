const { createSQLClient, getClientByClientId } = require("./client");
const { createOrder } = require("./order");
const { createOrganization, getOrganizationByOrganizationId } = require("./organization");
const { createPayment, getPayment, confirmPayment, updatePayment } = require("./payment");
const { createProduct, getProductByOrganizationIdAndSlug } = require("./product");
const { getLegalDB, getClientModel, getOrganizationModel, getProductModel, getEmployeeModel, getInvoiceModel, getOrderModel, getPaymentModel } = require("./utils");

//client exports
module.exports.createSQLClient = createSQLClient
module.exports.getClientByClientId = getClientByClientId

//order exports
module.exports.createOrder = createOrder;


//organizations exports
module.exports.createOrganization = createOrganization
module.exports.getOrganizationByOrganizationId = getOrganizationByOrganizationId

//payment exports
module.exports.createPayment = createPayment;
module.exports.getPayment = getPayment;
module.exports.confirmPayment = confirmPayment;
module.exports.updatePayment = updatePayment;


//product exports
module.exports.createProduct = createProduct
module.exports.getProductByOrganizationIdAndSlug = getProductByOrganizationIdAndSlug



//utils exports
module.exports.getLegalDB = getLegalDB
module.exports.getClientModel = getClientModel
module.exports.getOrganizationModel = getOrganizationModel
module.exports.getProductModel = getProductModel
module.exports.getEmployeeModel = getEmployeeModel
module.exports.getInvoiceModel = getInvoiceModel
module.exports.getOrderModel = getOrderModel
module.exports.getPaymentModel = getPaymentModel