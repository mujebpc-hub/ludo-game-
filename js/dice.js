const dice = document.getElementById("dice");

let diceValue = 1;

function rollDice(){
diceValue = Math.floor(Math.random() * 6) + 1;

```
dice.src = `assets/images/dice/dice-${diceValue}.png`;

return diceValue;
```

}

dice.onclick = () => {
rollDice();
};

