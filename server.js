const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const sgMail = require('@sendgrid/mail');
require('dotenv').config();
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// const accountSid = process.env.TWILIO_ACCOUNT_SID;
// const authToken = process.env.TWILIO_AUTH_TOKEN;
// const client = require('twilio')(accountSid, authToken);

const app = express();
app.use(morgan('combined'))

//need if you want req.body to work
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true}))

//path to the directory for style
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
  const msg = {
    to: 'ellatolentino05@gmail.com',
    from: 'test@example.com',
    subject: 'New inquirer',
    text: req.body.comment,
    html: '<strong>and easy to do anywhere, even with Node.js</strong>',
  };
  sgMail.send(msg);

  res.render("thanks", {contact: req.body})

  // client.messages
  //   .create({
  //     from: process.env.MY_TWILIO_NUMBER,
  //     to: process.env.MY_PHONE_NUMBER,
  //     body: `${req.body.name} (${req.body.email}) - ${req.body.comment}`
  //   })
  //   .then(message => {
  //     console.log(message.sid);
  //     res.render('thanks', { contact: req.body })
  //   })
});

app.get("*", function (req, res) {
  res.send("Whoops, page does not exist... I mean not found 404").status(404);
})

app.listen(8080, () => {
  console.log('listening at http://localhost:8080')
});
