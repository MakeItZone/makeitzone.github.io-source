Title:	Website Updates- the Getting Serious Edition
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

## Background ##

Many [pelican] static blogs are hosted via Github. By some clever usage of `git` the source and generated site are kept in different branches of the same repository. 

However, this is a bit of a *subversion* (yes, bad pun for the dev geeks): usually branches are for different versions of the same thing. This setup breaks that expectation. The generated output is usually *force pushed*, overwriting any other changes.

It's another thing to remember, and makes it much harder to explain to people new to version control. 

That's how this website (was) generated.

Googling for [pelican] and CI (continuous integration) lead to these great guides:

* [How to automatically build your Pelican blog and publish it to Github Pages][zonca]
* [Publish your Pelican blog on Github pages via Travis-CI][leplatre]
* [Deploy Website by Pelican, Travis CI, and GitHub Pages][siongui]

The [first article][zonca] suggests splitting the pelican site into *two* `git` repositories. One for the source code, and one for the generated website.

Face-palm time ;-). Much simpler. Collaborators can just use [github]'s web editing in the source repo, on the default `master` branch. [Travis] will see the changes, generate the website content, and upload it to the right place in another repo. The updated content will be served up by [github]. Collaborators can go to this 'output' repository and see the generated content- they won't have to switch branches.

So the publishing process will be:

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

Thankfully the [travis] team thought of this. They provide a `ruby` tool, called `travis` that will let you add private data as an encrypted blob inside the `.travis.yml` file. So the data is still stored publicly, but only the [travis] system can decrypt it and turn it into something useful! The data is stored as `environment` vairiables that will be available from the build script. Be careful though- even the environment variable name is encrypted.

## Process ##

### Split Source and Destination Repos ###

So the first thing to be  done: split the source (markdown files, images, etc) from the generated website.

This is very easy if you don't need to keep the repository history. Just create a new repository on [github] and copy over the content. 



### Configuring Travis ###
[Travis] does things right, and keeps you honest.

Every time [travis] builds your website it creates a brand new, clean, virtual computer/container with just the basic OS and some typical development packages. You then have to add any extra software your build needs, then get the source code and build it.

It is a little slower, but it stops the "builds on my computer" arguments before they can get started.

[Travis] offers a few different OSs and versions to choose from, including Debian and OS X.

To deploy this website I'm using an Ubuntu based setup.

A couple of articles worth reading about the flavours of Ubuntu available:

* [Container-based Ubuntu Trusty in Public Beta](https://blog.travis-ci.com/2016-11-08-trusty-container-public-beta)
* [The Trusty beta Build Environment](https://docs.travis-ci.com/user/trusty-ci-environment)

The above will give you enough information to set the `sudo` and `dist` settings in the `.travis.yml` file.

Next you want to add the extra packages your application needs.

There are lists of packages available for the Ubuntu build containers on [github](https://github.com/travis-ci/apt-package-whitelist), and [instructions](https://docs.travis-ci.com/user/installing-dependencies) for how to install them.

Now would be a good time to review how to [customize the build](https://docs.travis-ci.com/user/customizing-the-build). 

The `before_install` step can be used to install any other applications your build needs. 

The `install` step is where you install any language libraries your application uses.

In this case I used the `before_install` to download [plantuml], and `install` calls a script that I created to install all the `Python` packages required.

Getting the build to work is pretty straight forward: add the next section/stop to `.travis.yml`, watch [travis] execute it, fix issues, carry on.

Once it's building correctly you need to have [travis] push the generated website files to the publishing repository on [github].

To do that you need to [generate an access token for github](https://help.github.com/articles/creating-an-access-token-for-command-line-use/) and use the `travis` command to add an encrypted version of the token to your `.travis.yml` file. 

I found [Zonca's][zonca] guide to cover this clearly. While you're there, copy his `deploy.sh` script.

Everything should now be good to go: you check in a new file and magically the website gets regenerated and published... or it will after you debug everything.

Here's what my `.travis.yml` ended up looking like:
[git:repo=MakeItZone/makeitzone.github.io-source,file=.travis.yml,type=yaml,branch=master,hash=0674082]

You can see the deployment and other scripts on [github](https://github.com/MakeItZone/makeitzone.github.io-source).

### Final Clean Up ###
To save future confusion, delete the `source` branch from the repo that holds the published static files:

```bash
git branch -d source
git push origin :source
```


[pelican]: https://github.com/getpelican/pelican
[github]: https://github.com
[travis]: https://travis-ci.org
[zonca]: https://zonca.github.io/2013/09/automatically-build-pelican-and-publish-to-github-pages.html
[leplatre]: http://blog.mathieu-leplatre.info/publish-your-pelican-blog-on-github-pages-via-travis-ci.html
[siongui]: https://siongui.github.io/2016/01/05/deploy-website-by-pelican-travis-ci-github-pages/
[plantuml]: http://plantuml.com