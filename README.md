# liri-node-app_KAB
* Boot Camp UCDSAC20180507FSF Homework #10
* Portfolio: https://kbyard.github.io/

## LIRI: Language Interpretation & Recognition Interface
LIRI is a command line node application that takes in parameters and gives back data. It is similar to Apple's SIRI, except it is a "Language Interpretation and Recognition Interface" instead of a "Speech Interpretation and Recognition Interface".

## Commands
LIRI will return data for four commands:

### my-tweets
Parameter: Twitter Username (API Key). Will return last 20 tweets and information on when they were created in the terminal/bash window.

### spotify-this-song
Parameter: Song Title. Will log information about the artist, title, and album and return a preview link of the song from Spotify. If no parameters are passed, LIRI will default to "The Sign" by Ace of Base.

### movie-this
Parameter: Movie Title. Will log information about the title, year, IMBD rating, Rotten Tomatoes rating, country, language, plot, and actors. If no parameters are passed, LIRI will default to "Mr. Nobody".

### do-what-it-says
Parameter: "random.txt" file. Will take the text inside of "random.txt" and use it to call one of LIRI's other commands.