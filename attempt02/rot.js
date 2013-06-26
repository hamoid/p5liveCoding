// file:///home/funpro/Desktop/p5liveCoding/rot.html

// FADE.get("red", 0, 0.01)
var FADE = {
  get: function(id, value, rate) {
    if(this.data[id] == null) {
      this.data[id] = { value:value, rate:rate };
    }
    var d = this.data[id];
    d.value = p.lerp(d.value, value, d.rate);
    return d.value;
  },
  data: {}
}

var stage = document.getElementById('stage');
var p = new Processing(stage);
var a = 0, b = 0, c = 0, d = 0;

//FADE.get("radius", 300, 0.01)
FADE.red = 0;
FADE.green = 0;
FADE.blue = 0;

p.size(400, 400);
p.background(0);
p.draw = function() {
  var x0 = 200+200*Math.sin(a);
  var y0 = 200+200*Math.cos(a);
  var x1 = 200+200*Math.sin(b);
  var y1 = 200+200*Math.cos(b);
  p.stroke(FADE.get("red", 0, 0.01),
           FADE.get("green", 0, 0.01),
           FADE.get("blue", 0, 0.01), 100);
  p.line(x0,y0,x1,y1);
  a += 0.010;
  b += 0.0123;

  x0 = 200+200*Math.sin(c);
  y0 = 200+200*Math.cos(c);
  x1 = 200+200*Math.sin(d);
  y1 = 200+200*Math.cos(d);
  p.stroke(255, 100);
  p.line(x0,y0,x1,y1);
  c += 0.021;
  d += 0.023;
}

p.noLoop();
p.loop();
p.noFill();
p.background(0);
p.frameRate(30);
//p.save('nice.png')
