const { deleteHero } = require('../shared/dbHeroes');

module.exports = function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    const heroId = +req.params.id;
    deleteHero(heroId).then(data => {
        console.log(`Hero id ${heroId} is deleted successfully`);
        context.res = {
            body: {message: `Hero with id ${heroId} is deleted successfully`}
        };
        context.done();
    })
    .catch(err => {
        context.res.json({'error': err});
        context.done();
    });


    // MongoClient.connect(
    //     process.env.CosmosDbUrl,
    //     (err, client) => {
    //         if(err) throw err;
    //         console.log('Connected successfully');
    //         const heroId = +req.params.id;

    //         console.log('heroId', heroId);
    //         const db = client.db(process.env.CosmosDb);
    //         db
    //             .collection('Heroes')
    //             .findOneAndDelete(
    //                 {id: heroId},
    //                 (err, result) => {
    //                     if(err) {
    //                         context.res.json({'err':err});
    //                     }

    //                     console.log(`Hero id ${heroId} is deleted successfully`);
    //                     context.res = {
    //                         status: 200, /* Defaults to 200 */
    //                         body: {message: `Hero id ${heroId} is deleted successfully`}
    //                     };

    //                     client.close();
    //                     context.done();
    //                 }
    //             );
    //     }
    // );

};