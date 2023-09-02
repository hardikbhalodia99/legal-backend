const AWS = require('aws-sdk');
const sqs = new AWS.SQS({region: 'ap-south-1'});

module.exports.handler = async (event, context) => {
    try{
        context.callbackWaitsForEmptyEventLoop = false;

        for (let message of event.Records) {
            console.log(`Handling message: ${message.messageId}`);
            var params = {
                QueueUrl: `https://sqs.ap-south-1.amazonaws.com/865096565437/legal-${process.env.APP_ENV}.fifo`,
                ReceiptHandle: message.receiptHandle
            };
            console.log("raw body",message.body);
            console.log("attributes",message.messageAttributes)


            switch(message.body){
              case "PROCESS_RAZORPAY_EVENTS_DIRECT" : processRazorpayEventsDirect(message.messageAttributes); break;
              default: console.log("NEW TYPE"); break;
            }
            const res = await sqs.deleteMessage(params).promise();
            console.log("deleted message",res);
        }    
    }
    catch(err){
        console.log("SQS Err",err);
    }
}