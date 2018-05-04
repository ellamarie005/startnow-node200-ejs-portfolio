const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;


var twilio = require('twilio');
var client = new twilio(accountSid, authToken);

client.messages.create({
  to: '15102194254',
  from: '15558675310',
  body: 'Test Test 123' 
  
})
.then((message) => console.log(message.sid));