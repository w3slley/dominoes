import {Game} from '../classes/Game.js';
import {Player} from '../classes/Player.js';
import {createPlayersHand} from './events.js';
import {computerMove} from './computer.js';

let numPlayers = 2;
let names = ['Weslley', 'Computer'];
let types = ['player', 'computer'];
let players = [];

for(let i=0;i<numPlayers;i++){
  let p: Player = new Player(i, names[i], types[i]);
  players.push(p);
}

let game: Game = new Game(players);
const playerTiles = document.querySelector('.player');
const computerTiles = document.querySelector('.computer');
const boardTiles = document.querySelector('.board');

createPlayersHand();

//if computer starts the game
if(game.getComputer().isEqual(game.getTurn())){
  computerMove();
}

export {game, playerTiles, computerTiles, boardTiles};
