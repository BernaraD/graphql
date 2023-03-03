const cors = require('cors');

const corsModule = (app) => {
    app.use(
        cors({
            origin: ['https://studio.apollographql.com', process.env.CLIENT_HOST],
            credentials: true,
            methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
            preflightContinue: false,
        }),
    );

    // app.use((req, res, next) => {
    //     res.header('Access-Control-Allow-Origin', process.env.CLIENT_HOST);
    //     res.header('Access-Control-Allow-Credentials', true);
    //     res.header(
    //       'Access-Control-Allow-Headers',
    //       'Origin, X-Requested-With, Content-Type, Accept, Authorization',
    //     );
    //     res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    //     next();
    //   });
};

module.exports = corsModule;
