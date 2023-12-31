const { validateWebhookSignature } =require("razorpay")
const { addToSQSQueue } =require("./src/utils/aws/sqs.js");

async function handler (event, context, callback) {
  try {
    console.log("event",event);
    const signature = event.headers['X-Razorpay-Signature'];
    console.log("%c 🍒 signature", "color:#ea7e5c", signature);
    const rawBody = event.body;
    let isSignatureValid = validateWebhookSignature(event.body,signature,process.env.RAZORPAY_WEBHOOK_SECRET);
    console.log("sig", isSignatureValid);
    if(isSignatureValid){
        const body = JSON.parse(rawBody);
        console.log('%c 🥝 body.event: ', 'font-size:20px;background-color: #FCA650;color:#fff;', body.event);

        const data = body.payload.payment.entity;
        console.log("%c 🍬 data", "color:#f5ce50", data);
        
        const razorpay_payment_id = data.id;
        const razorpay_order_id = data.order_id;
        const paid_amount = (data.amount)/100

        const notes = data.notes
        console.log("%c 🌰 notes", "color:#ea7e5c", notes);
        const organization_id = notes.organization_id
        const form_id = notes.form_id
        
           

        let eventSqsData = {
          payment_id : razorpay_payment_id,
          order_id : razorpay_order_id,
          organization_id: organization_id,
          amount : paid_amount,
          form_id : form_id
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

module.exports.handler = handler;