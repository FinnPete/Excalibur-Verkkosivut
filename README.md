# Excalibur-Verkkosivut
Welcome to the Excalibur website!

**Things Excalibur does**
- Roleplaying games
  - Connect DMs with players
- Card games
- Minature games
- Boardgames
  - Go
  - Chess
- Host Clubroom
- Host events
  - Weekly Boardgame day (Tuesdays)
  - Weekly MtG games
  - Weekly Miniature games (Wednesdays)
  - Monthly TTRPG days (Last Thursday of each month)
  - Misc Events, Saunas
- Collaboration with local clubs and local businesses
  - Chess club Tampere University
  - Go club Kanpai Tampere Area
  - Fantasia pelit gives discounts to club members

**Summary of webiste contents**
- News page: See new announcements
- Calendar: See upcoming events
- Inventory: Inventory of all available board games and TTRPGs
- Information
  - Fuksis: The Fuksis page is kinda misnamed? It provides basic information about the club/clubroom which is available on the main page or membership page.
  - Membership: How to become a member
  - Board: Summary of board members/ contact information
- New info page suggestions (Not Implemented)
  - MtG page: Additional information on ongoing MtG meetups, perhaps details on rules or events and such?
  - TTRPG Page: Additional information on events that gather TTRPG players, more details about monthly events, campaigns, and available TTRPGs
  - Board game page: Additional information on weekly board game events
  - Club Rules: Contains a download of club rules pdf with a rough transcription and translation on the page itself

## Tech Stack
- [HTMX](https://htmx.org/): Used for reuseable HTML content (see *components* directory)
- [Bootstrap](https://getbootstrap.com/docs/5.3/getting-started/introduction/): CSS framework used for nice-looking website elements
- [Firebase](https://firebase.google.com/): Remote database for storing News information, accessable via the news tab
- [Github Pages](https://docs.github.com/en/pages): Used for publishing static websites - *note the [limitations](https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits) of using static websites before adding features*

## Feature TODO
- [ ] New website content
  - [ ] Club rules
  - [ ] Details on discount with store
- [ ] Sanitize markdown input (Connor: Only needed for newsfeed. Currently vulnerable to user attacks. You can escape markdown and run arbitrary code on user PCs. ;D)
  - [ ] News feed
  - [ ] markdown_convert.js
  - [ ] TTRPG page
  - [ ] MtG page
- [X] Update link to membership form
- [X] Bootstrap upgrades
  - [X] Card carosel for Homepage
  - [X] Reduce file size of images
  - [X] Fancy nav bar
  - [-] English/Finnish switch bar -> no fancy SASS
  - [-] Dark mode -> no fancy SASS
  - [-] Automatic color changing with SASS -> Not possible with static sites
- [X] Separate js from html
- [X] Embedded GSheet for inventory
- [X] Update Board picture
- [X] Bootstrap overhaul
  - [X] Update News
  - [X] Update Modal
  - [X] Update Nav
  - [X] Update Header
  - [X] Update Footer
- [X] Move Excalibur icon to be less obsructing
- [X] Markdown content
- [X] English Pages
- [X] Separate text content and html template
- [X] News feed
- [X] Custom URL 
