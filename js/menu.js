const menuScreen = document.getElementById("menu-screen");
const gameScreen = document.getElementById("game-screen");

const playBtn = document.getElementById("play-btn");
const botBtn = document.getElementById("bot-btn");
const onlineBtn = document.getElementById("online-btn");
const backBtn = document.getElementById("back-btn");

playBtn.onclick = () => {
menuScreen.classList.add("hidden");
gameScreen.classList.remove("hidden");
};

botBtn.onclick = () => {
menuScreen.classList.add("hidden");
gameScreen.classList.remove("hidden");
};

onlineBtn.onclick = () => {
alert("Online mode coming soon");
};

backBtn.onclick = () => {
gameScreen.classList.add("hidden");
menuScreen.classList.remove("hidden");
};

