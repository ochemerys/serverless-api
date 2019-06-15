const MongoClient = require('mongodb').MongoClient;

module.exports = function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    MongoClient.connect(
        process.env.CosmosDbUrl,
        (err, client) => {
            if(err) throw err;
            console.log('Connected successfully');
            const db = client.db(process.env.CosmosDb);
            db
                .collection('Heroes')
                .find()
                .toArray((err, result) => {
                    if(err) throw err;
                    console.log('Heroes retrieved successfully!!!');
                    result.forEach(hero => delete hero._id);

                    context.res = {
                        // status: 200, /* Defaults to 200 */
                        body: result
                    };

                    client.close();
                    context.done();
                });
        }
    );

};