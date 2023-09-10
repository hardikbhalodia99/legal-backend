import { getLegalDB, getPaymentModel } from "./utils.js";

export async function createPayment({legal_payment_id,external_order_id,payment_provider,external_payment_id}){
  try {
    const sequelize = await getLegalDB();
    const PaymentModel = await getPaymentModel(sequelize);
    const payment = await PaymentModel.create({
        legal_payment_id : legal_payment_id,
        external_order_id : external_order_id,
        payment_provider : payment_provider,
        external_payment_id : external_payment_id,
        payment_status: "CREATED"
    });
    return payment;
  }
  catch(error){
    console.error("Server Error in sql/payment at createPayment ==> Error : ",error);
  }
}

export async function getPayment({external_order_id,external_payment_id}){
  try{
    const sequelize = await getClimesDB();
    const PaymentModel = await getPaymentModel(sequelize);

    
    if(external_order_id) {
      const payment = await PaymentModel.findOne({ where : {external_order_id : external_order_id}});
      return payment
    }else{
      const payment = await PaymentModel.findOne({ where : {external_payment_id : external_payment_id}});
      return payment
    }
  }
  catch(error){
    console.error("Server Error in sql/payment at getPayment ==> Error : ",error);
  }
}

export async function confirmPayment({external_order_id,external_payment_id}){ 
  let sequelize = await getClimesDB();
  try {
      const PaymentModel = await getPaymentModel(sequelize);
      await PaymentModel.update(
        {
          external_payment_id : external_payment_id,
          payment_status : "PAID_CONFIRMED"
        },
        {
          where: {
              external_order_id : external_order_id
          }
        }
      );
  }
  catch(error){
    console.error("Server Error in sql/payment at confirmPayment ==> Error : ",error);
  }
}

export async function updatePayment({legal_payment_id,external_order_id,external_payment_id,payment_signature}){
  let sequelize = await getClimesDB();
  try {
      const PaymentModel = await getPaymentModel(sequelize);
      const payment = await PaymentModel.findOne({ where : {payment_id : legal_payment_id,}});
      if(payment && payment.payment_status === "CREATED"){
          await PaymentModel.update(
              {
                external_payment_id : external_payment_id,
                payment_signature : payment_signature,
                payment_status : "PAID_WAITING"
              },
              {
                where: {
                  payment_id : legal_payment_id,
                  external_order_id: external_order_id
                }
              }
          );
      }
      else if(payment.payment_status === "PAID_CONFIRMED"){
              await PaymentModel.update(
                  {
                      external_payment_id : external_payment_id,
                      payment_signature : payment_signature
                  },
                  {
                      where: {
                          payment_id : legal_payment_id,
                          external_order_id: external_order_id
                      }
                  }
              );
      }
    return payment;
  }
  catch(error){
    console.error("Server Error in sql/payment at getPayment ==> Error : ",error);
  }
}

