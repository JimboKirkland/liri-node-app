var keys = require("./keys.js");
var Twitter = require("twitter");
var Spotify = require("node-spotify-app");
var request = require("request");
var fs = require("fs");


var spotify = new Spotify ({
	id: "0a204716afae4ba39c53763c42c56ecf",
	secret: "83e0d483294648258e89be905108936e"
});




// ********* TWITTER ********** //

var getTweets = function(tweets) {
	var client = new Twitter(keys.twitterKeys);

	var paramaters = {
		screen_name: "IntheDZone"
	};
	client.get("statuses/user_timeline", paramaters, function(error, tweets, response) {
		if (!error) {
			for (var i = 0; i < tweets.length; i++) {
				console.log(tweets[i].created_at);
				console.log("");
				console.log(tweets[i].text);
			}
		}
	});
};




// ******** SPOTIFY ********* //

var getSpotify = function(songName) {
	if (songName === undefined) {
		songName = "The Sign"
	}

	spotify.search(
	{
		type: "track",
		query: songName
	},
	function(err, data) {
		if (err) {
			console.log("Error occurred: " + err);
			return;
		}

		var songs = data.tracks.items;

		for (var i = 0; i < songs.length; i++) {
			console.log(i);
			console.log("Artist: " + songs[i].artists.map(getArtistNames));
			console.log("Song: " + songs[i].name);
			console.log("Preview: " + songs[i].preview_url);
			console.log("Album: " + songs[i].album.name);
			}
		}
	);
};




// ********* OMDB ************ //

var getMovie = function(movieName) {
	if (movieName === undefined) {
		movieName = "Mr Nobody";
	}

	var url = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=full&tomatoes=true&apikey=trilogy";

	request(url, function(error, response, body) {
		if (!error && response.statusCode === 200) {
			var jsonData = JSON.parse(body);

			console.log("Title: " + jsonData.Title);
			console.log("Year: " + jsonData.Year);
			console.log("Rated: " + jsonData.Rated);
			console.log("IMDB Rating: " + jsonData.imdbRating);
			console.log("Country: " + jsonData.Country);
			console.log("Language: " + jsonData.Language);
			console.log("Plot: " + jsonData.Plot);
			console.log("Cast: " + jsonData.Actors);
		}
	});
};



var doThis = function(thisThing) {

}


var action = function(caseData, functionData) {
	switch (caseData) {
		case "my-tweets":
			getTweets();
			break;
		case "spotify-this-song":
			getSpotify();
			break;
		case "movie-this":
			getMovie();
			break;
		case "do-what-it-says":
			doThis();
			break;
		default:
			console.log("Sorry. I didn't get that.");
	}
};


var nodeRun = function(argv1, argv2) {
	pick(argv1, argv2);
};


nodeRun(process.argv[2], process.argv[3]);







