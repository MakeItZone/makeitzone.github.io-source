Title:	Setting up a Discourse Forum
date:	1/1/2017
tags:	web, business
Series:	Website Dev

[TOC]

## Goals

Set up an online forum and wiki for MakeItZone.

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
The [Digital Ocean setup guide][ondo] suggests [SparkPost]. Free for <100k email messages. Done!

[SparkPost] doesn't have explicit instructions for [Hover], the DNS provider I use, but it wasn't too difficult. 

One catch: to get my account verified I had to do the email verification. It appeared to be optional, but my sending domain wasn't approved after ~30minutes. So I tried to do an email verification. Unfortunately [SparkPost] will only send verification messages to `abuse@domain` or `postmaster@domain`. This required me buying an extra forward-only email address at [Hover]. And that's where I hit a snag- [Hover] doesn't appear to provide a way for creating email addresses for subdomains... and I'd tried to set this up as `forummail.makeit.zone`. I'd hoped to keep things seperate in case I made mistake. Quick fix- recreate the 'sending domain' at [SparkPost] for the bare ` makeit.zone` domain. I realized that I needn't have been concerned; this is only allowing it to act as an SMTP sender, and has nothing to do with recieving (the `MX` record) email for my domain. 

So after creating the sending domain for `makeit.zone` it was easy to add the `SPF` and `DKIM` DNS `txt` records, and send the verification email.

### Linode/VPS ###

[Linode] was created by a bunch of devs, and is still privately owned. And if you listen to podcasts (eg [ATP](http://atp.fm)), or Google search, you should be able to find a discount code.

Setting up a virtual node was really easy- choose a server size (at least 4096 for [discourse]; I tried 2048 and had to restart the process), Linux distribution, set a root password and start it up. 

While it was booting I added an `DNS` `A` record back at [Hover] for `forum.makeit.zone`.

### Docker ###

Once booted, you need to install Docker- an application container system for which there's a ready to go [Discourse] package. Yes, it's virtualization ontop of virtualization.

I followed the [official Docker guide](https://docs.docker.com/engine/installation/linux/ubuntulinux) for installation on the Linode server.

And that's when things went sideways. Turns out there are bugs. So for Ubuntu 16.04, read [this thread](https://github.com/docker/docker/issues/23347) first.

Then you can continue on with the official docker installation.

`docker ps` is useful!

### Discourse ###

**Resources**

* [Guide to installing on Linode][onlinode]
* [Guide to installing on Digital Ocean][ondo]

Overall, [Discourse] was pretty easy to install, but with a few bumps. You need to pay attention to the results of running the initial configuration script. I had some network timeouts and parts didn't complete correctly. This happened once or twice more when calling `launcher rebuild`.

I couldn't get the initial admin account confirmation email to send.

Eventually I found [Troubleshooting Email on a new Discourse Install](https://meta.discourse.org/t/troubleshooting-email-on-a-new-discourse-install/16326).  The _Is your email provider expecting noreply@example.com?_ proved to be the fix. Initially I set it to a known to work email address on the domain that the site and [SparkPost] were configured for. This got the email through to Hover, my email provider. Later on I reconfigured the `SiteSetting.notification_email` to `noreply@makeit.zone` and everything still seems to work.

*Note:* there is no way to set the site's notification email in the admin pages. You have to change `app.yml` and `launcher rebuild` your instance.

**Plugins & Integrations Installed**

Amazingly, most of these 'just worked.' There's often minimal documentation but once installed they usually have sensible settings with descriptions. For example the DropBox backup plugin doesn't have many options... because it does it's work as part of the built-in backup system. Nice!

The worst ones to install are the `auth` providers- registering apps on the various services and copying cryptographic IDs (tokens) around. Just go slow and make sure IDs and secrets are going into the right places.

Extras added: 

- [Slack Integration](https://meta.discourse.org/t/configuring-slack-for-discourse-slack-plugin/52990)
- [Twitter Login](https://meta.discourse.org/t/configuring-twitter-login-for-discourse/13395)
- [Google Login](https://meta.discourse.org/t/configuring-google-login-for-discourse/15858)
- [FaceBook](https://meta.discourse.org/t/configuring-facebook-login-for-discourse/13394)
- [GitHub](https://meta.discourse.org/t/configuring-github-login-for-discourse/13745)
- [reply by email](https://meta.discourse.org/t/set-up-reply-via-email-support/14003) 
- [autoplay first video](https://meta.discourse.org/t/media-autoplay-plugin-discourse-plugin-autoplay/40595)
- [DropBox Backup](https://meta.discourse.org/t/discourse-backups-to-dropbox/51176)

### Security and System Hardening ###

[Discourse] is designed to be good at detecting spam and bad actors. 

It also has automatic support for SSL (HTTPS) encrypted web connections with free certificates from [Lets Encrypt]. It just magically worked, allowing me to flip the setting for `https only`. (There is also a [guide](https://meta.discourse.org/t/setting-up-lets-encrypt/40709) for setting things up manually... but this seems to be now included?)

But [discourse] can be no better than the system it's running on.

#### EMail ####

First thing I did was to add an email server. Email server to *increase* security?! Yes- the server needs a way to send you, the admin, notifications of whats happening.

I choose one of the servers on [this list](https://www.linode.com/docs/email/running-a-mail-server#mail-transfer-agents).

Once installed by `apt-get install <Name of MTA>` you may need to `dpkg-reconfigure <name of MTA> config`. This should give you a set of screens to enter the required details. You want to set up a *SmartHost* that forwards to another SMTP server. And make sure it is configured to only accept requests on `localhost` (`127.0.0.1`)! 

Then configure all mail delivered to the `root` user are forwarded by following the notes [here](http://serverfault.com/questions/243669/procedure-to-forward-root-email-to-external-email).

And then test with: ``` mail -v root Subject: Test forwarding

Body of the email message. Bon Voyage!

. ```

The '`.`' tells the `mail` command to send the message. The `-v` will have mail spit out all the details of the `SMTP` actions as it tries to send the message. You should see a successful log and receive the message.

#### General Server Security ####

Follow the [Linode guide](https://www.linode.com/docs/security/securing-your-server), which goes through:

- setting up automated security updates
- limited user account
- `ssh` key-pair, disabling password login, and general `sshd` settings
- `fail2ban`
- removing unused services
- firewall

#### Firewall ####

General suggestions when configuring a firewall:

- Make sure you have another means to configure the server. For example, Linode provides a secured virtual serial port. It's easy to make a mistake and lock yourself out!
- Test, test, test! Make sure the firewall is doing what you expect.
- Reboot and test again! Firewall's can be tricky. It's easy to forget something or accidentally change the order of some rules. Always check that things are configured as expected after rebooting.

Setting up the firewall turned out to be a surprise: **by default [docker] circumvents the commonly used UFW firewall.**

References regarding this:

- [The dangers of UFW + Docker](http://blog.viktorpetersson.com/post/101707677489/the-dangers-of-ufw-docker)
- [Comments from the above article](http://blog.viktorpetersson.com/post/101707677489/the-dangers-of-ufw-docker#comment-1682816323)
* [Running Docker behind the ufw firewall](https://svenv.nl/unixandlinux/dockerufw)
* [How to set Docker 1.12+ to NOT interfere with IPTABLES/FirewallD](http://blog.samcater.com/how-to-set-docker-1-12-to-not-interfere-with-iptables-firewalld/)
* [Arch Linux Guide to Uncomplicated Firewall](https://wiki.archlinux.org/index.php/Uncomplicated_Firewall)

For my setup I found I had to edit/create `/edit/docker/daemon.json` and add:

```
{
    "iptables": false
}
```

This stops [docker] from directly manipulating `iptables`. Courtesy: [How to set Docker 1.12+ to NOT interfere with IPTABLES/FirewallD](http://blog.samcater.com/how-to-set-docker-1-12-to-not-interfere-with-iptables-firewalld/)

Then `UFW` needed some tweaking (thanks to [Running Docker behind the ufw firewall](https://svenv.nl/unixandlinux/dockerufw)):

Edit `/etc/default/ufw` and set `DEFAULT_FORWARD_POLICY`:

```
DEFAULT_FORWARD_POLICY="ACCEPT"
```

Then edit `/etc/ufw/before.rules`. Just before `*filter` add:

```
*nat
:POSTROUTING ACCEPT [0:0]
-A POSTROUTING ! -o docker0 -s 172.17.0.0/16 -j MASQUERADE
COMMIT
```

And allow incoming `SSH`, `HTTP`, and `HTTPS` traffic :

```
sudo ufw allow 22/tcp
sudo ufw allow 80/tcp
Sudo uff allow 443/tcp
```

Check you have a backup means to access the server... and restart.

Verify that the expected services are running and accessible.

Finally, verify that nothing extra is accessible, e.g. run `nmap` from a different computer:

```
nmap -A -T4 <url of your server>
```

### Future Directions ###

This configuration works fine for exposing one web-service running in a [docker] container.

But to run multiple web-services in [docker] containers, all exposed via standard ports requires a reverse-web-proxy. Luckily, there's a container for that, and some instructions for making it all work with `UFW`:  [Running multiple docker containers with UFW and "--iptables=false"](https://forums.docker.com/t/running-multiple-docker-containers-with-ufw-and-iptables-false/8953).


### Not So Obvious Features ###

You can use [Discourse] as a sort of [wiki](https://meta.discourse.org/t/what-is-a-wiki-post-and-how-can-i-make-one/21622).


[linode]: http://welcome.linode.com
[do]: https://www.digitalocean.com
[SparkPost]: https://www.sparkpost.com
[onlinode]: http://crunchify.com/how-to-setup-discourse-org-forum-on-linode-correct-way-tested-and-verified-steps/
[ondo]: https://www.digitalocean.com/community/tutorials/how-to-install-discourse-on-ubuntu-16-04
[hover]: http://hover.com
[discourse]: http://www.discourse.org
[Lets Encrypt]: https://letsencrypt.org