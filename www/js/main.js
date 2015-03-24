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
	$(".jsonResult").html("Data wordt geladen.. Een moment geduld a.u.b.");
	$.getJSON(nextPage, 
		function(data){
			var items = $();
			var para = $("<p></p>");
			for (i = 0; i < data.results.length; ++i) {
				//items.add('Naam: '+ String(data.results[i].name) +' <br />');
				para.html('Naam: '+ data.results[i].name +' <br />');
			}
			$(".jsonResult").html("");
			$(".jsonResult").append(para);
		}
	);
}


