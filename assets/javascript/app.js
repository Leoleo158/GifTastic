$(document).ready(function() {

// var and array creation
var topics = ["Poe", "Obi-Wan Kenobi", "Anakin", "Fives", "Captain Rex", "Droids" , "X-Wing", "Darth Vader", "First Order"]
var results;



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
    var giphyURL = "api.giphy.com/v1/gifs/search?api_key=tFIrfDgnTZVlaQOQdtqFaZ2q2WuLkeg1";
}
// Use document on click function to apply function for elements AFTER the page has loaded

// ANIMATE GIFS


});