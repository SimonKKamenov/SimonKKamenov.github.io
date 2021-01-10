
    function _(selector){
      return document.querySelector(selector);
    }
    function setup(){
      let canvas = createCanvas(650, 600);
      canvas.parent("canvas-wrapper");
      background(255);
    }
    function mouseDragged(){
      let type = _("#pen-pencil").checked?"pencil":"brush";
      let size = parseInt(_("#pen-size").value);
      let color = _("#pen-color").value;
      strokeWeight(size);

      if(type == "pencil"){
        fill(color);
        stroke(color); 
      } 
      else {
        fill('#ffffff');
        stroke('#ffffff');
      } 
      line(pmouseX, pmouseY, mouseX, mouseY);
    }
    _("#reset-canvas").addEventListener("click", function(){
      background(255);
    });
    _("#save-canvas").addEventListener("click",function(){
      saveCanvas(canvas, "paintDemo", "png");
    });
    
  

