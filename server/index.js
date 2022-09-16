const app = require('express').express();
require('dotenv').config();
const request = require('request');

const PORT = 5000;

const spotifyClientID = process.env.SPORIFTY_CLIENT_ID;
const spotifyClientSecret = process.env.SPORIFTY_CLIENT_SECRET;
global.accessToken = '';

//used for the state value, increased security
function genRandomString(length) {
    let final = '';
    const possible =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++) {
        final += possible[Math.floor(Math.random() * possible.length)];
    }
    return final;
}

app.get('/auth/login', (req, res) => {
    const scope = 'streaming user-read-email user-read-private';

    const state = genRandomString(16);

    const auth_query_parameters = new URLSearchParams({
        response_type: 'code',
        client_id: spotifyClientID,
        scope: scope,
        redirect_uri: 'http://localhost:3000/auth/callback',
        state: state,
    });

    res.redirect(
        'https://accounts.spotify.com/authorize/?' +
            auth_query_parameters.toString()
    );
});

app.get('/auth/callback', (req, res) => {
    const code = req.query.code;

    //guide says we must use this content type, and axios has a problem with that so we use request
    const authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        form: {
            code: code,
            redirect_uri: 'http://localhost:3000/auth/callback',
            grant_type: 'authorization_code',
        },
        headers: {
            Authorization:
                'Basic ' +
                Buffer.from(
                    spotifyClientID + ':' + spotifyClientSecret
                ).toString('base64'),
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        json: true,
    };

    request.post(authOptions, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            const accessToken = body.accessToken;
            res.redirect('/');
        }
    });
});

app.get('/auth/token', (req, res) => {
    res.json({
        accessToken: accessToken,
    });
});

app.listen(PORT, () => {
    console.log(`Listening at http://localhost:${PORT}`);
});
