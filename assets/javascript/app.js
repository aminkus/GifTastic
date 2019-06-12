



$("#add-animal").on("click", function (event) {
    event.preventDefault();

    var animalName = $("#animal-input").val().trim();

    var animalButton = $("<button>");
    animalButton.attr("data-animal", animalName);
    animalButton.text(animalName);
    animalButton.on('click', buttonClickHandler);

    $("#buttons-view").prepend($("<span />  <span />"))
    $("#buttons-view").prepend(animalButton);
});


// Adding click event listen listener to all buttons
function buttonClickHandler() {


    var animal = $(this).attr("data-animal");


    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        animal + "&api_key=XwIc7lS2ENJSqxeTPzFYYEKPnYGpaBld&limit=10";


    $.ajax({
        url: queryURL,
        method: "GET"
    })

        .then(function (response) {

            var results = response.data;


            for (var i = 0; i < results.length; i++) {


                var animalDiv = $("<div>");


                var p = $("<p>").text("Rating: " + results[i].rating);


                var animalImage = $("<img>");

                animalImage.attr("src", results[i].images.fixed_height.url);
                animalImage.on('click', playPauseFunction);


                animalDiv.append(p);
                animalDiv.append(animalImage);

                $("#animal-view").prepend(animalDiv);
            }
        });
}

function playPauseFunction(event) {
    event.preventDefault();

    console.log(event);
}