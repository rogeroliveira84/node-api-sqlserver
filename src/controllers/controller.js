var db = require("../repository/database.js");
var model = new require("../model/client.js");

const _codeOk = 200;
const _codeNotFoundError = 404;
const _codeGeneralError = 500;

const _msgWelcomeMessage = 'Welcome to Node SQL Server API Backend Application';
const _msgCouldNotRegisterData = 'Could not insert data!';

const _sqlGetClients = () => { return `SELECT ClientId, ClientName, BirthDate, CreatedOn FROM dbo.Client` };
const _sqlGetClientById = (clientId) => { return `SELECT ClientId, ClientName, BirthDate, CreatedOn FROM dbo.Client WHERE ClientId=${clientId}` };
const _sqlCreateClient = (client) => {
  return `INSERT INTO dbo.Client 
          (ClientName, BirthDate, CreatedOn, State)
          VALUES ('${client.clientName}', '${client.birthDate}', getdate(), 1`;
};

module.exports = {

  welcomeMessage: function (req, res) {
    res.status(_codeOk).send(_msgWelcomeMessage);
  },
  getClients: function (req, res) {

    db.executeQuery(_sqlGetClients())
      .then(data => {
        if (data.length > 0) {
          res.status(_codeOk).send({ status: _codeOk, data: data })
        }
        else {
          res.status(_codeNotFoundError).send({ status: _codeNotFoundError, statusText: '' })
        }
      })
      .catch(error => {
        res.status(_codeGeneralError).send({ status: _codeGeneralError, statusText: error.message })
      })

  },
  getClientById: function (req, res) {

    const clientId = parseInt(req.query.clientId);

    db.executeQuery(_sqlGetClientById(clientId))
      .then(data => {
        if (data.length > 0) {
          res.status(_codeOk).send({ status: _codeOk, data: data })
        }
        else {
          res.status(_codeNotFoundError).send({ status: _codeNotFoundError, statusText: '' })
        }
      })
      .catch(error => {
        res.status(_codeGeneralError).send({ status: _codeGeneralError, statusText: error.message })
      })
  },
  createClient: function (req, res) {

    const body = JSON.parse(JSON.stringify(req.body));
    
    let _client = new model.Client();
    _client.clientName = body.clientName;
    _client.birthDate = body.birthDate;

    db.executeQuery(_sqlCreateClient(_client))
      .then(data => {
        if (data.length > 0) {
          res.status(_codeOk).send({ status: _codeOk, data: data })
        }
        else {
          res.status(_codeNotFoundError).send({ status: _codeNotFoundError, statusText: _msgCouldNotRegisterData })
        }
      })
      .catch(error => {
        res.status(_codeGeneralError).send({ status: _codeGeneralError, statusText: error.message })
      })
  }
}