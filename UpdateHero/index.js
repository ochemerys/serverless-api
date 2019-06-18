const { updateHero } = require('../shared/dbHeroes');

module.exports = function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    const heroId = +req.params.id;
    const hero = ({id,name,saying} = req.body);
    updateHero(heroId, hero).then(data => {
        console.log('Hero is updated successfully');
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