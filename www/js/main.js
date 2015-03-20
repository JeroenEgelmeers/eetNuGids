var idOfPreviousPage = null;

$(document).ready(function(e)
{
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
	 $('#mailButton').on('click',function(){
       window.location.href = "mailto:support@eetnu.zendesk.com?body=Uw%20vraag%20of%20opmerking."; 
    });
	 $('#callButton').on('click',function(){
       window.location.href = "tel:06123456"; 
    });
});