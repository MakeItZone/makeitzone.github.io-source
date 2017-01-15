Title:	Website Updates- the getting serious edition.md
date:	1/1/2017
tags:	web, business
Series:	Website Dev

[TOC]


Right now the website is a pain to update, and definitely not beginner friendly.

So as they say on Futurama, *time to kick it up a notch*!

# Goals #
**For Collaborators**

* Continuous Integration (automatically update the published website when the source is updated)
* Simplify deployment
* make online editing possible

**For Business**

* add banner logo
* add sections for major services
* declutter sidebar
* add a forum
* add a wiki

Adding a forum and wiki will be covered in [another post]({filename}/Behind the Scenes/Setting up a Discourse Forum.md)

## For Collaborators ##

All of these goals are being achieved by splitting the source (markdown files, images, etc) from the generated website.

Many [pelican] static blogs are hosted via Github. By some clever usage of `git` the source and generated site are kept in different branches of teh same repository. 

However, this is a bit of a *subversion* (yes, bad pun for the dev geeks): usually branches are for different versions of the same thing. This setup breaks that expectation. The generated output is usually *force pushed*, overwriting any other changes.

It's another thing to remember, and makes it much harder to explain to people new to version control. 

Googling for [pelican] and CI (continuous integration) lead to these great guides:

* [How to automatically build your Pelican blog and publish it to Github Pages][zonca]
* [Publish your Pelican blog on Github pages via Travis-CI][leplatre]
* [Deploy Website by Pelican, Travis CI, and GitHub Pages][siongui]

The [first article][zonca] suggests splitting the pelican site into *two* `git` repositories. One for the source code, and one for the generated website.

Face-palm time ;-). Much simpler. Collaborators can just use [github]'s web editing in the source repo, on the default `master` branch. [Travis] will see the changes, generate the website content, and upload it to the right place in another repo. The updated content will be served up by [github]. Collaborators can go to this 'output' repository and see the generated content- they won't have to switch branches.

So the process will be:

::uml::
start
:push update to source git repository;
:Travis CI sees change, rebuilds static website;
:Travis CI pushes newly generated website to publishing git repository;
:updates are live;
stop
::end-uml::

But there is a big security problem: how to securely authorize [travis] to access our [github] repositories?

This is handled automatically for the source repository when you activate [travis] for a given [github] repository. As part of the process [travis], with your permission, asks [github] for a 'token'. This token imbues [travis] with the authority to add itself to the list of services notified when there are changes to your source repository. It also gives [travis] permission to access and download the source code of your repository... not really needed in this case, as the repository is public. But that's how [travis] can work with private [github] repositories. You can verify this- go to your [github] repo's settings, and look under "Integrations and Services". You'll see [travis] listed. You can remove the token, and revoke [travis]'s access.

But we have a second repository: where the generated website is published to!

We can use [github] to generate an access token for the destination repository. [Travis] get's all of it's configuration and data from the `.travis.yml` file. So simple: put the token in the `.travis.yml` file. But that's publicly viewable- anyone can read that file and hence get access to push *anything* to your public website!

Thankfully the [travis] team thought of this. Instead, you can use 


The later ones have some explanations about how to protect security tokens in the config files. Good to read and understand.


[pelican]: https://github.com/getpelican/pelican
[github]: https://github.com
[travis]: https://travis-ci.org
[zonca]: https://zonca.github.io/2013/09/automatically-build-pelican-and-publish-to-github-pages.html
[leplatre]: http://blog.mathieu-leplatre.info/publish-your-pelican-blog-on-github-pages-via-travis-ci.html
[siongui]: https://siongui.github.io/2016/01/05/deploy-website-by-pelican-travis-ci-github-pages/