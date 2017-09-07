var stuffINeed = require("./keys.js");
var fs = require('fs');
var twitter = require('twitter');
var spotify = require('spotify');
var request = require('request');

var updateRequests = function(data) {
    fs.appendFile("requests.txt", JSON.stringify(data), function(err) {
        if (err) {
            return console.log(err);
        } else {
            console.log("requests updated")
        }
    });
}

var findArtist = function(artist) {
    return artist.name;
};

var spotify = function (songTitle) {
    spotify.search({type: 'track, query: songTitle'}, function (err, input){
        if (err) {
            console.log('error' + err);
            return;
        }

        var songs = input.tracks.items;
        var input = [];

        for (var i = 0; i < songs.length; i++) {
            input.push({
                'artist(s)': songs[i].artist.map(music),
                'song name': songs[i].name,
                'preview song': songs[i].preview_url,
                'album': songs[i].album.name
            });
        }
        console.log(input);
        updatedRequests(input);
    });
};

var getTweets = function() {
  var client = new twitter(stuffIneed.twitterKeys);

  var params = { screen_name: 'SoMantastic', count: 10 };

  client.get('statuses/user_timeline', params, function(error, tweets, response) {

    if (!error) {
      var data = []; //empty array to hold data
      for (var i = 0; i < tweets.length; i++) {
        data.push({
            'created at: ' : tweets[i].created_at,
            'Tweets: ' : tweets[i].text,
        });
      }
      console.log(data);
      writeToLog(data);
    }
  });
};

var movie = function(movieTitle) {
    var url = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=full&tomatoes=true&r=json";

    request(url, function(err, response, body){
        if (!error && response.statusCode == 200) {
            var input = [];
            JSON.parse(body);
            
            input.push({
                'Title: ' : jsonData.Title,
                'Year: ' : jsonData.Year,
                'Rated: ' : jsonData.Rated,
                'IMDB Rating: ' : jsonData.imdbRating,
                'Country: ' : jsonData.Country,
                'Language: ' : jsonData.Language,
                'Plot: ' : jsonData.Plot,
                'Actors: ' : jsonData.Actors,
                'Rotten Tomatoes Rating: ' : jsonData.tomatoRating,
                'Rotton Tomatoes URL: ' : jsonData.tomatoURL,
            });
            console.log(input);
            updateRequests(input);
        }
    })
}

