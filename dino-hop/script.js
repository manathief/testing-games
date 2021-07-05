var character = document.getElementById("character");
var block = document.getElementById("block");
var gameOver = document.getElementById("gameover");

function jump(){
    if(character.classList != "animate"){
        character.classList.add("animate");
    }
    setTimeout(function(){
        character.classList.remove("animate");
    },500);
}

var checkDead = setInterval(function(){
    var characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
    var blockleft = parseInt(window.getComputedStyle(block).getPropertyValue("left"));
    if (characterTop >= 130 && blockleft < 20 && blockleft > 0){
        console.log("dead");
        block.style.animation = "none";
        block.style.display = "none";
        character.style.display="none";
        gameOver.style.visibility = "visible";
        //alert("you suck");
    }
}, 10);