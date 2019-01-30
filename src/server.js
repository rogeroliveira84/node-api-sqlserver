
var express = require("express"),
  bodyParser = require("body-parser"),
  cors = require('cors'),
  helmet = require('helmet'),
  app = express();

const _msgWelcomeMessage = 'NODE SQL SERVER API Backend now running on port';

// Enabling cors
app.use(cors({ origin: function (origin, callback) { callback(null, true) } }));

// Protect some web vulnerabilities by setting HTTP headers appropriately
app.use(helmet());

// Setting Base directory
app.use(bodyParser.urlencoded({ extended: true })); // support encoded body
app.use(bodyParser.json()); // support json body

// Add routes
var routes = require("./routes/routes.js");
routes(app);

// Support json body
app.use(bodyParser.json());

// Server config
var server = app.listen(process.env.PORT || 3001, () => {
  var port = server.address().port;
  console.log(_msgWelcomeMessage, port);
});