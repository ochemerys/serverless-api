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
    ))()),

    // create new hero
    // parameter: a hero {id,name,saying}
    createHero: async (hero) => (await (() => (
        new Promise((resolve, reject) => (clientConnect().then(client => {
            // create query
            client
                .db(dbName)
                .collection(collectionName)
                .insertOne(
                    {id: hero.id, name: hero.name, saying: hero.saying},
                    (err, result) => {
                        err ? reject(err) : resolve(result);
                });
            
            clientClose(client);
        })))
    ))()),

    // update hero
    // parameters:
    //      heroId 
    //      hero {id,name,saying}
    updateHero: async (heroId, hero) => (await (() => (
        new Promise((resolve, reject) => (clientConnect().then(client => {
            // create query
            client
                .db(dbName)
                .collection(collectionName)
                .findOneAndUpdate(
                    {id: heroId},
                    {$set: {id: hero.id, name: hero.name, saying: hero.saying}},
                    (err, result) => {
                        err ? reject(err) : resolve(result);
                    });
            clientClose(client);
        })))
    ))()),

    // update hero
    // parameters:
    //      heroId 
    deleteHero: async (heroId) => (await (() => (
        new Promise((resolve, reject) => (clientConnect().then(client => {
            // create query
            client
                .db(dbName)
                .collection(collectionName)
                .findOneAndDelete(
                    {id: heroId},
                    (err, result) => {
                        err ? reject(err) : resolve(result);
                    });
            clientClose(client);
        })))
    ))())

};