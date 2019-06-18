const { getHeroes } = require('../shared/dbHeroes');

module.exports = (context, req) => {
    context.log('JavaScript HTTP trigger function processed a request.');
    
    getHeroes().then(data => {
        // process returned data after it is returned from promise
        context.log('Heroes retrieved successfully!');
        data.forEach(hero => delete hero._id);
    
        context.res = {
            // status: 200, /* Defaults to 200 */
            body: data
        };
        context.done();
    })
    .catch(err => {
        context.res.json({'error': err});
        context.done();
    });

};