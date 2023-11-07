// filesystem Module

// const fs = require('fs');
//
// fs.readFile('./test.txt',  'utf-8', (err, data) => {
//   fs.mkdirSync('./files', () => {});
//   fs.writeFileSync('./files/test2.txt', `${data} New data! `, (err) => {
//     err ? console.log(err) : null;
//   })
// });
//
// setTimeout(() => {
//   if (fs.existsSync("./files/test2.txt")) {
//     fs.unlink("./files/test2.txt", () => {});
//   }
// }, 10000);
// setTimeout(() => {
//   if (fs.existsSync("./files")) {
//     fs.rmdir("./files", () => {});
//   }
// }, 15000);

// Event Module

// const Logger = require('./log');
// const logger = new Logger();
//
// logger.on('some_event', (args) => {
//   const { id, text } = args
//   console.log(id, text);
// });
//
// logger.log('user logged!');

// Buffer & Streams

const fs = require('fs');
const zlib = require("zlib");

const readStream = fs.createReadStream('./docs/text.txt');
const writeStream = fs.createWriteStream('./docs/new-text2.txt');
const compressStream = zlib.createGzip();

// readStream.on('data', (chunk) => {
//   writeStream.write('\n----CHUNK START---\n');
//   writeStream.write(chunk);
//   writeStream.write('\n----CHUNK END---\n');
// })

// const handleError = () => {
//     console.log('Error');
//     readStream.destroy();
//     writeStream.end('Finished with error');
// }
//
// readStream
//     .on('error', handleError)
//     .pipe(compressStream)
//     .pipe(writeStream)
//     .on('error', handleError);
//
//
//
// readStream.pipe(writeStream);

// Server

const http = require('http');

const PORT = 3000;

const server = http.createServer((req, res) => {
    console.log('Server request');
    console.log(req.url, req.method);

    // res.setHeader('Content-type', 'html');

    // res.write('<!DOCTYPE html>\n' +
    //     `<html>\n
    //     <body>\n
    //     \n
    //     <div style="width: 100px; height: 100px; background-color: red"></div>
    //     \n
    //     <h1>My First Heading</h1>\n
    //     \n
    //     <p>My first paragraph.</p>\n
    //     \n
    //     </body>\n
    //     </html>\n`);
    const data = JSON.stringify([
        {name: 'Tom', age: 35},
        {name: 'John', age: 40},
    ])
    res.end(data);
});

server.listen(PORT, 'localhost', (error) => {
    error ? console.log(error) : console.log('Listening port 3000');
})