const assert = require('assert');
const MongoClient = require('mongodb').MongoClient;

const dbConnectionString = `mongodb://${process.env.CosmosUser}:${process.env.CosmosPass}@${process.env.CosmosHost}:${process.env.CosmosPort}/?ssl=true`;

module.exports = {
    /*
     * Mongo Utility */

    // connect to Mongo cluster and resolve client
    clientConnect: async () => (
        client = await (() => (new Promise((resolve, reject) => (
            MongoClient.connect(
                dbConnectionString,
                (err, client) => {
                    if(err) throw err;
                    resolve(client);
                }
            )
        )
    )))()),

    // close connection
    clientClose: async (client) => {
        client.close();

        return true;
    }
}