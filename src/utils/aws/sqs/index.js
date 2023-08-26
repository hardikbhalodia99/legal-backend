const AWS = require('aws-sdk');
const sqs = new AWS.SQS({region: 'ap-south-1'});
const { v4: uuidv4 } = require('uuid');

async function addToSQSQueue({data,type}){
  try {
      let dedup = uuidv4();
      console.log("dedup " , dedup);
      const response = await sqs.sendMessage({
        MessageBody: type,
        MessageAttributes: data,
        QueueUrl: `https://sqs.ap-south-1.amazonaws.com/737712331834/legal-${process.env.APP_ENV}.fifo`,
        MessageGroupId: "fifo",
        MessageDeduplicationId: dedup
      }).promise();
      console.log(`Message put on queue`, response);
  } 
  catch (e) {
    console.log('Exception on queue', e);
  }
}

module.exports.addToSQSQueue = addToSQSQueue;