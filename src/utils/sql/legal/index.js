const { createOrder } = require("./order");
const { getOrganizationByOrganizationId, createOrganization } = require("./organization");
const { updatePayment, createPayment, confirmPayment, getPayment } = require("./payment");
const { getProductByOrganizationIdAndSlug, createProduct } = require("./product");
const { getLegalDB, getClientModel,getEmployeeModel,getInvoiceModel,getOrderModel,getOrganizationModel,getProductModel, getPaymentModel } = require("./utils");

//utils exports
module.exports.getLegalDB = getLegalDB;
module.exports.getClientModel = getClientModel;
module.exports.getOrganizationModel = getOrganizationModel;
module.exports.getProductModel = getProductModel;
module.exports.getEmployeeModel = getEmployeeModel;
module.exports.getInvoiceModel = getInvoiceModel;
module.exports.getOrderModel = getOrderModel;
module.exports.getPaymentModel = getPaymentModel;


//organization exports
module.exports.getOrganizationByOrganizationId = getOrganizationByOrganizationId;
module.exports.createOrganization = createOrganization;

//payment exports
module.exports.updatePayment = updatePayment;
module.exports.createPayment = createPayment;
module.exports.confirmPayment = confirmPayment;
module.exports.getPayment = getPayment;


//products exports
module.exports.getProductByOrganizationIdAndSlug = getProductByOrganizationIdAndSlug;
module.exports.createProduct = createProduct;

//order exxports
module.exports.createOrder = createOrder;