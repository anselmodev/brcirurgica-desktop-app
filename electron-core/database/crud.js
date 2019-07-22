const initDb = require('./database-db');

module.exports = (sql, options) => {
    return new Promise((resolve, reject) => {

        initDb().then(dbConnected => {
            dbConnected.query(sql, (error, results) => {
                if(error) {
                    console.log('QUERY_ERROR', error);
                    reject({
                        success: false,
                        data: error
                    });
                    return false
                }
    
                resolve({
                    success: true,
                    data: results
                });
    
            });

        }).catch(err_query => {
            console.log(err_query);
        });

    });
};
