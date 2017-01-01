function showMailingPopUp() {
    require(["mojo/signup-forms/Loader"], function(L) { L.start({"baseUrl":"mc.us11.list-manage.com","uuid":"e7d9c81bd9494f262a332a6ae","lid":"7fa9b9a5c8"}) })
    document.cookie = "MCEvilPopupClosed=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
};


$(function() {

	// init controller
	var controller = new ScrollMagic.Controller({globalSceneOptions: {triggerHook: "onCenter"}});

	// build scenes
	new ScrollMagic.Scene({triggerElement: "#childrens_classes", duration: "800%"})
					// .addIndicators()
					.setTween("#childrens_classes_bg", {backgroundPosition: "center 0%", ease: Linear.easeNone})
					.addTo(controller);

	new ScrollMagic.Scene({triggerElement: "#adults_classes", duration: "500%", offset:"-400%"})
					// .addIndicators()
					.setTween("#adults_classes_bg", {backgroundPosition: "center -50%", ease: Linear.easeNone})
					.addTo(controller);

	new ScrollMagic.Scene({triggerElement: "#dwm", duration:0, offset: -100})
	 				// .addIndicators({name:"dwm"}) // add indicators (requires plugin)
        			.triggerHook("onCenter")
        			.setTween(TweenMax.from("#dwm_img", 2, {rotation:-360, scale: 0, ease: Elastic.easeOut, delay: 0.5}))
        			.addTo(controller);


	new ScrollMagic.Scene({triggerElement: "#pwm", duration:0, offset: -100})
	 				// .addIndicators({name:"pwm"}) // add indicators (requires plugin)
        			.triggerHook("onCenter")
        			.setTween(TweenMax.from("#pwm_img", 2, {rotation:-360, scale: 0, ease: Elastic.easeOut, delay: 0.5}))
        			.addTo(controller);


	new ScrollMagic.Scene({triggerElement: "#swm", duration:0, offset: -100})
	 				// .addIndicators({name:"swm"}) // add indicators (requires plugin)
        			.triggerHook("onCenter")
        			.setTween(TweenMax.from("#swm_img", 2, {rotation:-360, scale: 0, ease: Elastic.easeOut, delay: 0.5}))
        			.addTo(controller);

	new ScrollMagic.Scene({triggerElement: "#robdes", duration:0, offset: -100})
	 				// .addIndicators({name:"swm"}) // add indicators (requires plugin)
        			.triggerHook("onCenter")
        			.setTween(TweenMax.from("#robdes_img", 2, {rotation:-360, scale: 0, ease: Elastic.easeOut, delay: 0.5}))
        			.addTo(controller);

	new ScrollMagic.Scene({triggerElement: "#ctw", duration:0, offset: -100})
	 				// .addIndicators({name:"swm"}) // add indicators (requires plugin)
        			.triggerHook("onCenter")
        			.setTween(TweenMax.from("#ctw_img", 2, {rotation:-360, scale: 0, ease: Elastic.easeOut, delay: 0.5}))
        			.addTo(controller);

	new ScrollMagic.Scene({triggerElement: "#future", duration:0, offset: -100})
	 				// .addIndicators({name:"swm"}) // add indicators (requires plugin)
        			.triggerHook("onCenter")
        			.setTween(TweenMax.from("#future_img", 2, {rotation:-360, scale: 0, ease: Elastic.easeOut, delay: 0.5}))
        			.addTo(controller);

	new ScrollMagic.Scene({triggerElement: "#dwmsc", duration:0, offset: -100})
	 				// .addIndicators({name:"dwmsc"}) // add indicators (requires plugin)
        			.triggerHook("onCenter")
        			.setTween(TweenMax.from("#dwmsc_img", 2, {rotation:-360, scale: 0, ease: Elastic.easeOut, delay: 0.5}))
        			.addTo(controller);

	new ScrollMagic.Scene({triggerElement: "#pwmsc", duration:0, offset: -100})
	 				// .addIndicators({name:"pwmsc"}) // add indicators (requires plugin)
        			.triggerHook("onCenter")
        			.setTween(TweenMax.from("#pwmsc_img", 2, {rotation:-360, scale: 0, ease: Elastic.easeOut, delay: 0.5}))
        			.addTo(controller);

	new ScrollMagic.Scene({triggerElement: "#msc", duration:0, offset: -100})
	 				// .addIndicators({name:"msc"}) // add indicators (requires plugin)
        			.triggerHook("onCenter")
        			.setTween(TweenMax.from("#msc_img", 2, {rotation:-360, scale: 0, ease: Elastic.easeOut, delay: 0.5}))
        			.addTo(controller);

	new ScrollMagic.Scene({triggerElement: "#acad", duration:0, offset: -100})
	 				// .addIndicators({name:"acad"}) // add indicators (requires plugin)
        			.triggerHook("onCenter")
        			.setTween(TweenMax.from("#acad_img", 2, {rotation:-360, scale: 0, ease: Elastic.easeOut, delay: 0.5}))
        			.addTo(controller);

	new ScrollMagic.Scene({triggerElement: "#afuture", duration:0, offset: -100})
	 				// .addIndicators({name:"afuture"}) // add indicators (requires plugin)
        			.triggerHook("onCenter")
        			.setTween(TweenMax.from("#afuture_img", 2, {rotation:-360, scale: 0, ease: Elastic.easeOut, delay: 0.5}))
        			.addTo(controller);

	$(".mailchimp").click(function() {showMailingPopUp()});

    // reveal the 'pop' icons
    $(".pop").each(function(i) { $(this).css({"visibility":"visible"})});



});