Title: The (Missing) Art in Scheduling Software
date: 07/07/2016
tags: business, software development, art

I had planed to keep workshop and class bookings very simple- summaries on the website, announcements on Facebook and Twitter, scheduling details in Google calendar, and call or send me an email to sort out payments.

But I soon got feedback that people expected the "book now" links to go to a page where they could reserve; not another landing page that directed then directed them to call or email.

Time to find a service that:

* allows scheduling workshops: one time, repeating, and multi-day
* can allow more than one attendee, and can set maximum number of attendees
* is not expensive

Nice if it also:

* handles payments
* integrates with social networks for promotion
* makes it easy to duplicate and edit events

I was surprised that Googling terms like 'workshop scheduling service' had a lot of results.

Cost got rid of a lot of candidates.

User experience removed many more. Just plain awful for *my* use-cases.

I have a strong hunch about why they're so bad- by applying sound engineering principles but without being artful.

My mental reverse engineering goes something like this.

Picture a conference table with a business/product developer and a team of competent software engineers.

Business developer (BD): Scheduling for a small business is often difficult. For example a physio-therapist that needs to fill up hourly slots. There's a lucrative opportunity if we can serve their needs and reduce this burden. 

Software engineer (SE): Sure. Let's apply object modeling principles to abstract the problem into subsystems that can be independently developed in parallel, and then integrated into the final solution.

*After some conversation they end up with the following*

SE: So we have a "business" object that has "time slot" and "client" objects. There's a many-to-one relationship between "time slots" and "clients": that is, a client can book many hours of physio "time slots." 

BD: Good. But what if the owner does more than one kind of service, eg phsyio and accupuncture?

*Some more conversation*

SE: Ok, we've added a "service" object. "Business" objects may have one or more "service" objects. "Time slots" now have a one-to-one link to a "service."

BD: But what if they can't do acupuncture in every time slot? Maybe it takes time to steralize the equipment.

*More white board diagrams...*

SE: Think we've got it. "service" objects now have their own "time slot" objects. "Clients" can only make a booking for a service when both the business and service both have available "time slots" for the same time.

BD: Well, what happens when they grow? Maybe they make a partnership, and now there are two people providing these services?

*Some of the software engineers are starting to think Agile development processes are being taken to extremes. Maybe some upfront requirements analysis isn't so bad...*

SE: Now we've got it. We'll add a "service provider" object. That's what we'll call the people providing the services that the business performs. "Business", "service", and "service provider" objects all have "time slot" objects. "Service" and "Service provider" objects can have many-to-many relationships. That is one service can be provided by many different staff members, and one staff member can provide one or more services. "Business time slots" are the actual paid for bookings. But a "business time slot" can only be scheduled when there are free time slots for the "business", selected "service", and selected "service provider".

BD: Great. Oh. What happens if they want to offer regular repeating services. Like a weekly package. **Or multiple time slot workshops?**

*Some of the engineers are staring daggers at the business developer at this stage. But because the design is well abstracted they soon realize...*

SE: Our system is almost flexible enough to handle this. We can add a "number of time slots required" to the "service" objects. By appropriately setting the available time slots for the "business", "service" and "service provider" objects, then the intersection of available "time slots" between these different types of object ("business", "service", "provider"), plus the "number of time slots required" will let us represent single, multiple time slot, and repeating bookings.

*The team high-fives and goes to work.*

I'll leave it to you to imagine how the team reacts to, and then solves "how can we allow group bookings: where more than one client can go to the same time slot for a service."

I've tried to be a little tongue-in-cheek, but also give an idea of how a real world problem gets broken down into solvable chunks using good engineering practices such as generating requirements, object modeling, and abstraction.

From a technical and engineering point of view, it's a good solution: it solves the problem.

But it misses being an "artful" solution: *The end user has to understand that being able to book a time-slot is determined by the intersection of availability records in several different abstract objects!* They have to understand far too much of the underlying machinery.

Example services I tried that I believe suffer this problem:

* <https://simplybook.me>
    * ["simple" instructions to add a class](http://appointmentschedulingnews.com/events-and-classes/) (about 1100 words and several images!)
* <http://www.appointy.com>

Again, they'd work great if you're managing hourly sessions and not multi-day/repeating events.


[SuperSaaS](http://www.supersaas.com) deserves special mention. They have created a far more artful solution. Their system appears to have similar abstractions, but guides the business owner/service provider very clearly through the process of creating many different types of scheduling scenarios (including repeating and multi-day events with multiple attendees.) By asking appropriate questions the system figures out what objects need to be created, and what values they should have. The user doesn't need to understand the intricacies of the systems internals. Unfortunately the interface for clients-of-the-business seemed a bit more clunky. Maybe a little too much information provided, and not enough guidance for what to do.

So what to do?

**Re-think the problem.**

The "must haves" I listed are from a process/overhead point of view for me, the business owner.

What I really need to focus on is "making money" - making it as easy as possible for clients to register for workshops.

Most of my "nice to haves" become the "must haves."

So instead of finding a service that focuses on scheduling, I need one that makes it easy for clients to register for events. 

Which leads to the big event management providers:

* [EventBrite](https://www.eventbrite.ca)
	* clean event creation pages
	* more costly service fees 
* [RegFox](https://www.regfox.com) 
	* really clean interface
	* very slick event editing page
	* $USD only ($CAD coming later in the year...)
	* low service fee

And the winner for me: [Brown Paper Tickets][].

They have:

* the ability to accept most credit cards
* low fees
	* only for financial transactions they process, or printed tickets
	* on-site sales can be recorded (eg so capacity numbers are correct), and no service fee if they don't process the financial transaction
* really easy to use event creation pages
* easy to add multiple times and costs
* moderators for new event listings
	* A **person** checks an event before it is live/public.
	* found common newbie mistakes I'd made, offered suggestions, were awesome
* really easy to duplicate events
* superb support staff
	* I've easily sent a dozen emails in the last couple of days
	* answered within ~15 minutes
	* from UI experience to connecting bank accounts
* ticket printing and shipping as an option
* a promotions team available to help market events

At this point I'm very impressed and highly recommend [Brown Paper Tickets].

[Brown Paper Tickets]: https://www.brownpapertickets.com

