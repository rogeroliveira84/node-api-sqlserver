const env = process.env.NODE_ENV; // 'dev' or 'prod'

const dev = {
    app: {
        port: parseInt(process.env.DEV_APP_PORT) || 3001
    },
    db: {
        server: process.env.DEV_DB_SERVER || 'host',
        name: process.env.DEV_DB_NAME || 'database',
        user: process.env.DEV_DB_USER || 'user',
        pass: process.env.DEV_DB_PASS || 'password',
        options: {
            encrypt: process.env.DEV_DB_ENCRYPT || false
        }
    }
};

const prod = {
    app: {
        port: parseInt(process.env.PROD_APP_PORT) || 3001
    },
    db: {
        server: process.env.DEV_DB_SERVER || 'host',
        name: process.env.DEV_DB_NAME || 'database',
        user: process.env.DEV_DB_USER || 'user',
        pass: process.env.DEV_DB_PASS || 'password',
        options: {
            encrypt: process.env.PROD_DB_ENCRYPT || false
        }
    }
}

const config = {
    dev,
    prod
};

module.exports = config[dev];