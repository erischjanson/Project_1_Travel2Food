$(document).ready(function(){
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
  /*

As a first step, submit button should trigger the ajax call which will grab top five restaurants from yelp api. can use
"sort_by" as a parameter: e.g.: best_match, rating, review_count or distance. By default it's best_match.
input should be set as the search term


*/


function cityListener(){

$(".cities").on("click", function(){
  $(this).attr("checked", true);
  $(".cities").not(this).attr("checked", false);
  //var userCity = $(this).val();
 //console.log(userCity);



});
}

cityListener();


$(".checkPrice").on("click", function(){
  //empties previous search results
  $(".food-info").empty();



var searchLocation = $("input[name='cities']:checked").val();
console.log(searchLocation);
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
/*$.ajax({
  url: "https://api.yelp.com/v3/businesses/search?term=events&location=rome&limit=5",
  method:"GET",
  dataType: "json",
  beforeSend: function(xhr){
    xhr.setRequestHeader("Authorization", "BEARER" + access_token);
  },
  success: function(response){

  }
}).done(function(response){
  console.log(response);
});
*/
cityListener();

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
});