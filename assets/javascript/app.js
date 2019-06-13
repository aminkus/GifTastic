



$("#add-animal").on("click", function (event) {
    event.preventDefault();
    //grabbing user input
    var animalName = $("#animal-input").val().trim();
    //create button for animal user chose
     var animalButton = $("<button>");
    //give button a "data-animal" attribute
    animalButton.attr("data-animal", animalName);
    //put text of animal name onto button
    animalButton.addClass("btn btn-success ml-1 mb-1")
    animalButton.text(animalName);
    //when animal button is clicked run function buttonClick
    animalButton.on('click', buttonClickHandler);

    //put animal button in DOM
    $("#buttons-view").prepend(animalButton);

   
});


// Adding click event listener to all buttons
function buttonClickHandler() {
    
    var animal = $(this).attr("data-animal");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        animal + "&api_key=XwIc7lS2ENJSqxeTPzFYYEKPnYGpaBld&limit=10";


    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {

        var results = response.data;
        console.log(response)

        for (var i = 0; i < results.length; i++) {

            var animalDiv = $("<div>").attr("id", "col-md-2");

            var p = $("<p>").text("Rating: " + results[i].rating.toUpperCase());
            
        
            var animalImage = $("<img>");

            animalImage.attr("src", results[i].images.fixed_height_still.url);
            animalImage.attr('data-still',results[i].images.fixed_height_still.url)
            animalImage.attr('data-animate',results[i].images.fixed_height.url)
            animalImage.attr("data-state", "still")

            animalImage.on('click', playPauseFunction);

            animalDiv.append(p);
            animalDiv.append(animalImage);

            $("#animal-view").prepend(animalDiv);
           
        }
    });
}

function playPauseFunction(event) {
    event.preventDefault();

    var state = $(this).attr("data-state");

    if(state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }
    };







   