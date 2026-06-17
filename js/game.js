function nextTurn(){
currentPlayer++;

```
if(currentPlayer >= players.length){
    currentPlayer = 0;
}

console.log("Current Turn:", players[currentPlayer].name);
```

}

dice.onclick = () => {
rollDice();

```
moveToken(currentPlayer);
checkKill();
checkWin(currentPlayer);

console.log(players[currentPlayer].name + " rolled " + diceValue);

nextTurn();

updateTurnUI();
```

};
