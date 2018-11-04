const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const db = require('./config/db');
const morgan = require('morgan');
const OAuthClient = require('intuit-oauth');
const app = express();
const router = express.Router();
const port = process.env.PORT || 3000;

mongoose.Promise = global.Promise;
mongoose
  .connect(db.url)
  .then(() => console.log(`Connected to Database`))
  .catch(err => console.error(`Failed to connect ${err}`));

app.use(morgan('dev'));
app.use(cors());
// configure bodyParser()
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

router.get('/', (req, res) => {
  // Redirect the authUri
  res.redirect(authUri);
});

router.get('/about', (req, res) => {
  res.json({ message: 'New api endpoint works' });
});

router.get('/payment', (req, res) => {
  const oauthClient = new OAuthClient({
    clientId: process.env.clientId,
    clientSecret: process.env.clientSecret,
    environment: process.env.environment,
    redirectUri: process.env.redirectUri
  });
  // AuthorizationUri
  const authUri = oauthClient.authorizeUri({
    scope: [OAuthClient.scopes.Accounting, OAuthClient.scopes.OpenId],
    state: 'testState'
  }); // can be an array of multiple scopes ex : {scope:[OAuthClient.scopes.Accounting,OAuthClient.scopes.OpenId]}

  res.redirect(authUri);
});
router.post('/create-event', (req, res) => {});
router.get('/events', (req, res) => {});

router.get('/events/:id', (req, res) => {});

app.use('/api', router);

//  start the server
app.listen(port);

console.log('server started on port: ' + port);
