function checkKill(){
const player1 = players[0].tokens[0];
const player2 = players[1].tokens[0];

```
if(player1.position === player2.position && player1.position !== 0){
    if(currentPlayer === 0){
        player2.position = 0;
        console.log("Player 2 token killed!");
    }else{
        player1.position = 0;
        console.log("Player 1 token killed!");
    }
}
```

}

function checkWin(playerIndex){
const player = players[playerIndex];
const token = player.tokens[0];

```
if(token.position >= 50){
    alert(player.name + " Wins!");
}
```

}

