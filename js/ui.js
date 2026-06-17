const topPlayer = document.querySelector(".top-player");
const bottomPlayer = document.querySelector(".bottom-player");

function updateTurnUI(){
// Reset highlight
topPlayer.style.border = "none";
bottomPlayer.style.border = "none";

```
// Highlight current player
if(currentPlayer === 0){
    bottomPlayer.style.border = "3px solid yellow";
}else{
    topPlayer.style.border = "3px solid yellow";
}
```

}

// Run at game start
updateTurnUI();

