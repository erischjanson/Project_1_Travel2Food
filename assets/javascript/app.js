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

  /*

As a first step, submit button should trigger the ajax call which will grab top five restaurants from yelp api. can use
"sort_by" as a parameter: e.g.: best_match, rating, review_count or distance. By default it's best_match.
input should be set as the search term


*/

//var queryUrl = "https://api.yelp.com/v3/businesses/search?term=events&location=rome&limit=5";
//var access_token = "4Gcp5w7HgWd4HIzEY0Mfb6VH9V5yjQK9euP2xTJhP5bsWVb8lSSx_gBkD39QAzNKzDYRD9zrcXWEJHwLfH08S9_71BpWtEWtWT0n036LPCIwk3qFa1Gzc_s59TRaWnYx";
//onclick event for the submit button
$(".checkPrice").on("click", function(){


//ajax call
//as of now, there is no input button for the destination. By default, it is Rome. Thus, no need to grab the value of the input on submit.
var searchLocation = "Rome";
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
  var restaurantName = json.businesses[i].name;
  var price = json.businesses[i].price;
  var rating = json.businesses[i].rating;
  var restaurantImageUrl = json.businesses[i].image_url;
  var restaurantLink = json.businesses[i].url;
  console.log("Rating: " + rating);
  console.log("Price: " + price);
  console.log("Restaurant: " + restaurantName);
  console.log(restaurantImageUrl);
  console.log(restaurantLink);
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

