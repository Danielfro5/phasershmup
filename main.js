var game = new Phaser.Game(1000,391, Phaser.AUTO);
//global variables
  var cursors;
  var ship;
  var civ;
  var bullets;
  var bulletTime=0;
  var fireButton;
  var bgtile;

var GameState = {
 preload: function(){
   //[NOTWORKING]game.world.bounds.setTo(0, 57, 393, 334);

   //load sprites
    game.load.image('bgtile', 'assets/images/background.png');
    game.load.image('bullet', 'assets/images/bullet.png');
    game.load.image('scanline', 'assets/images/scanline.png');
    game.load.spritesheet('ship','assets/images/spritesheet.png',288,122,4);
    game.load.spritesheet('civ','assets/images/spritesheet2.png',288,122,4);



   //load sound
    game.load.audio('track1','assets/sound/track1.wav');
 },

 create: function(){
   this.game.scale.pageAlignHorizontally = true;this.game.scale.pageAlignVertically = true;this.game.scale.refresh();
   //music[ADD MUSIC HERE]
    //music = game.add.audio("track1");
    //music.play('',0,1,true);

  //scrolling background
     bgtile = game.add.tileSprite(0, 0, 1270, 391, "bgtile");

  //display ship(player)
    ship = game.add.sprite(this.game.world.centerX,this.game.world.centerY + this.game.world.centerY/1.5, 'ship');
    ship.animations.add('drive',[0,1,2,3],36,true);
    ship.animations.play('drive');
    ship.anchor.setTo(0.5,0.5);


   //player bullets
    bullets = game.add.group();
    bullets.enableBody = true;
    bullets.physicsBodyType = Phaser.Physics.ARCADE;
    bullets.createMultiple(100, 'bullet');
    bullets.setAll('outOfBoundsKill', true);
    bullets.setAll('checkWorldBounds', true);

   //civilian car
   civ = game.add.sprite(1200,150, 'civ');
   civ.animations.add('drive2',[0,1,2,3],36,true);
   civ.animations.play('drive2');
   civ.anchor.setTo(0.5,0.5);

   //scanlines overlay
    scanline = game.add.sprite(0,0, 'scanline');

   //user input
    fireButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    cursors = this.input.keyboard.createCursorKeys();

    //	physics

    game.physics.enable(ship, Phaser.Physics.ARCADE);
    //
    //game.physics.setBounds();
    ship.enableBody = true;
    game.physics.enable(civ, Phaser.Physics.ARCADE);
    civ.enableBody = true;
    ship.body.collideWorldBounds=true;

 },
 update: function() {
   //scrolling the background
    bgtile.tilePosition.x -= 40;

   //player interactivity
   shooting();
   move(ship);

   //enemies
   enemyType1(civ,-1500,1200);



  }};


//Movement
function move(sprite){

  var speed = 15;
  if (cursors.left.isDown)
  {
    ship.body.x -= speed;
  }
  else if (cursors.right.isDown)
  {
    ship.body.x += speed;
  }

  if (cursors.up.isDown)
  {
    ship.body.y -= speed;
  }
  else if (cursors.down.isDown)
  {
    ship.body.y += speed;
  }
  }

  //Shooting
function shooting(){
    if(fireButton.isDown){
      if(game.time.now > bulletTime){
        bullet = bullets.getFirstExists(false);

        if(bullet){
          bullet.reset(ship.x+120,ship.y-30);
          bullet.body.velocity.x = 1000;
          bulletTime = game.time.now += 200;
        }}}}

function enemyType1(sprite,xSpeed,xPos){


    sprite.body.velocity.x = xSpeed;
    if(sprite.body.position.x < -300){
      randY = Math.random()*391;
      sprite.body.position.x = 1200 + Math.random()*2000;//randomize slightly in future
      sprite.body.position.y = Math.random()*391;
      console.log(randY);
    }

}

game.state.add('GameState', GameState);
game.state.start('GameState');
