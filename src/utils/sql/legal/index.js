const { createSQLClient, getClientByClientId,getClientByAppwriteId } = require("./client");
const { createNewEmployee,getEmployeeByAppwriteId,getAllOrganizationEmployees, updateEmployeeDetailsById, disableEmployeeById, getEmployeeByEmployeeId } = require("./employee");
const { createOrder, getAllClientOrdersByClientId,getClientsOrdersByProductId } = require("./order");
const { createOrganization, getOrganizationByOrganizationId } = require("./organization");
const { createPayment, getPayment, confirmPayment, updatePayment } = require("./payment");
const { createProduct, getProductByOrganizationIdAndSlug ,getAllOrganizationProducts} = require("./product");
const { getLegalDB, getClientModel, getOrganizationModel, getProductModel, getEmployeeModel, getInvoiceModel, getOrderModel, getPaymentModel } = require("./utils");

//client exports
module.exports.createSQLClient = createSQLClient
module.exports.getClientByClientId = getClientByClientId
module.exports.getClientByAppwriteId = getClientByAppwriteId;

//order exports
module.exports.createOrder = createOrder;
module.exports.getAllClientOrdersByClientId = getAllClientOrdersByClientId;
module.exports.getClientsOrdersByProductId = getClientsOrdersByProductId;

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
module.exports.getAllOrganizationProducts = getAllOrganizationProducts;


//utils exports
module.exports.getLegalDB = getLegalDB
module.exports.getClientModel = getClientModel
module.exports.getOrganizationModel = getOrganizationModel
module.exports.getProductModel = getProductModel
module.exports.getEmployeeModel = getEmployeeModel
module.exports.getInvoiceModel = getInvoiceModel
module.exports.getOrderModel = getOrderModel
module.exports.getPaymentModel = getPaymentModel

//employee exports
module.exports.createNewEmployee = createNewEmployee;
module.exports.getEmployeeByAppwriteId = getEmployeeByAppwriteId;
module.exports.getAllOrganizationEmployees = getAllOrganizationEmployees;
module.exports.updateEmployeeDetailsById = updateEmployeeDetailsById;
module.exports.disableEmployeeById = disableEmployeeById;
module.exports.getEmployeeByEmployeeId = getEmployeeByEmployeeId;