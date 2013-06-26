// file:///home/funpro/Desktop/p5liveCoding/index.html

// Background
bg = {}
bg.default = new Animator({});
bg.default.draw = function() { p.background(40); };
//bg.default.draw = function() { p.fill(40, 5); p.rect(0,0,p.width,p.height); };

// Circle
fg = {}
fg.circ = new Animator({ x:0, y:0, r:30 });
fg.circ.draw = function(t) { p.ellipse(t.x, t.y, t.r, t.r); };
fg.circ.mod.orbit = function(t) {
  //t.x = GEN.sin(-200, 200, GEN.sin(230, 260, 170, 0), 0);
  //t.y = GEN.sin(-200, 200, GEN.sin(230, 260, 166, 2), 0);
};
ENV.set("cgrow", 10, 2, 10, 0.1, 100, 0.1, 10, "loop");
fg.circ.mod.grow = function(t) {
  t.r = ENV.get("cgrow");
  //t.r = GEN.sin(10, 50, 30, 0);
  //t.r = p.random(10, 50);
}
fg.circ.mod.rndc = function(t) {
  //if(GEN.p(0.2))
  p.fill(GEN.sin(0, 255, 300, 0), 200, GEN.sin(100, 200, 130, 0));
}
fg.circ.setBeatFunc(function() {
  p.background(255);
})
//fg.circ.beat();
//delete fg.circ


fg.r1 = new Animator({ hue:0, sat:255, bri:255, y:0, h:100 });
fg.r1.draw = function(t) {
    p.noStroke();
    p.fill(t.hue, t.sat, t.bri, 100);
    p.rect(t.y, 0, t.h, p.height);
};
//fg.r1.mod.bla = function(t) { t.h = GEN.sin(100, 200, 5, 0); }
//fg.r1.mod.hue = function(t) { t.hue = (t.hue + 1) % 255; }
ENV.set("recty", 0, 2, 500, 1, -500, 1, 0, "loop");
//fg.r1.mod.y = function(t) { t.y = ENV.get("recty"); }
//delete fg.r1

fg.r2 = new Animator({ hue:0, sat:255, bri:255, y:0, h:100 });
fg.r2.draw = function(t) {
    p.noStroke();
    p.fill(t.hue, t.sat, t.bri);
    p.rect(0, t.y, p.width, t.h);
    //p.rect(GEN.sin(-100,100,33,0), t.h-50, 150, 20);
};
//fg.r2.mod.bla = function(t) { t.h = GEN.sin(100, 50, 40, 0); }
//fg.r2.mod.hue = function(t) { t.hue = (t.hue + 0.1) % 255; }
ENV.set("recty2", -200, 3, 500, 0.4, -200, 0.3, -200, 1, -800, 1, -200, "loop");
//fg.r2.mod.y = function(t) { t.y = ENV.get("recty2"); }


// Slide circle
fg.slide = new Animator({ x:0, y:0, tx:0, ty:0, r:10 });
fg.slide.draw = function(t) { p.ellipse(t.x, t.y, t.r, t.r); };
fg.slide.mod.move = function(t) {
  t.x = p.lerp(t.x, t.tx, 0.1);
  t.y = p.lerp(t.y, t.ty, 0.1);
}
fg.slide.setBeatFunc(function() {
  fg.slide.data.tx = p.random(-hw, hw);
  fg.slide.data.ty = p.random(-hh, hh);
})
//ENV.set("slidesz", 10, 3, 10, 0.1, 100, 0.1, 10, "loop");
//fg.slide.mod.sz = function(t) { t.r = ENV.get("slidesz"); };
//fg.slide.beat();
//fg.slide.sync();
//delete fg.slide


fg.pattern = new Animator({});
/*
fg.pattern.draw = function() {
  for(var i=0; i<100; i++) {
    var x = (300+i)*Math.sin(i+p.frameCount);
    var y = (300+i)*Math.cos(i+p.frameCount);
    p.ellipse(x, y, i/5, i/5);
  }
}
*/


/*
fg.text = new Animator({});
fg.text.draw = function() {
  p.text("I've... seen things you people wouldn't believe;\\nattack ships on fire off the shoulder of Orion;\\nI've watched C-beams glitter in the dark near the Tannhauser Gate.\\nAll those... moments... will be lost... in time, like... tears... in rain.", -200, -250, 400, 500);
};
*/



p.noLoop();
p.loop();
