function showMailingPopUp() {
    require(["mojo/signup-forms/Loader"], function(L) { L.start({"baseUrl":"mc.us11.list-manage.com","uuid":"e7d9c81bd9494f262a332a6ae","lid":"7fa9b9a5c8"}) })
    document.cookie = "MCEvilPopupClosed=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
};

$(function() {
    // reveal the 'pop' icons
	$(".pop").each(function(i) { $(this).css({"visibility":"visible"})});
	TweenMax.staggerFromTo(".pop", 2, {rotation:-15, scale:0}, {rotation:0, scale:1, ease: Elastic.easeOut}, 0.5);

    
    $(".mailchimp").click(function() {showMailingPopUp()});


});