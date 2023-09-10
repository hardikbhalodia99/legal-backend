import { SQS } from 'aws-sdk';
const sqs = new SQS({region: 'ap-south-1'});
import { v4 as uuidv4 } from 'uuid';

export async function addToSQSQueue({data,type}){
  try {
      let dedup = uuidv4();
      console.log("dedup " , dedup);
      const response = await sqs.sendMessage({
        MessageBody: type,
        MessageAttributes: data,
        QueueUrl: `https://sqs.ap-south-1.amazonaws.com/865096565437/legal-${process.env.APP_ENV}.fifo`,
        MessageGroupId: "fifo",
        MessageDeduplicationId: dedup
      }).promise();
      console.log(`Message put on queue`, response);
  } 
  catch (e) {
    console.log('Exception on queue', e);
  }
}