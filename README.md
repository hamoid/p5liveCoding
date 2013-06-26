p5liveCoding
============

Live coding with Processing.js and the LightTable editor.
http://www.lighttable.com/

Documentation is currently missing, and without documentation
there's not much you can do with these files. I plan to fix
this soon, and make some video tutorials to explain what I'm
trying to do and how far did I get.

Very briefly, this is an attempt to do live coding using Processing.js.
I chose PJS because I know Processing well, but this should work with
other JavaScript graphic libraries.

base/ is the minimal code to load in Chrome or Firefox. You should have
the console open. There you can reference the Processing API using
the p variable. You can type p.ellipse(p.width, p.height, 100, 100) for example.
Remeber to add p. to every call to the API. It's very easy to forget that.

attempt01/ is my first attempt to create a layer system to allow adding
and removing things from the stage. If you just draw directly calling
the Processing drawing functions, the system is just a twisted method
for drawing. If you store functions as layers, you can later delete them,
which is a good thing. You can still run this on Chrome or Firefox.

attempt02/ should be run in LightTable, because it allows evaluating
chunks of code multiple times. The included FADE function allows to fade
properties (a color for example) instead of changing them suddenly.

attempt03/ is the most developed version. It includes some JavaScript tools
inside p5liveCoding.js, and code to be evaluated during a performance
inside live.js. The tools include a layer system, an event looper, some
number generators, an envelope system, and the variable fader.

I'll give more details soon.
