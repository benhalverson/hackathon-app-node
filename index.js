const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const morgan = require('morgan');
const OAuthClient = require('intuit-oauth');
const config = require('./config');
const app = express();
const router = express.Router();

const oauthClient = new OAuthClient({
  clientId: config.clientId,
  clientSecret: config.clientSecret,
  environment: config.environment,
  redirectUri: config.redirectUri
});

// AuthorizationUri
const authUri = oauthClient.authorizeUri({
  scope: [OAuthClient.scopes.Accounting, OAuthClient.scopes.OpenId],
  state: 'testState'
}); // can be an array of multiple scopes ex : {scope:[OAuthClient.scopes.Accounting,OAuthClient.scopes.OpenId]}

app.use(morgan('dev'));
app.use(cors());
// configure bodyParser()
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

router.get('/', (req, res) => {
  // Redirect the authUri
  res.redirect(authUri);
});
