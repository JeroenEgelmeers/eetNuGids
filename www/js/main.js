var idOfPreviousPage = null;

$(document).ready(function(e)
{

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

   	/* could be used for the menu. Will not work together with the swipeupanddown.js
    $(window).on("swipeup", function(e)
	{
		if ($.mobile.activePage.attr("id") === "menu")
		{
				$.mobile.changePage("#" + idOfPreviousPage, {transition: 'slideup'});
				idOfPreviousPage = null;
 		}
    });

    $(window).on("swipedown", function(e)
	{
		if ($.mobile.activePage.attr("id") !== "menu")
		{
 			idOfPreviousPage = $.mobile.activePage.attr("id");
	 	 	$.mobile.changePage("#menu", {transition: 'slidedown'});
 		}
    });*/
});

function nextCatPage(nextPage) {
	$.mobile.changePage('#restaurantCategory', {transition: 'slide'});
	$.getJSON(nextPage
		
	).done(function(data){
			var items = [];
			for (i = 0; i < data.results.length; ++i) {
				//items.add('Naam: '+ String(data.results[i].name) +' <br />');
				items.push('<table width="100%"><tr class="tr_header"><td colspan="2">'+ data.results[i].name +'</td></tr><tr class="tr_content"><td width="50%">Beoordeling:</td><td width="50%">'+ (data.results[i].rating / 10) +'</td></tr><tr class="tr_content"><td>Straat:</td><td>'+ data.results[i].address.street +'</td></tr><tr class="tr_content"><td>Postcode:</td><td>'+ data.results[i].address.zipcode +'</td></tr><tr class="tr_content"><td>Plaats:</td><td>'+ data.results[i].address.city +'</td></tr><tr class="tr_content"><td>Telefoon:</td><td>'+ data.results[i].telephone +'</td></tr></table>');
			}
			$("#insertCategoryInfo").html("");
			$("#insertCategoryInfo").append(items.join(""));
		})
	.fail(function() {
		$("#insertCategoryInfo").html("<p>Controleer uw internet verbinding. Er kan geen data worden opgehaald.</p>")
	});
}

function getByLocation() {
	// https://api.eet.nu/venues?max_distance=5000&geolocation=51.68851,5.28745
	// Max_disatnace (in meters), long/lat
}

