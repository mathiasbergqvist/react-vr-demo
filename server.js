var connect = require('connect');
var serveStatic = require('serve-static');
const PORT = process.env.PORT || 7000

connect().use(serveStatic(__dirname)).listen(PORT, function(){
    console.log(`Server running on ${PORT}`);
});