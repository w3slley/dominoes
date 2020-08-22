import {Game} from '../classes/Game.js';
import {Player} from '../classes/Player.js';
import {createPlayersHand} from './events.js';

let p1: Player = new Player('Weslley', 'player');
let pc: Player = new Player('Computer', 'computer');
let game: Game = new Game([p1, pc]);
const playerTiles = document.querySelector('.player');
const computerTiles = document.querySelector('.computer');
const boardTiles = document.querySelector('.board');

createPlayersHand();

export {game, playerTiles, computerTiles, boardTiles};
