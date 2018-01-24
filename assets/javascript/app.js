$(document).ready(function(){
$(".hide").css("visibility", "hidden");
var config = {
   apiKey: "AIzaSyCV5hb3_Ky3kv8z_N0L63A4-fNMmJHKnNM",
   authDomain: "travel-fund.firebaseapp.com",
   databaseURL: "https://travel-fund.firebaseio.com",
   projectId: "travel-fund",
   storageBucket: "",
   messagingSenderId: "959467319333"
 };
 firebase.initializeApp(config);

var database = firebase.database();

//calendar

var today = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
        $("#startDate").datepicker({
            uiLibrary: 'bootstrap4',
            iconsLibrary: 'fontawesome',
            minDate: today,
            maxDate: function () {
                return $('#endDate').val();
            }
        });
        $('#endDate').datepicker({
            uiLibrary: 'bootstrap4',
            iconsLibrary: 'fontawesome',
            minDate: function () {
                return $('#startDate').val();
            }
        });
        $("#startDate").on("change", function (){
            console.log($("#startDate").val());
        })
  


function cityListener(){

$(".cities").on("click", function(){
  $(".hide").css("visibility", "visible");
  $(this).attr("checked", true);
  $(".cities").not(this).attr("checked", false);
  //var userCity = $(this).val();
 //console.log(userCity);
});
}

cityListener();


$(".checkPrice").on("click", function(){
    var searchLocation = $("input[name='cities']:checked").val()
    var destCity = searchLocation;
    console.log(destCity);
    
    var originCityOne = $("#origin1").val();
    var originCityTwo = $("#origin2").val();
    

    var beginDate= $("#startDate").val();
    var endingDate= $("#endDate").val();
    var flightToken = "j6zsnkhds33fg325xmwfkckc";
    
    var flightSearchOne = "https://cors-anywhere.herokuapp.com/api.hotwire.com/v1/tripstarter/air?apikey=" + flightToken + "&origin=" + originCityOne + "&dest=" + destCity + "&startdate=" + beginDate + "&enddate=" + endingDate + "&format=json";
    var flightSearchTwo = "https://cors-anywhere.herokuapp.com/api.hotwire.com/v1/tripstarter/air?apikey=" + flightToken + "&origin=" + originCityTwo + "&dest=" + destCity + "&startdate=" + beginDate + "&enddate=" + endingDate + "&format=json";
    

    var friendOne = $("#friend1").val();
    var friendTwo = $("#friend2").val()
    

    var printNameOne = $("#appendNameOne").text(friendOne);
    var printNameTwo = $("#appendNameTwo").text(friendTwo);
    
      $.ajax({
        url: flightSearchOne,
        method: "GET"
      }).done(function(response) {
          console.log(response)

        var printPriceOne = response.Result[i].AveragePrice;
        console.log(printPriceOne);
     
        var printOne = $("#appendPriceOne").text(printPriceOne);
       
        

             // for (var i = 0; i < 5; i++) {
             //    var lowestPrice = response.Result[i].AveragePrice;
             // }
        

      });

      $.ajax({
        url: flightSearchTwo,
        method: "GET"
      }).done(function(responsetwo) {
          console.log(responsetwo)

        var printPriceTwo = responsetwo.Result[i].AveragePrice;
        console.log(printPriceTwo);
     
        var printTwo = $("#appendPriceTwo").text(printPriceTwo);

        });

      

  //empties previous search results
  $(".food-info").empty();
  $(".wiki").empty();

var wikiImageUrl;
var searchLocation = $("input[name='cities']:checked").val();
console.log("city: " + searchLocation);

if(searchLocation==="paris"){
  wikiImageUrl = "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Seine_and_Eiffel_Tower_from_Tour_Saint_Jacques_2013-08.JPG/1280px-Seine_and_Eiffel_Tower_from_Tour_Saint_Jacques_2013-08.JPG";
  
} else if(searchLocation==="barcelona"){
  wikiImageUrl = "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/14-08-06-barcelona-RalfR-314.jpg/1024px-14-08-06-barcelona-RalfR-314.jpg";
  
} else if(searchLocation==="rome"){
  wikiImageUrl = "https://upload.wikimedia.org/wikipedia/commons/d/d6/St_Peter%27s_Square%2C_Vatican_City_-_April_2007.jpg";
  
}


console.log(upperCaseSearchLocation);
var upperCaseSearchLocation = $("<h1>").text(searchLocation.toUpperCase());
var wikiImage = $("<img>").attr("src", wikiImageUrl);
console.log(wikiImageUrl);
$(".wiki").prepend(upperCaseSearchLocation, wikiImage);

var category = "rest";
var queryUrl = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?categories=" + category + "&limit=5&location=" + searchLocation + "";
//console.log(queryUrl);

const access_token = "4Gcp5w7HgWd4HIzEY0Mfb6VH9V5yjQK9euP2xTJhP5bsWVb8lSSx_gBkD39QAzNKzDYRD9zrcXWEJHwLfH08S9_71BpWtEWtWT0n036LPCIwk3qFa1Gzc_s59TRaWnYx";

let myHeaders = new Headers();
myHeaders.append("Authorization", "Bearer " + access_token);

fetch(queryUrl, {
  headers: myHeaders 
}).then((res) => {
  return res.json();
}).then((json) => {
  console.log(json);

  //create for loop to iterate over the response
  for (var i=0; i<json.businesses.length; i++){


    //if (results[i].rating !== "r" && results[i].rating !== "pg-13")-use this if no rating, etc available
  var foodDiv =$("<div class='food'>");
  console.log(foodDiv);
  var restaurantName = json.businesses[i].name;
  console.log(restaurantName);
  var restaurantText = $("<h3>").text(restaurantName);
  console.log(restaurantText);

  var price = json.businesses[i].price;
  var priceText=$("<p>").text("Price: " + price);

  var rating = json.businesses[i].rating;
  var ratingText=$("<p>").text("Rating: " + rating);

  var restaurantImageUrl = json.businesses[i].image_url;
  var restaurantImage=$("<img>").attr("src", restaurantImageUrl);
  var restaurantLink = json.businesses[i].url;
  $(".food-info").append(restaurantImage, restaurantText, priceText, ratingText);

  }

});


})


});