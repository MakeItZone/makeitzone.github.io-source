Title: New Years Day 2017 Updates
date: 1/1/2017
tags: web, business
Series: Website Dev

[TOC]

## Goals

As they say on Futurama, *time to kick it up a notch*!

**For Collaborators**

* Continuous Integration (automatically update the published website when the source is updated)
* Simplify deployment
* make online editing possible

**For Business**

* add banner logo
* add sections for major services
* declutter sidebar
* add a forum

## For Collaborators ##

All of these goals are being achieved by splitting the source (markdown files, images, etc) from the generated website.

Many [pelican] static blogs are hosted via Github. By some clever usage of `git` the source and generated site are kept in different branches of teh same repository. 

However, this is a bit of a *subversion* (yes, bad pun for the dev geeks): usually branches are for different versions of the same thing. This setup breaks that expectation. The generated output is usually *force pushed*, overwriting any other changes.

It's another thing to remember, and makes it much harder to explain to people new to version control. 

Googling for [pelican] and CI (continuous integration) lead to these great guides:

* <https://zonca.github.io/2013/09/automatically-build-pelican-and-publish-to-github-pages.html>
* <http://blog.mathieu-leplatre.info/publish-your-pelican-blog-on-github-pages-via-travis-ci.html>
* <https://siongui.github.io/2016/01/05/deploy-website-by-pelican-travis-ci-github-pages/>

The first one suggests splitting the pelican site into *two* `git` repositories. One for the source code, and one for the generated website.

Face-palm time ;-). Much simpler. Collaborators can just use [github]'s web editing in the source repo, on the default `master` branch. [Travis] will see the changes, generate the website content, and upload it to the right place in another repo. The updated content wil be served up by [github]. Collaborators can go to this 'output' repository and see the generated content- they won't have to switch branches.

The later ones have some explanations about how to protect security tokens in the config files. Good to read and understand.

## Adding a Forum ##

Took a quick look at:

* [NodeBB](https://nodebb.org): Canadian, looks great, but costly
* [Flarum](http://flarum.org/): Looks really good, but it's beta at this point
* [Discourse](http://www.discourse.org): One of the earlier "new gen" forums, opensource, supported, integration with other services, eg login providers

Discourse it is.

### Setting up Discourse ###

**Needs**

* VPS Linux server
    - eg [Linode], [Digital Ocean][do]
* EMail (smtp) service

**References**

* <http://www.discourse.org>
* [Setup Discourse on Linode][onlinode]
* [Installing Discourse on Digital Ocean][ondo]

#### SMTP Service ###
The [Digital Ocean setup guide][ondo] suggests [SparkPost][sp]. Free for <100k email messages. Done!

[SparkPost] doesn't have explicit instructions for [Hover], the DNS provider I use, but it wasn't too difficult. 

One catch: to get my account verified I had to do the email verification. It appeared to be optional, but my sending domain wasn't approved after ~30minutes. So I tried to do an email verification. Unfortunately [SparkPost] will only send verification messages to `abuse@domain` or `postmaster@domain`. This required me buying an extra forward-only email address at [Hover]. And that's where I hit a snag- [Hover] doesn't appear to provide a way for creating email addresses for subdomains... and I'd tried to set this up as `forummail.makeit.zone`. I'd hoped to keep things seperate in case I made mistake. Quick fix- recreate the 'sending domain' at [SparkPost] for the bare `  makeit.zone` domain. I realized that I needn't have been concerned; this is only allowing it to act as an SMTP sender, and has nothing to do with recieving (the `MX` record) email for my domain. 

So after creating the sending domain for `makeit.zone` it was easy to add the `SPF` and `DKIM` DNS `txt` records, and send the verification email.

### Linode/VPS ###

[Linode] was created by a bunch of devs, and is still privately owned. And if you listen to podcasts (eg [ATP](http://atp.fm)), or Google search, you should be able to find a discount code.

Setting up a virtual node was really easy- choose a server size (smallest), Linux distribution, set a root password and start it up.

While it was booting I added an `DNS` `A` record back at hover for `forum.makeit.zone`.

Once booted, you need to install Docker- an application container system for which there's a ready to go [Discourse] package. Yes, it's virtualization ontop of virtualization.

I followed the [official Docker guide](https://docs.docker.com/engine/installation/linux/ubuntulinux/#/install-the-latest-version) for installation on the Linode server.







[pelican]: https://github.com/getpelican/pelican
[github]: https://github.com
[travis]: https://travis-ci.org
[linode]: http://welcome.linode.com
[do]: https://www.digitalocean.com
[sp]: https://www.sparkpost.com
[onlinode]: http://crunchify.com/how-to-setup-discourse-org-forum-on-linode-correct-way-tested-and-verified-steps/
[ondo]: https://www.digitalocean.com/community/tutorials/how-to-install-discourse-on-ubuntu-16-04
[hover]: http://hover.com
[discourse]: http://www.discourse.org