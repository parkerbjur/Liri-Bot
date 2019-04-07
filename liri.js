require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require("node-spotify-api")
var spotify = new Spotify(keys.spotify);
var axios = require("axios");
let moment = require("moment")
const fs = require("fs")

function findFunction (verb, noun){
    switch (verb) {
        case "concert-this":
            concertThis(noun)
            break;
        case "spotify-this-song":  
            spotifyThisSong(noun)
            break;
        case "movie-this":
            movieThis(noun);
            break;
        case "do-what-it-says":
            doWhatItSays();
            break;
        default:
            break;
    }
}


function concertThis (artist) {
    axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp")
        .then(function(response){
            let data = response.data
            for(i=0; i < data.length; i++){
                console.log(`Venue Name: ${data[i].venue.name}\nVenue Location: ${data[i].venue.city}\nDate: ${moment(data.datetime).format("MM/DD/YY")}\n\n------------\n`)
            }
            //console.log(moment(response.data.datetime).format('MMMM Do YYYY, h:mm:ss a'))
        });
}

function spotifyThisSong (song) {
    spotify.search({type: "track", query: `${song}`}, function(err, data){
        if(err){
            console.log(err)
        }
        for(i=0; i < 1; i++){
            console.log("artist: " + data.tracks.items[i].album.artists[0].name)
            console.log("album: " + data.tracks.items[i].album.name)
            console.log("preview: " + data.tracks.items[i].external_urls.spotify)
        }
    })
}

function movieThis (movie){
    axios.get("https://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy")
    .then(function(response){
        let data = response.data
        console.log(`title: ${data.Title}\nrelease year: ${data.Year}\nIMDB: ${data.Ratings[0].Value}\nRotten Tomatoes: ${data.Ratings[1].Value}\nCountry: ${data.Country}\nlanguage: ${data.Language}\nPlot: ${data.Plot}\nActors: ${data.Actors}`)
    })
}

function doWhatItSays () {
    fs.readFile("./random.txt", "utf8", function (err, data){
        if(err){
            console.log(err)
        }
        let dataArray = data.split(",");
        findFunction(dataArray[0], dataArray[1])
    })
}

findFunction(process.argv[2], process.argv[3])
