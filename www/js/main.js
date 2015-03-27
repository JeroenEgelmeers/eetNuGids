var idOfPreviousPage = null;


var db;

Storage.prototype.setObject = function (key, value)	{ 
	this.setItem(key, JSON.stringify(value)); 
}

Storage.prototype.getObject	= function (key) {
	var value = this.getItem(key);
	return value && JSON.parse(value);
}

loadLocalStorage = function ()
{   
	$("#sort_by").val(window.localStorage.getObject("sort_by"));
	$("#needsReview").val(window.localStorage.getObject("needsReview"));
}


saveSettings = function ()
{
	window.localStorage.setObject("sort_by", $("#sort_by").val());  
	window.localStorage.setObject("needsReview", $("#needsReview").val());

	loadLocalStorage();

	$('#infoBox').html("<p class=\"bg-success\">Instellingen opgeslagen!</p>");
	$("#infoBox").show().delay(5000).fadeOut("slow");
};


$("#changeSettings").click(function (){ saveSettings(); });

$(document).ready(function(e)
{
	loadLocalStorage();

	$.getJSON('https://api.eet.nu/tags?tags=lekker-top100', 
		function(data){
			var items = [];
			var curTag = "lekker-top100%2C";

			for (i = 0; i < data.results.length; ++i) {
				items.push('<li><a href="#" onclick="nextCatPage(\'' + data.results[i].resources.venues + '\'); return false;" class="ui-btn ui-btn-icon-right ui-icon-carat-r">' + data.results[i].name + '</a></li>');
			}
			 
			 $(".jsonResult").html("");

			  $( "<ul/>", {
			    "class": "ui-listview",
			    "data-role": "listview",
			    html: items.join( "" )
			  }).appendTo( ".jsonResult" ); 
		}
	);
	
	$(window).on("swipeleft", function(e)
	{
		if ($.mobile.activePage.attr("id") !== "index" && $.mobile.activePage.attr("id") !== "menu")
		{
			$.mobile.changePage("#" + $.mobile.activePage.next().attr("id"), {transition: 'slide'});
		}
	});

	/* We should not be able to slide to the right side. - TESTING */
	$(window).on("swiperight", function(e)
	{
		if ($.mobile.activePage.attr("id") !== "menu")
		{
 			$.mobile.changePage("#" + $.mobile.activePage.prev().attr("id"), {transition: 'slide', reverse: true});
 		}
    });

    $("#header").toolbar();

    $("#menuBtn").on("tap",function(){

    	if ($.mobile.activePage.attr("id") !== "menu")
    	{
    		idOfPreviousPage = $.mobile.activePage.attr("id");
	 	 	$.mobile.changePage("#menu", {transition: 'slidedown'});
		}
		else
		{
				$.mobile.changePage("#" + idOfPreviousPage, {transition: 'slideup'});
				idOfPreviousPage = null;
		}
	});

	$("#indexBtn").on("tap", function (e)
	{
		$.mobile.changePage('#pickRestaurant', {transition: 'slide'});
	});

	// Modules
	$('#webWebsite').on('click',function(){
       window.location.href = "http://www.eet.nu/"; 
    });
	$('#mailButton').on('click',function(){
       window.location.href = "mailto:support@eetnu.zendesk.com?body=Uw%20vraag%20of%20opmerking."; 
    });
	$('#callButton').on('click',function(){
       window.location.href = "tel:0612345678"; 
    });
});

function nextCatPage(nextPage) {
	$("#insertCategoryInfo").html("<p>Data wordt geladen..");
	$.mobile.changePage('#restaurantCategory', {transition: 'slide'});
	var sortedBy = window.localStorage.getObject("sort_by");
	nextPage = nextPage+"&sort_by="+sortedBy;
	$.getJSON(nextPage
	).done(function(data){
			var items = [];
			for (i = 0; i < data.results.length; ++i) {
				if (window.localStorage.getObject("needsReview") == "on" && data.results[i].rating == 0) {
					// Don't show the item as it has been turned off by the user.
				}else {
					items.push('<table width="100%"><tr class="tr_header"><td colspan="2">'+ data.results[i].name +'</td></tr><tr class="tr_content"><td width="50%">Beoordeling:</td><td width="50%">'+ (data.results[i].rating / 10) +'</td></tr><tr class="tr_content"><td>Straat:</td><td>'+ data.results[i].address.street +'</td></tr><tr class="tr_content"><td>Postcode:</td><td>'+ data.results[i].address.zipcode +'</td></tr><tr class="tr_content"><td>Plaats:</td><td>'+ data.results[i].address.city +'</td></tr><tr class="tr_content"><td>Telefoon:</td><td><a href="tel:'+ data.results[i].telephone +'">'+ data.results[i].telephone +'</a></td></tr></table>');
				}
			}
			$("#insertCategoryInfo").html("");
			$("#insertCategoryInfo").append(items.join(""));
	}).fail(function() {
		$("#insertCategoryInfo").html("<p>Controleer uw internet verbinding. Er kan geen data worden opgehaald. Mits uw internet verbinding stabiel is kan het zijn dat we momenteel geen gegevens op kunnen halen. Probeer het later nog eens.</p>")
	});
}

function showRestaurantsFound(nextPage) {
	$.mobile.changePage('#restaurantOnLocationFound', {transition: 'slide'});
	$.getJSON(nextPage
	).done(function(data){
			var items = [];
			for (i = 0; i < data.results.length; ++i) {
				//items.add('Naam: '+ String(data.results[i].name) +' <br />');
				items.push('<table width="100%"><tr class="tr_header"><td colspan="2">'+ data.results[i].name +'</td></tr><tr class="tr_content"><td width="50%">Beoordeling:</td><td width="50%">'+ (data.results[i].rating / 10) +'</td></tr><tr class="tr_content"><td>Straat:</td><td>'+ data.results[i].address.street +'</td></tr><tr class="tr_content"><td>Postcode:</td><td>'+ data.results[i].address.zipcode +'</td></tr><tr class="tr_content"><td>Plaats:</td><td>'+ data.results[i].address.city +'</td></tr><tr class="tr_content"><td>Telefoon:</td><td>'+ data.results[i].telephone +'</td></tr></table>');
			}
			$("#foundRestaurants").html("");
			$("#foundRestaurants").append(items.join(""));
	}).fail(function() {
		$("#foundRestaurants").html("<p>Controleer uw internet verbinding. Er kan geen data worden opgehaald. Mits uw internet verbinding stabiel is kan het zijn dat we momenteel geen gegevens op kunnen halen. Probeer het later nog eens.</p>")
	});
}
$("#searchInKilometers").click(function() {
	 $("#foundRestaurants").html("<p>Data wordt geladen.. Een moment geduld a.u.b..");
	//geolocation
	setTimeout(function()
	{
		var geo_options = {
		enableHighAccuracy: true, 
		maximumAge : 3000,
		timeout : 60000
		};

		navigator.geolocation.getCurrentPosition(onSuccessGeo, onErrorGeo, geo_options);
	}, 0);
});

function onSuccessGeo (position)
 {
    var distLat = position.coords.latitude;
    var distLon = position.coords.longitude;
    var distance = $("#kilometers").val();
    var sortedBy = window.localStorage.getObject("sort_by");
    distance = (distance * 1000);
   	showRestaurantsFound("https://api.eet.nu/venues?max_distance="+distance+"&geolocation="+distLat+","+distLon+"&sort_by="+sortedBy);
}

// onError Callback receives a PositionError object //
function onErrorGeo (error)
{
    alert('Geocode: '    + error.code    + '\n' +
          'message: ' + error.message + '\n');
}