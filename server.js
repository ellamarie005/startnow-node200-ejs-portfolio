const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
var twilio = require('twilio');


const app = express();
app.use(express.static(__dirname + '/public'));

//Here we're setting the views directory to be ./views
//thereby letting the app know where to find the template files
app.set('views', './views');
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  const data = {
    person: {
      firstName: 'Ella',
      lastName: 'Tolentino',
    }
  }
  // Notice now the data is the second argument passed to the template render method
  res.render('index', data);
});

app.get('/contact', (req, res) => {
  res.render('contact');
});

app.post('/thanks', (req, res) => {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const client = require('twilio')(accountSid, authToken);
  client.messages
    .create({
      body: `${req.body.name} (${req.body.email}) - ${req.body.subject}`,
      from: process.env.MY_PHONE_NUMBER,
      to: process.env.MY_TWILIO_NUMBER
    })
    .then(message => console.log(message.sid))
    .done();
  res.render('thanks', { contact: req.body })
});
app.listen(8080, () => {
  console.log('listening at http://localhost:8080')
});
