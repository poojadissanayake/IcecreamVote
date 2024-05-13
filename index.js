// The package for the web server
const express = require('express');
// Additional package for logging of HTTP requests/responses 
const morgan = require('morgan');
const app = express(); 
const port = 3000;
// Include the logging for all requests
app.use(morgan('common'));
// Tell our application to serve all the files under the `public_html` directory
app.use(express.static('public_html'));
// ******************************************** // *** Other route/request handlers go here *** // ********************************************

let likes = 0;
let dislikes = 0;
let now = new Date();

app.get('/votelike', function (request, response) {
    likes++;

    let responseMessage = `
    <html>
        <head><title>Vote Like</title></head>
        <body>
            <p>Hello!</br> Likes count as of ${now} is: ${likes}</p>
            <a href="/">Back to Main Page</a>
        </body>
    </html>`;
    response.send(responseMessage);
});

app.get('/votedislike', function (request, response) {
    dislikes++;

    let responseMessage = `
    <html>
        <head><title>Vote Like</title></head>
        <body>
            <p>Hello! </br> Dislike count as of ${now} is: ${dislikes}</p>
            <a href="/">Back to Main Page</a>
        </body>
    </html>`;
    response.send(responseMessage);
});

// NOTE: This is not a real handler and should never be used in 
// production... it is only here to demonstrate you have a valid 
// 500 error handler.
app.get('/forceerror', (req, res) => {
    console.log('Got a request to force an error...');
    let f; // empty variable
    // Will cause an error as f doesn't have a method called nomethod() 
    console.log(`f = ${f.nomethod()}`);
});

app.use((req, res) => {
    res.status(404).send('404: File not found');
});

//err - to catch error
app.use((err, req, res, next) => {
    console.error(err.stack); // Log error stack to console
    res.status(500).send("500 - Internal Server Error. Something broke!");
});


// Tell our application to listen to requests at port 3000 on the localhost
app.listen(port, () => {
    // When the application starts, print to the console that our app is 
    // running at http://localhost:3000. Print another message indicating 
    // how to shut the server down.
    console.log(`Web server running at: http://localhost:${port}`);
    console.log(`Type Ctrl+C to shut down the web server`);
})