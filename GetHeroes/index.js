const MongoClient = require('mongodb').MongoClient;

module.exports = (context, req) => {
    context.log('JavaScript HTTP trigger function processed a request.');

    MongoClient.connect(
        process.env.CosmosDbUrl,
        async (err, client) => {
            if(err) throw err;
            console.log('Connected successfully');
            const db = client.db(process.env.CosmosDb);

            // wrap db communication with promise
            const dbPromise = () => {
                return new Promise((resolve, reject) => {
                    db
                    .collection('Heroes')
                    .find()
                    .toArray((err, result) => {
                        err ? reject(err) : resolve(result);
                    });
                });
            };

            // await dbPromise
            const returnedData = await dbPromise();

            // process returned data after it is returned from promise
            context.log('Heroes retrieved successfully!!!');
            returnedData.forEach(hero => delete hero._id);

            context.res = {
                // status: 200, /* Defaults to 200 */
                body: returnedData
            };

            client.close();
            context.done();

        }
    );

};