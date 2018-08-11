// At the top of the "liri.js" file, add code to read and set any environment variables with the dotenv package:
require("dotenv").config();

var fs = require("fs");
var request = require("request");
var Spotify = require("node-spotify-api");
var Twitter = require("twitter");

// Add the code required to import the `keys.js` file and store it in a variable.
var keys = require("./keys.js");

// You should then be able to access your keys information like so
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

// Make it so liri.js can take in one of the following commands:
function goLiri(action, item1) {
	switch (action) {
		// "my-tweets"
		case ("my-tweets"):
			myTweets();
			break;
		// "spotify-this-song"
		case ("spotify-this-song"):
			spotifyThisSong(item1);
			break;
		// "movie-this"
		case ("movie-this"):
			movieThis(item1);
			break;
		// "do-what-it-says"
		case ("do-what-it-says"):
			doWhatItSays();
			break:
		default:
			break;
	}
}
var action = process.argv[2];
var item1 = process.argv[3];

// "node liri.js my-tweets": This will show your last 20 tweets and when they were created at in your terminal/bash window.
function myTweets() {
	var params = {
		user_id: "user_id",
		count: 20,
		lang: "en",
	}
	client.get('statuses/user_timeline', params, function (error, tweets, response) {
		if (!error) {
			tweets.forEach(function (e) {
				console.log(e.text);
			});
		}
	});
}

// "node liri.js spotify-this-song '<song name here>'": This will show the following information about the song in your terminal/bash window
function spotifyThisSong(song_title) {
	// If no song is provided then your program will default to "The Sign" by Ace of Base.
	if (!song_title) {
		song_title = "The Sign";
	}
	spotify.search( {type: 'track', query: song_title, limit: 10 }, function (err, data) {
		if (err) {
			return console.log('Error occurred: ' + err);
		}
		var song;
		data.tracks.items.forEach(function (e) {
			if (e.name.toLowerCase() == song_title.toLowerCase()) {
				if (!song) {
					// Artist(s)
					console.log("Artist name: " + e.artists[0].name);
					// The song's name
					console.log("Song name: " + e.name);
					// A preview link of the song from Spotify
					console.log(e.preview_url);
					// The album that the song is from
					console.log("Album name: " + e.album.name);
					song = e.name;
				}
			}
        });
	});
}

// "node liri.js movie-this '<movie name here>'": This will output the following information to your terminal/bash window:
function movieThis(movie_name) {
	// If the user doesn't type a movie in, the program will output data for the movie "Mr. Nobody".
	if (!movie_name) {
		movie_name = "Mr. Nobody";
	}
	// You'll use the request package to retrieve data from the OMDB API. Like all of the in-class activities, the OMDB API requires an API key. You may use "trilogy".
	request("http://www.omdbapi.com/?t=" + movie_name + "&y=&plot=short&apikey=trilogy", function(error, response, body) {
		var movieInfo = JSON.parse(body);
		if (!error && response.statusCode === 200 && JSON.parse(body)["Response"] === "True") {
			// Title of the movie.
			console.log("Title: " + movieInfo["Title"]);
			// Year the movie came out.
			console.log("Release Year: " + movieInfo["Year"]);
			// IMDB Rating of the movie.
			console.log("IMDB Rating: " + movieInfo["imdbRating"]);
			// Rotten Tomatoes Rating of the movie.
			console.log("Rotten Tomatoes Rating: " + movieInfo["Ratings"][1]["Value"]);
			// Country where the movie was produced.
			console.log("Country: " + movieInfo["Country"]);
			// Language of the movie.
			console.log("Language: " + movieInfo["Language"]);
			// Plot of the movie.
			console.log("Plot: " + movieInfo["Plot"]);
			Actors in the movie.
			console.log("Actors: " + movieInfo["Actors"]);
		}
	});
}

// "node liri.js do-what-it-says": Using the "fs" Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.
function doWhatItSays() {
	// It should run "spotify-this-song" for "I Want it That Way," as follows the text in "random.txt".
	fs.readFile("random.txt", "utf8", function (error, data) {
		if (error) {
			return console.log(error);
		}
		var dataArr = data.split(",");
		var txtAction = dataArr[0];
		var txtSong = dataArr[1];
		goLiri(txtAction, txtSong);
	});
}