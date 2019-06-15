const MongoClient = require('mongodb').MongoClient;

module.exports = function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    MongoClient.connect(
        process.env.CosmosDbUrl,
        (err, client) => {
            if(err) throw err;
            console.log('Connected successfully');
            const hero = ({id,name,saying} = req.body);

            const db = client.db(process.env.CosmosDb);
            db
                .collection('Heroes')
                .insertOne(
                    {id: hero.id, name: hero.name, saying: hero.saying},
                    (err, result) => {
                        if(err) throw err;

                        console.log('Hero is added successfully');
                        context.res = {
                            // status: 200, /* Defaults to 200 */
                            body: hero
                        };

                        client.close();
                        context.done();
                    }
                );
        }
    );

};