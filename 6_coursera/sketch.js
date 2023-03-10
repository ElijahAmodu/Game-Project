var gameChar_x;
var gameChar_y;
var floorPos_y;

var isLeft;
var isRight;
var isFalling;
var isPlummeting;
var collectable;
var canyon;
var trees_x;
var treePos_y;
var clouds;
var mountains;
var cameraPosX;
var collectables;
var canyons;

var game_score;
var flagpole;
var lives;

var themeSong;
var jumpSound;
var fallSound;
var lostSound;
var winSound;
var coins;
var hitSound;

var platforms;
var enemies;

function preload(){
    soundFormats('mp3', 'wav');
    //loading sounds
    themeSong = loadSound('sound/theme2.mp3');
    themeSong.setVolume(0.2);
    
    jumpSound = loadSound('sound/jump.mp3');
    jumpSound.setVolume(1);

    fallSound = loadSound('sound/body-fall.mp3');
    fallSound.setVolume(1);

    lostSound = loadSound('sound/game-over.mp3');
    lostSound.setVolume(1);

    winSound = loadSound('sound/level-win.mp3');
    winSound.setVolume(1);

    coins = loadSound('sound/collectible.mp3');
    coins.setVolume(5);

    hitSound = loadSound('sound/hitSound.wav');
    hitSound.setVolume(1);
}

function setup()
{
	createCanvas(1024, 576);
	floorPos_y = height * 3/4;
    lives = 3;


    startGame();
}

function draw()
{ 
    //Backgroung movement
    cameraPosX += (gameChar_x - cameraPosX) * 0.5; 
    
	background(100,155,255); //Skye color
    
    //draw some green ground
	noStroke();
	fill(0,155,0);
	rect(0, floorPos_y, width, height - floorPos_y); 
    
    push();
    translate(-cameraPosX + 400, 0);
    //clouds
    drawClouds();  
    //mountains
    drawMountains();
    //trees
    drawTrees();

    for(var i = 0; i < platforms.length; i++){
        platforms[i].draw();
    }
    
    for(var i = 0; i < collectables.length; i++){
        if(!collectables[i].isFound){
             //collectable
            drawCollectable(collectables[i]);
            //checkCollectable
            checkCollectable(collectables[i]);
        } 
    }

    renderFlagpole();
    checkPlayerDie();

       
    for(var i = 0; i < canyons.length; i++){
       //draw the canyon
       drawCanyon(canyons[i]);
       //checking Canyon condition
       checkCanyon(canyons[i]); 
    }

    for(var i = 0; i < enemies.length; i++){
        enemies[i].draw();
        var isContact = enemies[i].checkContact(gameChar_x, gameChar_y);

        if(isContact){
            if(lives > 0){
                hitSound.play();
                lives -= 1;
                startGame();
                break;
            }
        }
    }
	
    
    noStroke();
	//the game characterdd
	if(isLeft && isFalling)
	{
		// add your jumping-left code
        strokeWeight(1);
        fill(193, 154, 107);
        ellipse(gameChar_x,gameChar_y - 60,20,30);
        //face
        fill(0);
        ellipse(gameChar_x - 8,gameChar_y - 65,5,5);
        ellipse(gameChar_x - 10, gameChar_y - 55, 9,5);
        //body
        fill(0, 0, 255);
        rect(gameChar_x - 8, gameChar_y - 47, 15, 15);
        //hand
        stroke(15);
        strokeWeight(5);
        line(gameChar_x - 10, gameChar_y - 45, gameChar_x - 25, gameChar_y - 60);
        line(gameChar_x + 10, gameChar_y -45, gameChar_x + 25, gameChar_y - 60);
        //leg
         line(gameChar_x - 8, gameChar_y - 35, gameChar_x - 30, gameChar_y - 16 );
        line(gameChar_x + 7, gameChar_y - 35, gameChar_x + 30, gameChar_y -  10);
        
	}
	else if(isRight && isFalling)
	{
          strokeWeight(1);
		// add your jumping-right code
        fill(193, 154, 107);
        ellipse(gameChar_x,gameChar_y - 60,20,30);
        //face
        fill(0);
        ellipse(gameChar_x + 8,gameChar_y - 65,5,5);
        ellipse(gameChar_x + 10, gameChar_y - 55, 9,5);
        //body
        fill(0, 0, 255);
        rect(gameChar_x - 8, gameChar_y - 47, 15, 15);
        //hand
        stroke(15);
        strokeWeight(5);
        line(gameChar_x - 10, gameChar_y - 45, gameChar_x - 25, gameChar_y - 60);
        line(gameChar_x + 10, gameChar_y -45, gameChar_x + 25, gameChar_y - 60);
        //leg
         line(gameChar_x - 8, gameChar_y - 35, gameChar_x - 30, gameChar_y - 16 );
        line(gameChar_x + 7, gameChar_y - 35, gameChar_x + 30, gameChar_y -  10);

        
	}
	else if(isLeft)
	{
        strokeWeight(1);
		// add your walking left code
        fill(193, 154, 107);
        ellipse(gameChar_x,gameChar_y - 60,20,30);
        //face
        fill(0);
        ellipse(gameChar_x - 8,gameChar_y - 65,5,5);
        ellipse(gameChar_x - 10, gameChar_y - 55, 9,5);
        //body
        fill(0, 0, 255);
        rect(gameChar_x - 8, gameChar_y - 47, 15, 25);
        //hand
        stroke(15);
        strokeWeight(5);
        line(gameChar_x - 10, gameChar_y - 45, gameChar_x - 25, gameChar_y - 20);
        line(gameChar_x + 8, gameChar_y -45, gameChar_x + 25, gameChar_y - 15);
        //leg
        line(gameChar_x - 8, gameChar_y - 25, gameChar_x - 20, gameChar_y + 4);
        line(gameChar_x + 7, gameChar_y - 25, gameChar_x + 8, gameChar_y + 5);
        
	}
	else if(isRight)
	{
        strokeWeight(1);
		// add your walking right code
        fill(193, 154, 107);
        ellipse(gameChar_x,gameChar_y - 60,20,30);
        //face
        fill(0);
        ellipse(gameChar_x + 8,gameChar_y - 65,5,5);
        ellipse(gameChar_x + 10, gameChar_y - 55, 9,5);
        //body
        fill(0, 0, 255);
        rect(gameChar_x - 8, gameChar_y - 47, 15, 25);
        //hand
        stroke(15);
        strokeWeight(5);
        line(gameChar_x - 10, gameChar_y - 45, gameChar_x - 25, gameChar_y - 20);
        line(gameChar_x + 8, gameChar_y -45, gameChar_x + 25, gameChar_y - 15);
        //leg
        line(gameChar_x - 8, gameChar_y - 25, gameChar_x - 8, gameChar_y + 4);
        line(gameChar_x + 7, gameChar_y - 25, gameChar_x + 15, gameChar_y + 5);

	}
	else if(isFalling || isPlummeting)
	{
        strokeWeight(1);
		// add your jumping facing forwards code
        fill(193, 154, 107);
        ellipse(gameChar_x,gameChar_y - 60,30,30);
        //face
        fill(0);
        ellipse(gameChar_x - 8,gameChar_y - 65,5,5);
        ellipse(gameChar_x + 7,gameChar_y - 65,5,5);
        ellipse(gameChar_x, gameChar_y - 55, 15,5);
        //body
        fill(0, 0, 255);
        rect(gameChar_x - 10, gameChar_y - 47, 20, 28);
        //hand
        stroke(15);
        strokeWeight(5);
        line(gameChar_x - 10, gameChar_y - 45, gameChar_x - 25, gameChar_y - 60);
        line(gameChar_x + 10, gameChar_y -45, gameChar_x + 25, gameChar_y - 60);
        //leg
        noStroke();
        fill(0)
        rect(gameChar_x - 10, gameChar_y - 20, 5, 25);
        rect(gameChar_x + 5, gameChar_y - 20 , 5, 25);

	}
	else
	{
        strokeWeight(1);
		// add your standing front facing code
        fill(193, 154, 107);
        ellipse(gameChar_x,gameChar_y - 60,28,30);
        //eyes
        fill(0);
        ellipse(gameChar_x - 8,gameChar_y - 65,5,5);
        ellipse(gameChar_x + 7,gameChar_y - 65,5,5);
        ellipse(gameChar_x, gameChar_y - 55, 15,5);
        //body
        fill(0, 0, 255);
        rect(gameChar_x - 10, gameChar_y - 47, 20, 25)
        //hand
        stroke(15);
        strokeWeight(5);
        line(gameChar_x - 10, gameChar_y - 45, gameChar_x - 15, gameChar_y - 30);
        line(gameChar_x + 10, gameChar_y -45, gameChar_x + 15, gameChar_y - 30);
        //leg
        noStroke();
        fill(0)
        rect(gameChar_x - 10, gameChar_y - 25, 5, 25);
        rect(gameChar_x + 5, gameChar_y - 25 , 5, 25);
	}
    
    pop();

     fill(255);
     noStroke();
     textSize(30);
     text("score: " + game_score, 30,30);

     fill(255);
     noStroke();
     textSize(30);
     text("lives: " + lives, 30,60);

     if(lives < 1){
        fill(0);
        textSize(30);
        text("Game Over, Refresh to continue", width/2 - 250, height/2)
        return;
     }
     if(flagpole.isReached == true){
        fill(0);
        textSize(30);
        text("Level Complete, Refresh to continue", width/2 - 250, height/2)
        return;
     }    

	///////////INTERACTION CODE//////////
	//Conditional statements to move the game character below 
    if(isLeft == true){
        gameChar_x -= 3;
        
    }
    
    if(isRight == true){
        gameChar_x += 3;
    }
   
    //adding gravity
    if(gameChar_y != floorPos_y){
        var isContact = false;
        for(var i = 0; i < platforms.length; i++){
           if(platforms[i].checkContact(gameChar_x, gameChar_y) == true){
                isContact = true;
                break;
           }
        }
        if(isContact == false){
             gameChar_y += 2;
             isFalling =  true;
        }
     } 
    else {
        isFalling = false;
    }
    
    if(flagpole.isReached == false){
        checkFlagpole(flagpole);
    }
}


function keyPressed()
{
    //moving sound
    if(keyCode == 83){
        themeSong.play();
        
    }

    //moving left
    if(keyCode == 65 || keyCode == 37) {
        isLeft = true;
    }
    
    //moving right
    if(keyCode == 68 || keyCode == 39) {
        isRight = true;
    }
    
    //jumping code
     if(keyCode == 87  || keyCode == 38) {
        if(gameChar_y == floorPos_y){
            gameChar_y -= 100;
            jumpSound.play();
        }
         
         if( gameChar_y !== floorPos_y ){
            gameChar_y += 10;
         }
    }
}

function keyReleased()
{
   
	//the animation of the character when
    if(keyCode == 65 || keyCode == 37) {
        isLeft = false;
    }
    
    if(keyCode == 68 || keyCode == 39) {
        isRight = false;
    }

}

function drawClouds (){
    for (let i = 0; i < clouds.length; i++) {
        noStroke();
        fill(255,255,255);
        ellipse(clouds[i].x_pos, clouds[i].y_pos + 30, 60, 60);
        ellipse(clouds[i].x_pos - 40, clouds[i].y_pos + 30, 60, 40);
        ellipse(clouds[i].x_pos + 40, clouds[i].y_pos + 30, 60, 40);

    }
}

function drawMountains() {
    for(var i=0; i < mountains.length; i++){
        noStroke();
        fill(113, 121,126);
        triangle(mountains[i].x_pos + 280, mountains[i].y_pos -100, mountains[i].x_pos + 100, mountains[i].y_pos + 232, mountains[i].x_pos + 480, mountains[i].y_pos + 232);
        fill(255,255,255);
        triangle(mountains[i].x_pos + 280, mountains[i].y_pos -100, mountains[i].x_pos + 100, mountains[i].y_pos + 232, mountains[i].x_pos + 350, mountains[i].y_pos + 232);
        fill(113, 121,126);
        triangle(mountains[i].x_pos + 200, mountains[i].y_pos - 45, mountains[i].x_pos + 100, mountains[i].y_pos + 232, mountains[i].x_pos + 350, mountains[i].y_pos + 232);
        triangle(mountains[i].x_pos + 400, mountains[i].y_pos - 50, mountains[i].x_pos + 100, mountains[i].y_pos + 232, mountains[i].x_pos + 500, mountains[i].y_pos + 232);
    }
}

function drawTrees (){
     for(var i=0; i < trees_x.length; i++){
        noStroke();
        fill(111, 78, 55);
        rect(trees_x[i], treePos_y - 142, 30, 145);
        fill(34, 139, 34);
        triangle(trees_x[i] + 15,treePos_y - 262, trees_x[i] - 40, treePos_y - 138, trees_x[i] + 70, treePos_y - 138);
        triangle(trees_x[i] + 15, treePos_y - 200, trees_x[i] - 40, treePos_y - 112, trees_x[i] + 70, treePos_y -112);
        triangle(trees_x[i] + 15, treePos_y - 320, trees_x[i] - 40, treePos_y - 168, trees_x[i] + 70, treePos_y -168);
    }
}

function drawCollectable (t_collectable){
     
    
    if(t_collectable.isFound == false){
        fill(255,215,0);
        ellipse(t_collectable.x_pos ,t_collectable.y_pos, 20, 20);
        
        
    }
}

function drawCanyon (t_canyon){
    strokeWeight(50);
    stroke(176,224,230)
    rect(t_canyon.x_pos, 458 ,15, 100);
    strokeWeight(14);
    stroke(111, 78, 55);
    line(t_canyon.x_pos - 22, 438, t_canyon.width - 30, 576);
    line(t_canyon.x_pos + 38, 435, t_canyon.width + 30, 576);
}

function checkCollectable(t_collectable) {
    if(dist(gameChar_x, gameChar_y, t_collectable.x_pos, t_collectable.y_pos) < 2){
        t_collectable.isFound = true;
        coins.play();
        game_score +=  1;
    }
}


function checkCanyon (t_canyon){
    if(gameChar_x > t_canyon.x_pos - 30 && gameChar_x < t_canyon.width + 30 && gameChar_y >= floorPos_y){
        isPlummeting = true;
    }
    
    if(isPlummeting == true){
        gameChar_y += 5;
    
    }
}

function renderFlagpole(){
    push();
    strokeWeight(5);
    stroke(170);
    line(flagpole.x_pos, floorPos_y, flagpole.x_pos, floorPos_y - 250);
    noStroke();
    fill(255, 255, 0);
    

    if(flagpole.isReached){
        rect(flagpole.x_pos, floorPos_y - 250, 50, 50);
    } else{
        rect(flagpole.x_pos, floorPos_y - 50, 50, 50);
    }

    pop();
}

function checkFlagpole(){
    var d = abs(gameChar_x - flagpole.x_pos); 
    if( d < 15 ){
        flagpole.isReached = true;
        winSound.play();
        themeSong.pause()
    }
}

function checkPlayerDie(){
    if(gameChar_y > 576 && gameChar_y < 594){
        lives -= 1;
        fallSound.play();
        startGame();
    } 
    if( lives == 0){
        lostSound.play();
        startGame();
    }
}

function startGame(){
    isLeft = false;
    isRight = false;
    isFalling = false;
    isPlummeting = false;
    gameChar_x = width/2;
	gameChar_y = floorPos_y;
    
    
    trees_x = [-400, -200, 200, 600, 750, 1000, 1400 ];
    treePos_y = floorPos_y;
    clouds = [{x_pos: -300, y_pos: 70},
             {x_pos: -100, y_pos: 100},
             {x_pos: 100, y_pos: 70}, 
             {x_pos: 400, y_pos: 100}, 
             {x_pos: 800, y_pos: 50},
             {x_pos: 1100, y_pos: 50},
             {x_pos: 1500, y_pos: 100},
             {x_pos: 1800, y_pos: 50}];
    
    mountains = [{x_pos: -300, y_pos: 200}, 
                 {x_pos: 100, y_pos: 200}, 
                 {x_pos: 700, y_pos: 200},
                {x_pos: 1300, y_pos: 200},
                {x_pos: 1900, y_pos: 200}];
    
    cameraPosX = 0;
    collectables = [{x_pos: -400, y_pos: floorPos_y, size: 50, isFound: false},
                    {x_pos: -200, y_pos: floorPos_y, size: 50, isFound: false},
                   {x_pos: 200, y_pos: floorPos_y, size: 50, isFound: false}, 
                    {x_pos: 700, y_pos: floorPos_y, size: 50, isFound: false}, 
                    {x_pos: 1000, y_pos: floorPos_y, size: 50, isFound: false},
                   {x_pos: 1300, y_pos: floorPos_y, size: 50, isFound: false}];
    
    canyons = [{x_pos: -240, width: -232},
              {x_pos: 400, width: 410},
              {x_pos: 1200, width: 1210}];

    platforms =  [];
    platforms.push(createPlatforms(60, floorPos_y - 90, 100));
    platforms.push(createPlatforms(1000, floorPos_y - 90, 100));
    platforms.push(createPlatforms(600, floorPos_y - 90, 100));

    game_score = 0;
    
    flagpole = {isReached: false,  x_pos: 1500 };

    enemies = [];
    enemies.push(new Enemy(100, floorPos_y - 10, 100));
    enemies.push(new Enemy(700, floorPos_y - 10, 100));
    enemies.push(new Enemy(1100, floorPos_y - 10, 100));

}

function createPlatforms(x, y, length){
    var p = {
        x: x,
        y: y,
        length: length,
        draw: function(){
            fill(50);
            rect(this.x, this.y, this.length, 20, 30)
        },
        checkContact:function(gc_x,  gc_y){
            if(gc_x > this.x && gc_x < this.x + this.length){
                var d = this.y - gc_y;
                if(d >= 0 && d < 5){
                    return true;
                }
                return false;
            }
        }
    }
    return p;
}

function Enemy(x, y, range){
    this.x = x;
    this.y = y;
    this.range = range;

    this.currentX = x;
    this.inc = 1;

    this.update = function (){
        this.currentX += this.inc;

        if(this.currentX >= this.x + this.range){
            this.inc = -1;
        } else if (this.currentX < this.x){
            this.inc = 1;
        }
    }

    this.draw = function(){
        this.update()
        fill(255, 0, 0);
        ellipse(this.currentX, this.y, 20, 20);
    }
    
    this.checkContact = function(gc_x, gc_y){
        var d = dist(gc_x, gc_y, this.currentX, this.y);
        if(d < 20){
            return true;
        }

        return false;
    }
}
