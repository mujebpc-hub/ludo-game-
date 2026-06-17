function moveToken(playerIndex){
const player = players[playerIndex];
const token = player.tokens[0]; // first token only for now

```
token.position += diceValue;

const tokenElement = document.querySelector(
    `[data-player="${player.id}"][data-token="${token.id}"]`
);

let currentLeft = parseInt(tokenElement.style.left || 0);
let currentTop = parseInt(tokenElement.style.top || 0);

// Temporary movement: move right
currentLeft += diceValue * 30;

animateToken(tokenElement, currentLeft, currentTop);
```

}

