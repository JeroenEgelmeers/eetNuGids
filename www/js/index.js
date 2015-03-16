Storage.prototype.setObject = function (key, value)     { this.setItem(key, JSON.stringify(value)); }

Storage.prototype.getObject = function (key) {
    var value   = this.getItem(key);
    return value && JSON.parse(value);
}

$("#saveForm").on("submit", function()
{
    var name        = $("#name").val();
    var nameAtr1    = $("#name1").val();
    var valueAtr1   = $("#value1").val();
    var nameAtr2    = $("#name2").val();
    var valueAtr2   = $("#value2").val();

    var dataObject  = {
        name    : name,
        name1   : nameAtr1,
        value1  : valueAtr1,
        name2   : nameAtr2,
        value2  : valueAtr2 
    };

    window.localStorage.setObject(name, dataObject);

    $(this).find("input").each(function(){ $(this).val(''); });

    window.location.reload();

    return false;
});

loadLocalStorage = function ()
{   
    var dataObject;
    var numOfItems  = 0;
    $("#custom-list").html('');
    for (var i = 0; i < window.localStorage.length; i++){
        try
        {
            dataObject  = window.localStorage.getObject(window.localStorage.key(i));

            if (!dataObject || !dataObject.name) { continue; }

            $("#custom-list").append('<li><a href="#' + dataObject.name + '" data-transition="slide">' + dataObject.name + '</a> <a href=\'#\' onclick=\'window.localStorage.setObject("' + dataObject.name + '", null); loadLocalStorage(); return false;\'>Verwijder</a></li>');

            $("#home").after(
                '<div data-role="page" id="' + dataObject.name + '">' +
                    '<div data-role="header">' +
                    '<img onclick="$.mobile.changePage(\'#watched\', {transition: \'slide\',reverse: true});" style="float: left; padding:6px; height: 30px; width: 30px;" src="nacho.png">' +
                    '<h1>Nacho Time!</h1>' +
                '</div>' +
                '<div data-role="main" class="ui-content">' +
                    '<p>Gegevens over: <b>' + dataObject.name + '</b></p>' +
                    '<table>' +
                        '<tr>' +
                            '<td>' + dataObject.name1 + '</td>' +
                            '<td>' + dataObject.value1 + '</td>' +
                        '</tr>' +
                        '<tr>' +
                            '<td>' + dataObject.name2 + '</td>' +
                            '<td>' + dataObject.value2 + '</td>' +
                        '</tr>' +
                    '</table>' +
                    '<p><a href="#watched" data-transition="slide" data-direction="reverse">Terug naar lijst met gekeken films, series &amp; tekenfilms</a></p>' +
                '</div>' +
                '<div data-role="footer"  data-position="fixed">' +
                        '<h1>' + dataObject.name + '</h1>' +
                    '</div>' +
                '</div>'
            );
            numOfItems++;
        } catch (e)         {}
    }
    if (numOfItems === 0)   { $("#custom-list").html('<p>Er zijn nog geen gekeken films, series of tekenfilms.</p>'); }
}

loadLocalStorage();

$(document).on("pagebeforecreate", "#scroll", function(e, ui)
{
  var items     = '';
  for (var i = 1; i < 20; i++)      { items += "<li>" + i + "</li>"; }

  $("#list").append(items);
});


checkScroll     = function ()
{
  var activePage    = $.mobile.pageContainer.pagecontainer("getActivePage"),
    screenHeight    = $.mobile.getScreenHeight(),
    contentHeight   = $(".ui-content", activePage).outerHeight(),
    header          = $(".ui-header", activePage).outerHeight() - 1,
    scrolled        = $(window).scrollTop(),
    footer          = $(".ui-footer", activePage).outerHeight() - 1,
    scrollEnd       = contentHeight - screenHeight + header + footer;

  if (activePage[0].id == "scroll" && scrolled >= scrollEnd) { addMore(activePage); }
}

addMore     = function (page)
{
  $(document).off("scrollstop");
  $.mobile.loading("show");

  setTimeout(function() 
  {
    var items   = '',
      last      = $("li", page).length,
      cont      = last + 10;
    for (var i = last; i < cont; i++)   { items += "<li>" + i + "</li>"; }

    $("#list", page).append(items).listview("refresh");
    $.mobile.loading("hide");
    $(document).on("scrollstop", checkScroll);
  }, 500);
}

$(document).on("scrollstop", checkScroll);