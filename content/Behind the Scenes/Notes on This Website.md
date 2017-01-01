Title: (Initial) Notes on This Website
date: 27/03/2016
tags: web, business
Series: Website Dev

[TOC]

*Update:* These are the *original* notes; look for newer articles to see how things have changed.

## Introduction

Wondering how this website has been put together? Or why certain things are as they are? Then this is the article for you!

Like any project, it's good to be clear on the: *what*, *why*, and *who*. The *how* is (usually) less important; that's the journey (fun!) part, and likely to change as you go along.

**What**: a business website, that also supports growing a community.

**Why**: to attract the target market and engage them in the sales process.

**Who**: parents looking for STEAM related courses for their children, adults looking for STEAM corses for themselves, and people looking for fabrication services.

And a couple of *hows*: cheap hosting, and make the implementation (source code) available for people to learn from. These are less important.

From there goals start to become clearer:

* works on computers, tablets, and phones
* includes social networks (Facebook, Twitter)
* tidy, clear layout
* has 'sales' pages (more static), and 'community' pages (blog posts, project writeups, etc)
* use plain web technologoies rather than a turn-key service like [SquareSpace](http://squarespace.com)
* I don't like "writing" in html. To many tags to take care of/get in the way. 

## Decisions

### Hosting

[GitHub](http://github.com). They provide free static file hosting, [that's ok to use for commercial purposes](http://webapps.stackexchange.com/questions/56898/am-i-allowed-to-host-a-commerical-website-on-github-pages)

### Frameworks

It's a waste of time managing links between your own html files, manaully updating files with style changes, etc. Luckily there are several *static site generator* tools that take care of this for you. Examples include [Octopress](http://octopress.org) and [Pelican][pelican]. I choose the later because it has the plugins I wanted, and I like python.

[Pelican] also supports [markdown](https://daringfireball.net/projects/markdown/)- which is a great way of writing for the web (and other places too.)

For layout (CSS), [bootstrap][bs] can be added. This provides responsive layouts that will reshape themselves based on the screen size.

### Access to Source Code

You can find the source code for this website on our [<i class="fa fa-github-alt fa-md"></i>Github page](https://github.com/makeitzone).

Feel free to learn from or copy the *engine* (the javascript, html, css, python,... ) powering this site. But please don't just cut and copy the *content* (text, pictures, videos, etc)- thanks!

## Specific Tasks

### Parallax and Other Animations

I wanted some (simple) animation on the home page.

[Parallax](https://en.wikipedia.org/wiki/Parallax) is effective, and not to hard to understand. 

I started with this [Parallax with Jquery](http://untame.net/2013/04/how-to-integrate-simple-parallax-with-twitter-bootstrap/) tutorial, and got that to work inside Pelican.

But then I discovered [ScrollMagic](http://scrollmagic.io/). Read the tutorials on their GitHub page. They're not complete, but there's enough there, along with their examples, to figure it out pretty quickly.

### Embedding YouTube

Google makes it pretty easy: [iFrame player](https://developers.google.com/youtube/player_parameters#Overview).

Problems arise when you try and embed it in a responsive design- where the size of the box the video is in can change after the page is loaded.

I found [this](https://css-tricks.com/NetMag/FluidWidthVideo/Article-FluidWidthVideo.php) great article describing the problem, and a couple of solutions. I adapted the javascript solution. It needed some fixes (things change), and it worked really well... except when the window started small. I couldn't quickly see how to trigger the javascript that calculates the aspect ratio after Bootstrap has completed re-arranging the columns.

Then I discovered [Bootstrap's responsive embed](http://getbootstrap.com/components/#responsive-embed). It's not as technically refined (doesn't handle non standard aspect ratios), but it works, and is really easy to use.

### Embedding Google Calendar

Just go to the settings of a Google calendar and you'll find an option that will give you the html you need to embed it in your own web page.

But it doesn't play nice with responsive layouts (noticing a theme?)

An easy fix is documented [here](https://thomas.vanhoutte.be/miniblog/make-google-calendar-iframe-responsive/comment-page-1/#comment-4132).

### Embedding a Twitter Timeline

It's built in with Pelican/Pelican plugins.

And the twitter widget is already responsive- horay! (Not surprising- Bootstrap is from Twitter!) BUT at the extreme, just before the columns re-arrange themselves, it 'pops out' of my sidebar.

It's only a little, but it's noticeable.

In this case, a really fast hack: add `overflow='scroll'` to the containing div. The Twitter sidebar get's slightly truncated at the extreme, but it's still usable, and looks ok.

### Embedding a Facebook page

I'm not a big fan of Facebook- but that's where a large section of our target market is.

They make it very easy to include a [Facebook page plugin](https://developers.facebook.com/docs/plugins/page-plugin).

But it's explicitly not responsive(!)

Attempt one at making it work in the sidebar lead to [this article](http://www.praxis.net.au/blog/making-the-facebook-page-plugin-responsive/). It clearly describes what has to be done, and provides example javascript code.

As I understand things after reading that article and [parts of the Facebook javascript SDK docs](https://developers.facebook.com/docs/reference/javascript/FB.XFBML.parse), the layout is pre-calcuated server side. And you don't get regular HTML, but a Facebook XML data blob that has to be rendered by a script running in the browser.

And that didn't work for me; I kept getting errors related to [CORS](https://en.wikipedia.org/wiki/Cross-origin_resource_sharing).  When the script I copied above from tried to reload the data from Facebook it was blocked. It may work if not hosted on `localhost`- but I couldn't find any concrete confirmation of this. 

But how does it work when the page is first loaded? My guess is that the Facebook javascript API loads and renders the data when it is loaded. The SDK code is being loaded from facebook.com, and CORS is setup so that it works. As soon as I call the Facebook SDK from my script, the origin is set as `localhost`.

I tried turning off CORS in my browser, and that really blew up. Turns out this was used to [hack peoples accounts](https://en.wikipedia.org/wiki/Self-XSS).

Attempt 2: I need to cause the data to be reloaded, but the script doing it has to be from an approved domain. And I don't want to be limited where my site is hosted for testing or deployment.

Solution: Create a small wrapper html page that just contains the Facebook page plugin. Embed that in an `iframe`. Forcing the `iframe` to reload it's source after the page is resized causes the Facebook SDK to be reloaded- re-rendering the page plugin. Here's how to [reload an iframe](http://stackoverflow.com/questions/86428/whats-the-best-way-to-reload-refresh-an-iframe-using-javascript).

It's wasteful and annoying- but it works. Hopefully browser caching makes it a little less horrible.

### Collecting Feedback - UserReport

I wanted to make it easy for people to give feedback- corrections, ideas, whatever.

I found [UserReport](https://www.userreport.com). It's free and easy to setup.

The only problem I had was figuring out how to adjust the location of the pop-up button; it defaults to vertically centered, on the left; right in the article text. I started going down the route of [creating a custom feedback control](https://userreport.zendesk.com/hc/en-us/articles/202514568-Custom-Feedback-Forum-buttons-and-links)... and then discovered [you can change the position of the feeback button](https://userreport.zendesk.com/hc/en-us/articles/202510928-Change-position-of-Feedback-button). I wish all the feeedback button related options where in one place, rather than in two.

### Live Messaging

People like immediate feedback. We can remove a step (clicking and launching an email, waiting for a response) by adding live messaging to the site.

The Facebook page plugin already includes this for Facebook messenger. The Twitter plugin sort-of does as well.

But both of these don't make direct communication the main *call to action*. They really want you to look at the content they have and go to their websites.

I added a direct *"talk to me"* call to action at the bottom of the page via [smooch]. They have a very reasonable free tier, and it was trivial to integrate. I've hooked it up to [Slack]. And if no one responds, then the viewer has the option of leaving their email for later follow up. [Smooch] can also be hooked up to SMS and voice calls, eg via [Twilio](https://www.twilio.com).

The only down-side was how the integration works in [Slack]: each incoming customer chat creates it's own chat room in [slack]. It makes sense, but it means [Smooch] has to have pretty wide access and control of your [Slack] team. My solution: create a new [Slack] team specifically for use with [Smooch]. This leaves the original [Slack] team 'safer' for community use.


## References

Here's a list of pages I found helpful.

* [Pelican docs](http://docs.getpelican.com)
* [Pelican plugins](https://github.com/getpelican/pelican-plugins)
* [using more than one Pelican theme](http://stackoverflow.com/questions/29691258/how-do-i-use-more-than-one-pelican-theme-simultaneously)
* [tags vs categories](http://pirsquared.org/blog/pelican-tags-vs-categories.html)
* [Pelican bootstrap theme](https://github.com/DandyDev/pelican-bootstrap3)
* [Fontawesome icon search](http://fontawesome.io/icons/)
* [Bootstrap CSS docs](http://getbootstrap.com/css)
* [Jinja template engine docs](http://jinja.pocoo.org/docs/dev/templates)
* [jQuery selectors](http://www.w3schools.com/jquery/jquery_ref_selectors.asp)
* [Bootstrap Navbar tutorial](https://bootstrapbay.com/blog/bootstrap-tutorial-navbar/)

[pelican]: https://github.com/getpelican/pelican
[bs]: http://getbootstrap.com/
[smooch]: https://smooch.io/
[slack]: https://slack.com/