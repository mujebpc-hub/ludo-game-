const tokensLayer = document.getElementById("tokens-layer");

function createTokens(){
players.forEach(player => {
player.tokens.forEach(token => {
const tokenElement = document.createElement("img");

```
        tokenElement.src = `assets/images/tokens/${player.color}.png`;
        tokenElement.classList.add("token");

        tokenElement.dataset.player = player.id;
        tokenElement.dataset.token = token.id;

        tokenElement.style.position = "absolute";

        // Temporary starting positions
        if(player.color === "red"){
            tokenElement.style.left = "80px";
            tokenElement.style.top = `${80 + (token.id * 40)}px`;
        }

        if(player.color === "blue"){
            tokenElement.style.right = "80px";
            tokenElement.style.top = `${80 + (token.id * 40)}px`;
        }

        tokensLayer.appendChild(tokenElement);
    });
});
```

}

createTokens();

