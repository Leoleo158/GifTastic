$(document).ready(function() {

// var and array creation
var topics = ["Poe", "Obi-Wan Kenobi", "Anakin", "Fives", "Captain Rex", "Droids" , "X-Wing", "Darth Vader", "First Order"]
var gifResults;

// API "https://api.giphy.com/v1/gifs/search?q=api_key=knycUBcf7bb34RCBk950ZIfJKqS20sQb"

//function to make buttons

function makeButtons(){
    // $('#makeBtn').empty();

    for(i = 0; i < topics.length; i++){
        var Btn = $('<button>');

        Btn.addClass('character-btn');
        Btn.attr('name', topics[i]);
        Btn.text(topics[i]);

        $('#makeBtn').append(Btn);


    }
}

// on-click event

$('characterAdd').on('click', function(){
    var character = $('input-text').val().trim();

    //push new elements that the user adds into topics array
    topics.push(character);
    
    //call makeButtons function when characterAdd runs
    makeButtons();
    
});
//call function to make buttons
makeButtons();

//FUNCTION FOR GRABBING GIPHY API CONTENT
function gifPull(){
    //pull characterName
    var characterName = $(this).attr('name');
    var characterString = characterName.split().join();
    //call giphyURL
    var giphyURL = "https://api.giphy.com/v1/gifs/search?q=" + characterString + "&api_key=knycUBcf7bb34RCBk950ZIfJKqS20sQb&limit=10";
    
    //links API key with ajax so we can get a response with data
    $.ajax ({
        URL: giphyURL,
        method: "GET"
    }).done(function(response){
        
        //displays the results from giphy server
        gifResults = response.data;
        //create vars to pull rating and gif data and diplay it to gifs div also looks through results
        $('gifs').empty();

    //for loop to go through results data
    for( var i = 0; i < gifResults; i++){
        
        //creat a div for the character
        var characterDiv = $('<div>')
        //use p tag to diplay rating to the DOM and concatenate results
        var ratingPar = $("<p> 'Rating: '</p>" + gifResults[i].results);
        //create a var that will diplay the img on the DOM
        var resultImage = $("<img>");

        //add classes to the vars to show in html
        characterDiv.addClass('character-info');
        ratingPar.addClass('ratingParameter');
        resultImage.addClass('image');
        //shows the actual Rating: text
        ratingPar.text("Rating: ");
    }    

    })
}
// Use document on click function to apply function for elements AFTER the page has loaded
// ANIMATE GIFS
gifPull();

});