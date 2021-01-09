/// <reference path="jquery-3.2.1.min.js" />

var countingGame = {};

(function($){
  var button = null;
  var heading = null;
  var gameField = null;
  var gameSettings = {
    minCount : 15,
    maxCount : 20
  };
  var gameState = {
    counter: 0,
    image: "sample img path",
    targetCount: 0,
  };

  function resetGame(){
    gameState.counter = 0;
    gameState.targetCount = gameSettings.minCount + Math.floor(Math.random() * (gameSettings.maxCount - 1));
  }

  function sizeField(){
    var headingHeight = $(heading).height();
    var buttonHeight =
     $(button).height() + parseInt($(button).css("padding-top")) + parseInt($(button).css("padding-bottom")) + 20; 
    gameField.style.height = window.innerHeight - headingHeight - buttonHeight + "px";
    gameField.style.top = headingHeight + "px";
    gameField.style.position = "relative";
  }

  function increaseCount(){
    gameState.counter += 1;
    heading.innerHTML = gameState.counter;
  }

  function checkGameOver(){
    if (gameState.counter == gameState.targetCount) {
      heading.innerHTML = "You count to " + gameState.targetCount + ", congratulations";
    }
  }
   
  $(window).resize(sizeField);

  function createCountable(index, countableSize){
    var countable = document.createElement("div");
    countable.style.height = countableSize + "px";
    countable.style.width = countableSize + "px";
    countable.style.border = "1px solid yellow";
    countable.style.top = index * countableSize * 2 + "px";
    countable.style.left = index * countableSize * 2 + "px";
    countable.style.position = "absolute";
    countable.style.borderRadius = "50%";
    $(countable).one("click", function(){
      $(this).css("background", "yellow");
      $(this).animate({width: '60px'}, { duration: 200, queue: false });
      $(this).animate({height: '60px'},{ duration: 200, queue: false });
      var animationOffSet = (60 - countableSize) / 2;
      $(this).animate({top: parseInt(this.style.top) - animationOffSet + "px"}, { duration: 200, queue: false });
      $(this).animate({left: parseInt(this.style.left) - animationOffSet + "px"}, { duration: 200, queue: false });
      setTimeout(function(){
        increaseCount(); 
        checkGameOver(); 
      }, 200);
    });

    return countable;
  }

  countingGame.startGame = function(containerId){
    resetGame();
    var container = document.getElementById(containerId);
    button = container.getElementsByTagName("button")[0];
    heading = container.getElementsByClassName("score")[0];
    gameField = document.createElement("div");
    container.appendChild(gameField);
    gameField.className = "game-field";
    sizeField();

    var countables = [];
    var gameFieldHeight = $(gameField).height();
    var gameFieldWidth = $(gameField).width();
    var countableSize = Math.min(gameFieldHeight, gameFieldWidth) / (2 * gameState.targetCount);

    for(var i=0; i < gameState.targetCount; i+=1){
      var countable = createCountable(i, countableSize);
      gameField.appendChild(countable);
    }
  };

})(jQuery);
