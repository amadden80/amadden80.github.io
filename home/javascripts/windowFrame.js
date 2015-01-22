
var windowFrame = {

    init: function init(canvasId){
      this.droplets = [];

      this.canvas = document.getElementById(canvasId);
      this.ctx = this.canvas.getContext("2d");

      var that = this;

      setInterval(function(){that.createDroplet();}, (Math.random() * 10)+5);

      setInterval(function(){
        that.update();
        that.draw(that.ctx, that.canvas);
      }, 32);


      var currentdate = new Date();
      var hour = currentdate.getHours();

      var sunColor = 'lightyellow';
      if (hour<=6 || hour>=16){
        sunColor = 'black';
      }

      windowFrame.canvas.style['background-color'] = sunColor;

    },

    update: function update(){
      for (var i = 0; i < this.droplets.length; i++) {
        this.droplets[i].update();
        if (this.droplets[i].y>this.canvas.height){
          this.droplets.splice(i, 1);
        }
      }
    },

    draw: function draw(ctx, canvas){
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      this.ctx.globalAlpha = 0.8;
      for (var i = 0; i < this.droplets.length; i++) {
        this.droplets[i].draw(ctx);
      }

      this.ctx.globalAlpha = 1;
      ctx.fillStyle = "rgb(92,52,49)";
      var sillWidth = 10;
      ctx.fillRect((this.canvas.width/2)-(sillWidth/2), 0 , sillWidth,this.canvas.height);
      ctx.fillRect(0, (this.canvas.height/2)-(sillWidth/2), this.canvas.width, sillWidth);
      ctx.fillRect(0, (this.canvas.height/2)-(sillWidth/2), this.canvas.width, sillWidth);
      ctx.fillRect(0, (this.canvas.height/2)-(sillWidth/2), this.canvas.width, sillWidth);

      ctx.strokeStyle = "rgb(92,52,49)";
      ctx.lineWidth = sillWidth;
      ctx.strokeRect(0,0,this.canvas.width,this.canvas.height);
    },

    createDroplet: function createDroplet(){
      this.droplets.push(new this.Droplet({
        x: Math.random()*this.canvas.width,
        y: -100,
        xVel: Math.random()-0.5,
        yVel: Math.random() * 5 + 1,
        radius: Math.random() * 2,
        color: 'lightblue',
      }));
    },

    Droplet: (function(){

      function Droplet(options){
        options = options || {};
        this.x = options.x;
        this.y = options.y;
        this.xVel = options.xVel;
        this.yVel = options.yVel;
        this.radius = options.radius;
        this.color = options.color;
      }

      Droplet.prototype.update = function update() {
        this.x += this.xVel;
        this.y += this.yVel;
      };

      Droplet.prototype.draw = function draw(ctx) {
        ctx.save();
        ctx.fillStyle = this.color;
        ctx.translate(this.x, this.y);
        ctx.beginPath();
        ctx.arc(this.radius*(-1), (this.radius*(-1)), this.radius, 0, Math.PI*2, true);
        ctx.fill();
        ctx.restore();
      };

      return Droplet;

    })()

};
