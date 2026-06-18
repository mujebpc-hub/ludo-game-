import { COLORS } from "./board.js";
import { chooseBotToken } from "./bot.js";
import { Dice } from "./dice.js";
import { markMoved } from "./animation.js";
import { Menu } from "./menu.js";
import { moveToken } from "./movement.js";
import { createPlayers } from "./player.js";
import { movableTokens, hasWon } from "./rules.js";
import { Sound } from "./sound.js";
import { UI } from "./ui.js";

export class LudoGame {
  constructor() {
    this.players = [];
    this.turn = 0;
    this.awaitingMove = false;
    this.botMode = false;
    this.dice = new Dice(document.querySelector("#dice"));
    this.sound = new Sound();
    this.ui = new UI(this);
    this.menu = new Menu((count, botMode) => this.start(count, botMode));
  }

  init() {
    this.ui.buildBoard();
    this.menu.init();
    document.querySelector("#roll-btn").addEventListener("click", () => this.roll());
    document.querySelector("#dice").addEventListener("click", () => this.roll());
    document.querySelector("#dice").addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") this.roll();
    });
    document.querySelector("#skip-btn").addEventListener("click", () => this.endTurn());
    document.querySelector("#new-game").addEventListener("click", () => this.start(this.players.length || 4, this.botMode));
    document.querySelector("#winner-new").addEventListener("click", () => this.start(this.players.length || 4, this.botMode));
  }

  start(count = 4, botMode = false) {
    this.players = createPlayers(COLORS.slice(0, count), botMode);
    this.turn = 0;
    this.awaitingMove = false;
    this.botMode = botMode;
    this.dice.reset();
    this.ui.hideWinner();
    this.ui.render();
    this.maybeBotTurn();
  }

  currentPlayer() {
    return this.players[this.turn];
  }

  roll() {
    if (!this.players.length || this.awaitingMove) return;
    const player = this.currentPlayer();
    if (player.isBot) return;
    this.performRoll();
  }

  performRoll() {
    const player = this.currentPlayer();
    const value = this.dice.roll();
    this.sound.play("roll");
    const moves = movableTokens(player, value);
    this.awaitingMove = moves.length > 0;
    this.ui.status.textContent = moves.length ? `${player.name} rolled ${value}` : `${player.name} has no move`;
    this.ui.renderTokens();
    if (!moves.length) setTimeout(() => this.endTurn(), 700);
    if (player.isBot && moves.length) setTimeout(() => this.botMove(), 700);
  }

  selectToken(playerId, tokenId) {
    const player = this.currentPlayer();
    if (!this.awaitingMove || player.id !== playerId || player.isBot) return;
    const token = player.tokens[tokenId];
    if (!movableTokens(player, this.dice.value).includes(token)) return;
    this.applyMove(player, token);
  }

  botMove() {
    const player = this.currentPlayer();
    const token = chooseBotToken(player, this.dice.value, this.players);
    if (!token) return this.endTurn();
    this.applyMove(player, token);
  }

  applyMove(player, token) {
    const result = moveToken(this.players, player, token, this.dice.value);
    this.awaitingMove = false;
    this.sound.play(result.captured ? "kill" : "move");
    this.ui.render();
    markMoved(`${player.color}-${token.id}`);

    if (hasWon(player)) {
      this.sound.play("win");
      this.ui.showWinner(player);
      return;
    }

    if (this.dice.value === 6 || result.captured || result.finished) {
      this.dice.reset();
      this.ui.status.textContent = `${player.name} gets another turn`;
      setTimeout(() => this.maybeBotTurn(), 650);
      return;
    }

    setTimeout(() => this.endTurn(), 450);
  }

  endTurn() {
    if (!this.players.length) return;
    this.awaitingMove = false;
    this.dice.reset();
    this.turn = (this.turn + 1) % this.players.length;
    this.ui.render();
    this.maybeBotTurn();
  }

  maybeBotTurn() {
    const player = this.currentPlayer();
    if (player?.isBot) setTimeout(() => this.performRoll(), 800);
  }
}
