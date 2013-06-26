var stage = document.getElementById('stage');
var p = new Processing(stage);

// Defaults
p.size(document.documentElement.clientWidth, document.documentElement.clientHeight);
p.colorMode(p.HSB);
p.rectMode(p.CENTER);
p.background(0);
p.noStroke()
p.textSize(30);
p.textLeading(50);

var hw = Math.floor(p.width / 2);
var hh = Math.floor(p.height / 2);
p.translate(hw + 0.5, hh + 0.5);

p.draw = function() {
  // Run bg draw()
  for(var i in bg) {
    if(bg[i].draw) {
      try {
        bg[i].draw();
      } catch(e) {
        console.log(e);
        console.log("bg." + i + ".draw() crashed. Removed.");
        delete bg[i];
      }
    }
  }

  for(var i in fg) {
    var o = fg[i];
    o.testBeat();

    // Run modifiers
    for(var j in o.mod) {
      try {
        o.mod[j](o.data);
      } catch(e) {
        console.log(e);
        console.log("fg." + i + ".mod." + j + "() crashed. Removed.");
        delete o.mod[j];
      }
    }

    // Run fg draw()
    if(o.draw) {
      try {
        o.draw(o.data);
      } catch(e) {
        console.log(e);
        console.log("fg." + i + ".draw() crashed. Removed.");
        delete o.draw;
      }
    }
  }
}

function Animator(tData) {
  this.draw = function() {};
  this.data = tData;
  this.mod = {};

  this.setBeatFunc = function(func) {
    this.beatFunc = func;
  }
  this.tA = [];
  this.t0 = 0;
  this.tCurr = 0;
  this.beat = function(n) {
    var l = this.tA.length;
    if(l > 0) {
      if(this.tA[l-1] + 3000 < p.millis()) {
        this.tA = [];
        this.tCurr = 0;
      }
    } else {
      this.sync();
    }
    this.tA.push(p.millis());
    this.tCurr = this.tA.length - 1;
    this.beatFunc();
  }
  this.sync = function(n) {
    this.t0 = p.millis();
    this.tCurr = 0;
  }
  this.testBeat = function() {
    if(this.tA.length > 1) {
      var currWait = this.tA[this.tCurr] - this.tA[0];
      if(p.millis() - this.t0 >= currWait) {
        this.tCurr++;
        if(this.tCurr == this.tA.length)
          this.sync();
        else
          this.beatFunc();
      }
    }
  }
}

var GEN = {
  sin: function(v0, v1, rate, offset) {
    return v0 + (v1-v0) * 0.5 * (1+Math.sin(offset + p.frameCount / rate));
  },
  p: function(p) {
    return Math.random() < p
  }
}

var ENV = {
  set: function() {
    var args = Array.prototype.slice.call(arguments);
    var id = args.shift();
    var mode = args.pop();
    if(arguments.length < 3 || arguments.length % 2 != 1) {
      console.log("GEN.setenv('" + id + "') not enough or even number of arguments");
      return;
    }
    if(this.data[id]) {
      this.data[id].values = args;
    } else {
      this.data[id] = {
        active:true, mode:mode, values:args, range:0, currval: 0,
        v0:args[0], v1:args[2],
        t0:p.millis(), t1:p.millis()+args[1]*1000
      };
    }
  },
  get: function(id) {
    var d = this.data[id];
    if(!d.active)
      return d.currval;
    var pc = p.map(p.millis(), d.t0, d.t1, 0, 1);
    if(pc > 1) {
      d.range++;
      if(d.range >= (d.values.length-1)/2) {
        if(d.mode == "end") {
          d.active = false;
          d.currval = d.v1;
          return d.currval;
        }
        d.range = 0;
      }
      d.v0 = d.values[d.range*2];
      d.v1 = d.values[d.range*2+2];
      d.t0 = p.millis();
      d.t1 = p.millis()+d.values[d.range*2+1]*1000
      pc = 0;
    }
    d.currval = p.map(pc, 0, 1, d.v0, d.v1);
    return d.currval;
  },
  data: {}
}

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
