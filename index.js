// require your server and launch it here
const server = require('./api/server');

server.listen(4001, () => {
    console.log('\n*** Server Running on http://localhost:4001 ***\n');
});
