$(function() {
	$('#bodycontainer').YTPlayer({
	    fitToBackground: true,
	    videoId: '-AOpfyr6PsI',
	    playerVars: {
			modestbranding: 1,
			autoplay: 1,
			controls: 0,
			showinfo: 0,
			branding: 0,
			rel: 0,
			autohide: 0,
			start: 0
	    }
	});

	controller = new ScrollMagic.Controller({
	    globalSceneOptions: {
	        triggerHook: "onCenter"
	    }
	});

	 new ScrollMagic.Scene({
            triggerElement: "#laser_trigger",
            offset: 50
        })
	 	//.addIndicators() // add indicators (requires plugin)
        .addTo(controller)
        .triggerHook("onCenter")
        .setTween(TweenMax.from("#speedy_1", 2, {scale: 0, ease: Elastic.easeOut, delay: 0.5}));

    // reveal the 'pop' icons
    $(".pop").each(function(i) { $(this).css({"visibility":"visible"})});

});