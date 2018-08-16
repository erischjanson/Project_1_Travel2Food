$(document).ready(function(){

  //update firebase settings
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

//bringing back firebase values into the browser
database.ref().on("value", function(snapshot){

  var destCity=snapshot.val().destCity;
  var destCityText=$("<h2>").text("Destination: " + destCity);

  var originCityOne=snapshot.val().originCityOne;
  var originCityOneText=$("<h5>").text("Leaving from: " + originCityOne);  

  var friendOne = snapshot.val().friendOne;
  var friendOneText = $("<h4>").text(friendOne);


  var friendTwo=snapshot.val().friendTwo; 
  var friendTwoText=$("<h4>").text(friendTwo);

  var originCityTwo=snapshot.val().originCityTwo; 
  var originCityTwoText=$("<h5>").text("Leaving from: " + originCityTwo);

  var beginDate = snapshot.val().beginDate;
  var beginDateText=$("<h5>").text("Departing: " + beginDate);
 
  var endingDate=snapshot.val().endingDate;
  var endingDateText=$("<h5>").text("Returning: " + endingDate);

  $(".search-values").empty();
  $(".search-values").append(destCityText, beginDateText, endingDateText, friendOneText, originCityTwoText, friendTwoText, originCityOneText);
  

})



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
  $(this).attr("checked", true);
  $(".cities").not(this).attr("checked", false);
});
}

cityListener();


$(".checkPrice").on("click", function(){
    $(".hide").css("visibility", "visible");
    var searchLocation = $("input[name='cities']:checked").val()
    var destCity = searchLocation;    
    
    var originCityOne = $("#origin1").val().trim();
    var originCityTwo = $("#origin2").val();
    
    var beginDate= $("#startDate").val();
    var endingDate= $("#endDate").val();

    var flightToken = "j6zsnkhds33fg325xmwfkckc";
    
    var flightSearchOne = "https://cors-anywhere.herokuapp.com/api.hotwire.com/v1/tripstarter/air?apikey=" + flightToken + "&origin=" + originCityOne + "&dest=" + destCity + "&startdate=" + beginDate + "&enddate=" + endingDate + "&format=json";
    var flightSearchTwo = "https://cors-anywhere.herokuapp.com/api.hotwire.com/v1/tripstarter/air?apikey=" + flightToken + "&origin=" + originCityTwo + "&dest=" + destCity + "&startdate=" + beginDate + "&enddate=" + endingDate + "&format=json";
    
    var friendOne = $("#friend1").val();
    var friendTwo = $("#friend2").val();

    //saving variable values to firebase 
    database.ref().set({
      originCityOne: originCityOne,
      originCityTwo: originCityTwo,
      destCity: destCity,
      beginDate: beginDate,
      endingDate: endingDate,
      friendOne: friendOne,
      friendTwo: friendTwo
    });
    

    var printNameOne = $(".appendNameOne").text(friendOne);
    var printNameTwo = $(".appendNameTwo").text(friendTwo);
    
      $.ajax({
        url: flightSearchOne,
        method: "GET"
      }).done(function(response) {
          

        var printPriceOne = response.Result[i].AveragePrice;   
        console.log("ummmmmmmm");  
     
        var printOne = $(".appendPriceOne").text("Price: $" + printPriceOne + "0");
       
        

             // for (var i = 0; i < 5; i++) {
             //    var lowestPrice = response.Result[i].AveragePrice;
             // }
        

      });

      $.ajax({
        url: flightSearchTwo,
        method: "GET"
      }).done(function(responsetwo) {
        

        var printPriceTwo = responsetwo.Result[i].AveragePrice;        
     
        var printTwo = $(".appendPriceTwo").text("Price: $" + printPriceTwo + "0");

        });

      

  //empties previous search results
  $(".food-info").empty();
  $(".wiki").empty();

var wikiImageUrl;
var searchLocation = $("input[name='cities']:checked").val();


if(searchLocation==="paris"){
  wikiImageUrl = "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Seine_and_Eiffel_Tower_from_Tour_Saint_Jacques_2013-08.JPG/1280px-Seine_and_Eiffel_Tower_from_Tour_Saint_Jacques_2013-08.JPG";
  
} else if(searchLocation==="barcelona"){
  wikiImageUrl = "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/14-08-06-barcelona-RalfR-314.jpg/1024px-14-08-06-barcelona-RalfR-314.jpg";
  
} else if(searchLocation==="rome"){
  wikiImageUrl = "https://upload.wikimedia.org/wikipedia/commons/d/d6/St_Peter%27s_Square%2C_Vatican_City_-_April_2007.jpg";
  
}

var upperCaseSearchLocation = $("<h1>").text(searchLocation.toUpperCase());
var wikiImage = $("<img>").attr("src", wikiImageUrl);

$(".wiki").prepend(upperCaseSearchLocation, wikiImage);

var category = "rest";
var queryUrl = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?categories=" + category + "&limit=5&location=" + searchLocation + "";

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

  var restaurantName = json.businesses[i].name;  
  var restaurantText = $("<h3>").text(restaurantName);  

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