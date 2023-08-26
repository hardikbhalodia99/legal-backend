const { getOrganizationByOrganizationId } = require("./organization");
const { updatePayment, createPayment, confirmPayment, getPayment } = require("./payment");
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

//payment exports
module.exports.updatePayment = updatePayment;
module.exports.createPayment = createPayment;
module.exports.confirmPayment = confirmPayment;
module.exports.getPayment = getPayment;