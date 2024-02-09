const app = require('./controller/app')
const port = 8081;
const hostname = 'ec2-52-72-104-196.compute-1.amazonaws.com'
app.listen(port, hostname, () => {
    // console.log(`Server started and accessible via http://${hostname}:${port}/`);
});
