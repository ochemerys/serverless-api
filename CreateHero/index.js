const { createHero } = require('../shared/dbHeroes');

module.exports = function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    const hero = ({id,name,saying} = req.body);
    createHero(hero).then(data => {
        console.log('Hero is added successfully');
        context.res = {
            body: hero
        };
        context.done();
    })
    .catch(err => {
        context.res.json({'error': err});
        context.done();
    });

};