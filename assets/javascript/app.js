$(document).ready(function() {

// var and array creation
var topics = ["Poe", "Obi-Wan Kenobi", "Anakin", "Fives", "Captain Rex", "Droids" , "X-Wing", "Darth Vader", "First Order"];
var gifResults;

// API "https://api.giphy.com/v1/gifs/search?q=api_key=knycUBcf7bb34RCBk950ZIfJKqS20sQb"

//function to make buttons

function makeButtons(){
    $('#got-buttons').empty();

    for(i = 0; i < topics.length; i++){
        var Btn = $('<button>');

        Btn.addClass('character-btn');
        Btn.attr('data-name', topics[i]);
        Btn.text(topics[i]);

        $('#got-buttons').append(Btn);


    }
}

// on-click event

$('#characterAdd').on('click', function(){

    event.preventDefault();

    var character = $('#get-input').val().trim();

    //push new elements that the user adds into topics array
    topics.push(character);

    $('#get-input').val('');
    
   
    
});
//call function to make buttons
makeButtons();

//FUNCTION FOR GRABBING GIPHY API CONTENT
function gifPull(){
    //pull characterName
    var characterName = $(this).attr('data-name');
    var characterString = characterName.split('').join("+");
    //call giphyURL
    var giphyURL = "https://api.giphy.com/v1/gifs/search?q=" + characterString + "&api_key=knycUBcf7bb34RCBk950ZIfJKqS20sQb&limit=10";
    
    //links API key with ajax so we can get a response with data
    $.ajax ({
        URL: giphyURL,
        method: "GET"
    }).done(function(response){
        
        //log to the console response and GiphyURL
        console.log(response);

        console.log(giphyURL);
        //displays the results from giphy server
        gifResults = response.data;
        //empties old gif entries
        $('gifs').empty();
        
        //create vars to pull rating and gif data and diplay it to gifs div also looks through results
    //for loop to go through results data
    for( var i = 0; i < gifResults.length; i++){
        
        //creat a div for the character
        var characterDiv = $('<div>')
        //use p tag to diplay rating to the DOM and concatenate results
        var ratingPar = $("<p class='gifRating'>").text( "Rating:" + gifResults[i].rating);
        //create a var that will diplay the img on the DOM
        var resultImage = $("<img>");

       
        ratingPar.addClass('ratingParameter');
        
        
        //add class to resultsImage and tie in src and results data to show in the DOM
        resultImage.addClass('gifs-image');
         resultsImage.attr("src", gifResults[i].images.fixed_height_still.url);
       
         //initialize "still gif"
        resultsImage.attr('data-state', 'still');
        resultsImage.attr('data-position', i);

        //append the rating parameter and resultsImage to the DOM
        characterDiv.addClass('single-gifs');
        characterDiv.append(ratingPar);
        characterDiv.append(resultImage);

        //prepend gifs before the charaterDiv to show gif in that div
        $('#gifs').prepend(characterDiv);
    }; //ends the for loop    

    }); //Ends AJAX
}
// Use document on click function to apply function for elements AFTER the page has loaded
$(document).on('click' , gifPull);
// ANIMATE GIFS

function animate(){
    var state = $(this).attr('data-state');

    //To return a string
    var position = $(this).attr('data-position'); 
    
    //change string to integer

    position = parseInt(position);

    //if/else statement to start animation of gif
    if( state === 'still'){
        $(this).attr('src', gifResults[position].images.fixed_height_still.url);
        $(this).attr('data-state', 'animate');
    } else {
        $(this).attr('src', gifResults[position].images.fixed_height_still.url);
        $(this).attr('src', 'still');
    }
};
//document.ready 
$(document).on('click', '.gifs-image', animate);

});