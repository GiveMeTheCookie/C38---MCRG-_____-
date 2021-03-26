class Game {
  constructor(){}

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }
    car1 = createSprite(100,200)
    car2 = createSprite(200,200)
    car3 = createSprite(300,200)
    car4 = createSprite(400,200)
    cars = [car1, car2, car3, car4] //  \\

  }

  play(){
    form.hide();
    Player.getPlayerInfo();

    if(allPlayers !== undefined){
      var index = 0
      var x = 0
      var y 
      for(var i in allPlayers){
        index = index + 1
        //store the positions of the car in the x and y variables.
         x = x + 200
         //using the database values to set the y position.
         y = displayHeight - allPlayers[i].distance
         //storing the x position of the car inside the variable 'x'.
         cars[index - 1].x = x
         //storing the y position of the car into the 'y' variable.
         cars[index -1].y = y
         //give a different color to each car
        if (index === player.index)  {
          cars[index - 1].shapeColor = "red"
          camera.position.x = displayWidth/2
          camera.position.y = cars[index - 1].y
        }
          
        }
    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=50
      player.update();
    }
    drawSprites()
  }
}
