const { clientConnect, clientClose } = require('./dbMongo');

const dbName = process.env.CosmosDb;
const collectionName = 'Heroes';

module.exports = {
    /*
     * Heroes Utility */

    // get heroes
    getHeroes: async () => (await (() => (
        new Promise((resolve, reject) => (clientConnect().then(client => {
            // create query
            client
                .db(dbName)
                .collection(collectionName)
                .find()
                .toArray((err, result) => {
                    //clientClose(client);
                    err ? reject(err) : resolve(result);
                });
            
            clientClose(client);
        })))
    ))())
};