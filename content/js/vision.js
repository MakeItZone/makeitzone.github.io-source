$(function() {
	//some helper functions
	function randomNumber(min, max){
		return Math.floor(Math.random() * (1 + max - min) + min);
	}

	function rangeToPercent(number, min, max){
	    return ((number - min) / (max - min));
	}


	function createTextAnims( ids ) {
		var results = {};

		$.each(ids, function( index, value ){
			var quote = $(value),
				mySplitText = quote.splitText({ 'type':'words',
												'justSplit':false}),
				entryTl = new TimelineMax().pause(),
				exitTl = new TimelineMax().pause(),
				words = mySplitText.children(".word-measure"),
				numWords = words.length;

			TweenLite.set(quote, {transformPerspective:600, perspective:300, transformStyle:"preserve-3d", autoAlpha:1});

			//intro sequence
			//reset the quote to normal position
			entryTl.set(words,{z:0, opacity:1}, 0)
			entryTl.set(quote,{rotationY:0, rotationX:0}, 0);

			for(var i = 0; i < numWords; i++){
			  entryTl.from(words[i], 1.5, {z:randomNumber(-500,300), opacity:0, rotationY:randomNumber(-40, 40)}, Math.random()*1.5);
			}
			entryTl.from(quote, entryTl.duration(), {rotationY:180, transformOrigin:"50% 75% 200", ease:Power2.easeOut}, 0);

			//reset the quote to normal position
			entryTl.to(words, 0.5, {z:0, opacity:1}, "reset_end")
			entryTl.to(quote, 0.5, {rotationY:0, rotationX:0}, "reset_end");

			//add explode effect
			exitTl.set(words, {z:0, opacity:1, rotation:0, rotationX:0, rotationY:0});
			for(var i = 0; i < numWords; i++){
			  exitTl.to(words[i], 0.6, {z:randomNumber(100, 500), opacity:0, rotation:randomNumber(360, 720), rotationX:randomNumber(-360, 360), rotationY:randomNumber(-360, 360)}, Math.random()*0.2);
			}

			results[value] = {entryTl: entryTl, exitTl: exitTl};

		});

		return results;

	}

	var anims = createTextAnims( ['#p0st', '#p1st', '#p2st', '#p3st', '#p4st']);

// Scene control
	var controller = new ScrollMagic.Controller(
		{
			globalSceneOptions: {
				triggerHook: 0.1
			}
		}
	);

	var sceneDir = "";

	function triggerAnim(anim) {
		if(sceneDir == "FORWARD") {
			anim.progress(0);
			anim.play();
		} else
		{
			anim.progress(1);
			anim.reverse();
		}
	}


	function sceneCB (event) {
		sceneDir = event.scrollDirection;
	}

	// create scene to pin and link animation
	var scene = new ScrollMagic.Scene({
			triggerElement: "#pinContainer",
			triggerHook: "onLeave",
			duration: $(window).height()*5,
			tweenChanges: false
		})

	scene.on("progress", sceneCB);


	// define movement of panels
	var wipeAnimation = new TimelineMax();
	
	// set up initial slide
	// call() at time 0 seems to never get fired on replays.
	wipeAnimation
		.call( triggerAnim, [anims['#p0st'].entryTl], this, "+=0.5");

	// don't method chain with call 'this' seems to be the wrong thing.
	wipeAnimation.call( triggerAnim, [anims['#p0st'].exitTl, scene], this, "+=2");

	wipeAnimation
		.set("#p1", {z:150})
		.fromTo("#p1", 2, {x: "-100%", opacity: 0, rotationY: -180}, {x: "0%", opacity:1, rotationY:0, ease: Linear.easeNone}, "-=0.5")  // in from left
		.to("#p1",.5, {z:0})
	wipeAnimation.call( triggerAnim, [anims['#p1st'].entryTl], this)
	wipeAnimation.call( triggerAnim, [anims['#p1st'].exitTl, scene], this, "+=2");

	wipeAnimation
		.set("#p2", {z:150})
		.fromTo("#p2", 2, {x: "100%", opacity: 0, rotationY: 180}, {x: "0%", opacity:1, rotationY:0, ease: Linear.easeNone}, "-=0.5")  // in from right
		.to("#p2",.5, {z:0})
	wipeAnimation.call( triggerAnim, [anims['#p2st'].entryTl], this)
	wipeAnimation.call( triggerAnim, [anims['#p2st'].exitTl, scene], this, "+=2");

	wipeAnimation
		.set("#p3", {z:150})
		.fromTo("#p3", 2, {y: "-100%", opacity: 0, rotationX: -180}, {y: "0%", opacity:1, rotationX:0, ease: Linear.easeNone}, "-=0.5")  // in from top
		.to("#p3",.5, {z:0})
	wipeAnimation.call( triggerAnim, [anims['#p3st'].entryTl], this)
	wipeAnimation.call( triggerAnim, [anims['#p3st'].exitTl, scene], this, "+=2");

	wipeAnimation
		.set("#p4", {z:150})
		.fromTo("#p4", 2, {y: "100%", opacity: 0, rotationX: 180}, {y: "0%", opacity:1, rotationX:0, ease: Linear.easeNone}, "-=0.5")  // in from bottom
		.to("#p4",.5, {z:0})
	wipeAnimation.call( triggerAnim, [anims['#p4st'].entryTl], this)
	wipeAnimation.call( triggerAnim, [anims['#p4st'].exitTl, scene], this, "+=2");

	wipeAnimation
		.set("#p4", {z:0, rotationX:0, y:0, opacity:1}, "+=2");

	// create scene to pin and link animation
	scene
		.setPin("#pinContainer", {pushFollowers: true})
		.setTween(wipeAnimation)
//		.addIndicators() // add indicators (requires plugin)
		.addTo(controller);


	TweenMax.staggerTo(".bouncy", 5, {scale:1.25, autoAlpha:0, repeat:-1, yoyo:true}, 0.25);
	// window resize stuff
	$(window).resize(function(){
		$("#pinContainer").height($(window).height()-60);
	});

	$(window).trigger('resize');

	// reveal when all is loaded and ready to go
	$("#pinContainer").css('visibility', 'visible');

});
