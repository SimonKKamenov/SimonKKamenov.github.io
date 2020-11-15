/// <reference path="jquery-3.2.1.min.js" />

var countingGame = {};

(function($){
  var counter = 0;
  var button = null;
  var heading = null;
  var gameField = null;

  function sizeField(){
    var headingHeight = $(heading).height();
    var buttonHeight =
     $(button).height() + parseInt($(button).css("padding-top")) + parseInt($(button).css("padding-bottom")) + 20; 
    gameField.style.height = window.innerHeight - headingHeight - buttonHeight + "px";
    gameField.style.top = headingHeight + "px";
    gameField.style.position = "relative";
   }

   function increaseCount(){
     counter += 1;
     heading.innerHTML = counter;
   }
   
   $(window).resize(sizeField);

  countingGame.startGame = function(containerId){
    counter = 0
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
    var countableSize = Math.min(gameFieldHeight, gameFieldWidth) / 20;
    
    for(var i=0; i<10; i+=1){
      var countable = document.createElement("div");
      gameField.appendChild(countable);
      countable.style.height = countableSize + "px";
      countable.style.width = countableSize + "px";
      countable.style.border = "1px solid blue";
      countable.style.top = i * countableSize * 2 + "px";
      countable.style.left = i * countableSize * 2 + "px";
      countable.style.position = "absolute";
      $(countable).click(function(){
      $(this).css("background", "green");
      increaseCount();
      });
    
   
    }
    
  };

})(jQuery);
