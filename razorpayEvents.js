const Razorpay = require("razorpay");
const { addToSQSQueue } = require("./src/utils/aws/sqs");

exports.handler = async function (event, context, callback) {
  try {
    console.log("event",event);
    const signature = event.headers['x-razorpay-signature'];
    const rawBody = event.body;
    let isSignatureValid = Razorpay.validateWebhookSignature(event.body,signature,process.env.RAZORPAY_WEBHOOK_SECRET);
    console.log("sig", isSignatureValid);
    if(isSignatureValid){
        const body = JSON.parse(rawBody);
        console.log('%c 🥝 body.event: ', 'font-size:20px;background-color: #FCA650;color:#fff;', body.event);

        const data = body.payload.payment.entity;
        
        const razorpay_payment_id = data.id;
        const razorpay_order_id = data.order_id;
        const paid_amount = (data.amount)/100

        const notes = data.notes
        const products = notes.products
        const organization_id = notes.organization_id
      
        
           

        let eventSqsData = {
          payment_id : razorpay_payment_id,
          order_id : razorpay_order_id,
          organization_id: organization_id,
          amount : paid_amount,
          products : products,
          email : notes.email,
          name : notes.name,
          
        }

        let eventsData = {
            rzpData : {
                StringValue: JSON.stringify(eventSqsData),
                DataType: 'String'
            }
        }
        await addToSQSQueue({
            data : eventsData,
            type: "PROCESS_RAZORPAY_EVENTS_DIRECT"
        });
            

        
          
            
        
            
          
            
            
        


        
        console.log("Sending success response to Razorpay!");
        return {
            statusCode: 200,
            body: JSON.stringify({received: true}),
        };

        
    }
    else{
      console.log("signature not valid");
    }
  } catch (error) {
    console.log("Server Error at razorpayEvents.js  ==> Error : ",error);
  }
  

  console.log("SENDING 200 POINT 3");
  const data = {
      statusCode: 200,
      body: JSON.stringify({received: true}),
  };
  return data; 
}
