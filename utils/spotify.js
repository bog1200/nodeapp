require('dotenv').config();
const SpotifyWebApi = require('spotify-web-api-node');
const spotifyApi = new SpotifyWebApi({
    clientId: process.env.SPOTIFY_ID,
    clientSecret: process.env.SPOTIFY_KEY
  });
  spotifyApi.clientCredentialsGrant().then(
    function(data) {
      // Save the access token so that it's used in future calls
      spotifyApi.setAccessToken(data.body['access_token']);
      console.log("[Spotify] API Successfully connected!")
    },
    function(err) {
      console.log('[Spotify] Something went wrong when retrieving an access token', err);
    }
  );
  setInterval(() =>
  {
    spotifyApi.clientCredentialsGrant().then(
      function(data) {
        // Save the access token so that it's used in future calls
        spotifyApi.setAccessToken(data.body['access_token']);
        console.log('[Spotify] The access token has been refreshed!');
      },
      function(err) {
        console.log('[Spotify] Could not refresh access token', err);
      }
    );
  },3600000);
module.exports.spotifyApi=spotifyApi;