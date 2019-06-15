const MongoClient = require('mongodb').MongoClient;

module.exports = function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    MongoClient.connect(
        process.env.CosmosDbUrl,
        (err, client) => {
            if(err) throw err;
            console.log('Connected successfully');
            const heroId = +req.params.id;
            const hero = ({id,name,saying} = req.body);
            console.log('heroId', heroId);
            console.log('hero', hero);
            const db = client.db(process.env.CosmosDb);
            db
                .collection('Heroes')
                .findOneAndUpdate(
                    {id: heroId},
                    {$set: {id: hero.id, name: hero.name, saying: hero.saying}},
                    (err, result) => {
                        if(err) {
                            context.res.json({'err':err});
                        }

                        console.log('Hero is updated successfully');
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