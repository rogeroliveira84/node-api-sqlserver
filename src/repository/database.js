var sql = require("mssql");

//Initiallising connection string
var dbConfig = {
    user: "user",
    password: "password",
    server: "server",
    database: "database",
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