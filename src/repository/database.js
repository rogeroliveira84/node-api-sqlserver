var sql = require("mssql");

//Initiallising connection string
var dbConfig = {
    user: 'test',
    password: 'test123',
    server: 'localhost\\sqlexpress',
    database: 'node_api_test',
    port: 1433,
    options: {
        encrypt: false
    }
};

module.exports = {

    executeQuery: async (query) => {

        return await new sql.ConnectionPool(dbConfig).connect().then(pool => {
            return pool.request().query(query)
        }).then(result => {
            let rows = result.recordset
            sql.close();
            return (rows === undefined) ? '' : rows
        }).catch(error => {

            sql.close();
            throw new Error(error.message);
        })
    }
}