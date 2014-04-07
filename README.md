What Is Transit Future?
------------------------------------

Transit Future is a campaign by the Center for Neighborhood Technology to build a dozen transit lines in Cook County.

How do we pay for it? Cook County can create a dedicate revenue stream to build the projects.

This project is an explanatory web graphic that introduces people to the projects and how we'll pay for them.


Project layout
--------------
This one-page site is built using [Jekyll](http://jekyllrb.com/), a static website generator. It's just HTML/CSS and Javascript.

* `posts`: the big page is actually composed of a bunch of jekyll posts. those live here. the posts are markdown files with dates in the title. they appear on the page in reverse chronological order.

* `js`: this is where the magic happens. `main.js` makes the background images and map transitions work. we use [Modest Maps](http://modestmaps.com/) for mapping. the map zooming, technically called map easing, uses the [easey](https://github.com/mapbox/easey) extension of modest maps through an older version of [mapbox.js](https://www.mapbox.com/mapbox.js/api/v1.6.2/). our basemap is hosted by [Mapbox](mapbox.com). `map.js` specifies how the additional layers should look. our transit layers for existing L lines and proposed transit future lines are hosted by [CartoDB](cartodb.com), and rendered dynamically by CartoDB's API using CartoCSS every time a user loads the map. The key idea driving the map is a map `view` - a set of bounding box locations + one or more CartoCSS layers. These data structures tell the map where to zoom to next, and what layers to show on the map when it gets there. they're basically map states. the order of these map views mirror the order of project posts. some posts have divs with class mapstage (i.e. `<div id="southlake" class="mapstage"></div>`). when `main.js` trips over these divs, it makes the map to transition to the next view. (the id in those divs allow us to link to particular parts of the page.) @mapmeld wrote much of this code, get in touch with him for a walkthrough of how it works.

* `transit-cache`: to keep the map fast and our bank accounts in the black, our tiles are cached by transit-cache, a little node.js app that caches tiles in heroku memcached. transit-caches lives in a different repo. 

*`data`: the geospatial datasets shown on the map. `cta_lines.geojson` originally comes from City of Chicago [Data Portal](https://data.cityofchicago.org/Transportation/CTA-L-Rail-Lines-KML/m3d6-pubu) and have been improved by Adam Jentleson of [Cartografika](cartografika.net). `art.geojson` comes from Pace. `transit_future_lines.geojson` originally comes from CMAP - the lines are subset of that agency's GO TO 2040 regional plan transportation projects. `transit_future_connections.geojson` data was created by Adam Jentleson. `highlighted_places.geojson` was created by Adam Jentleson from open datasets of [building footprints](https://data.cityofchicago.org/Buildings/Building-Footprints/qv97-3bvb), [community areas](https://data.cityofchicago.org/Facilities-Geographic-Boundaries/Boundaries-Community-Areas/i65m-w5fr) and [Cook County municipalities](https://datacatalog.cookcountyil.gov/Economic-Development/Cook-County-Municipalities/yads-xpqn).

*`css`: the site uses twitter bootstrap, and additional styles on top. those styles live in `screen.css`.

*`img`: all site images live here, including background images and organization logos.

*`img/mobile`: to make the site mobile friendly, we remove the interactive map and use special static background images instead. those live in `img/mobile`, and they have dimensions of 320x568 to work with long mobile phones like the iPhone5. the logic that tells the site to display these images on mobile devices lives in `js/main.js` and `css/screen.css`.


Origin
-----
This project is a fork of Chicago's first [annual open data report](report.cityofchicago.org/open-data-2013) [repo](https://github.com/Chicago/open-data-annual-report), which was itself a of Code for America's 2012 [Annual Report](http://2012.codeforamerica.org) [repo](https://github.com/codeforamerica/annual). 

Thanks for the inspiration, and the code!


Install
-------

Jekyll is written in Ruby, so you'll need to install Ruby and download the jekyll gem in order to run the report locally.

    sudo gem install jekyll

Run
---
The following command will let you view the site on your local machine:

    jekyll serve

Build
-----
Want to generate all the static files that make up the site, for upload to a web server? Just type:

     jekyll build


Image Credits
-------------
Several images were used with Creative Commons licensing. We would like to thank and acknowledge the use of following images:
+ Catalian Velez, [Transit Future System map](img/transit_future_system_map.pdf)
+ Dave Sizer, [Around Chicago](http://www.flickr.com/photos/aphid00/5917233995/)
+ Yonah Freemark, [The Transport Politic](http://www.thetransportpolitic.com/)
+ Joel Carranza, [Los Angeles Night Horizon](https://flic.kr/p/79tVGJ)
+ Siqbal, [Chicago Downtown Aerial View](http://commons.wikimedia.org/wiki/File:Chicago_Downtown_Aerial_View.jpg)

License
-------
MIT License.