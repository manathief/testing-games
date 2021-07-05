var game = document.getElementById("game");
var player = document.getElementById("player");
var gameOver = document.getElementById("gameover");
var interval;
var multiKey = 0;
var counter = 0;
var currentWalls = [];

function moveLeft(){
    var left = parseInt(window.getComputedStyle(player).getPropertyValue("left"));
    if (left>0)
        player.style.left = left - 2 + "px";   
}
function moveRight(){
    var left = parseInt(window.getComputedStyle(player).getPropertyValue("left"));
    if (left<380)
        player.style.left = left + 2 + "px";
}

document.addEventListener("keydown", event => {
    if(multiKey == 0){
        if(event.key === "ArrowLeft"){
            interval = setInterval(moveLeft, 10);
        }
        if(event.key === "ArrowRight"){
            interval = setInterval(moveRight, 10);
        }
        multiKey++;
    }
    
});
document.addEventListener("keyup", event => {
    clearInterval(interval);
    multiKey = 0;
});

var gameLoop = setInterval(function() {
    var prevWall = document.getElementById("wall" + (counter-1));
    var prevHole = document.getElementById("hole" + (counter-1));

    if(counter>0){
        var prevWallTop = parseInt(window.getComputedStyle(prevWall).getPropertyValue("top"));
        var prevHoleTop = parseInt(window.getComputedStyle(prevHole).getPropertyValue("top"));
    }

    if(prevWallTop < 400 || counter == 0){
        var wall = document.createElement("div");
        var hole = document.createElement("div");
        wall.setAttribute("class", "wall");
        hole.setAttribute("class", "hole");
        wall.setAttribute("id", "wall" + counter);
        hole.setAttribute("id", "hole" + counter);

        wall.style.top = prevWallTop + 100 + "px";
        hole.style.top = prevHoleTop + 100 + "px";

        var random = Math.floor(Math.random() * 360);
        hole.style.left = random + "px";
        game.appendChild(wall);
        game.appendChild(hole);
        currentWalls.push(counter);
        counter++;
    }

    var playerTop = parseInt(window.getComputedStyle(player).getPropertyValue("top"));
    var playerLeft = parseInt(window.getComputedStyle(player).getPropertyValue("left"));
    var drop = 0;

    for (var i = 0; i < currentWalls.length; i++) {
        let current = currentWalls[i];
        let iWall = document.getElementById("wall" + current);
        let iHole = document.getElementById("hole" + current);
        let iWallTop = parseFloat(window.getComputedStyle(iWall).getPropertyValue("top"));
        let iHoleLeft = parseInt(window.getComputedStyle(iHole).getPropertyValue("left"))

        iWall.style.top = iWallTop - 0.5 + "px";
        iHole.style.top = iWallTop - 0.5 + "px";

        if(iWallTop < -20){
            currentWalls.shift();
            iWall.remove();
            iHole.remove();
        }

        if(iWallTop-20 < playerTop && iWallTop > playerTop){
            drop++;
            if(iHoleLeft <= playerLeft && iHoleLeft + 20 >= playerLeft){
                drop = 0;
            }
        }
    }

    if (drop == 0) {
        if (playerTop < 480) {   
            player.style.top = playerTop + 2 + "px";    // falling
        }

    }else{
        if (playerTop == 0){        // exit loop, clear canvas
            for (var i = counter - 1; i >= counter - currentWalls.length; i--) {
                var wall = document.getElementById("wall" + i);
                var hole = document.getElementById("hole" + i);
                wall.remove();
                hole.remove();
            }
            player.remove();
            gameOver.style.visibility = "visible";
            gameOver.append("</br>\n Score = " + (counter-9));
            clearInterval(gameLoop);
        }
        player.style.top = playerTop - 0.5 + "px";      // rising
    }

}, 1);