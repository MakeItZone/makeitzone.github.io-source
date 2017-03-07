$(function() {
	$('#bodycontainer').YTPlayer({
	    fitToBackground: true,
	    videoId: '-MOZwQ_8mv8',
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
            triggerElement: "#printing_trigger",
            offset: 50
        })
	 	//.addIndicators() // add indicators (requires plugin)
        .addTo(controller)
        .triggerHook("onCenter")
        .setTween(TweenMax.from("#taz_1", 2, {scale: 0, ease: Elastic.easeOut, delay: 0.5}));

	 new ScrollMagic.Scene({
            triggerElement: "#printing_trigger",
            offset: 50
        })
	 	//.addIndicators() // add indicators (requires plugin)
        .addTo(controller)
        .triggerHook("onCenter")
        .setTween(TweenMax.from("#taz_2", 2, {scale: 0, ease: Elastic.easeOut, delay: 1}));


	 new ScrollMagic.Scene({
            triggerElement: "#design_trigger",
            offset: 0
        })
	 	//.addIndicators({name:"design"}) // add indicators (requires plugin)
        .addTo(controller)
        .triggerHook("onCenter")
        .setTween(TweenMax.from("#design", 2, {scale: 0, ease: Elastic.easeOut, delay: 0.5}));

	 new ScrollMagic.Scene({
            triggerElement: "#edu_trigger",
            offset: 0
        })
	 	//.addIndicators({name:"education"}) // add indicators (requires plugin)
        .addTo(controller)
        .triggerHook("onCenter")
        .setTween(TweenMax.from("#education", 2, {scale: 0, ease: Elastic.easeOut, delay: 0.5}));

	 new ScrollMagic.Scene({
            triggerElement: "#consultation_trigger",
            offset: 0
        })
	 	//.addIndicators({name:"consultation"}) // add indicators (requires plugin)
        .addTo(controller)
        .triggerHook("onCenter")
        .setTween(TweenMax.from("#consultation", 2, {scale: 0, ease: Elastic.easeOut, delay: 0.5}));

    // reveal the 'pop' icons
    $(".pop").each(function(i) { $(this).css({"visibility":"visible"})});

});