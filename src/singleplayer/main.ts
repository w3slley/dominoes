import {Game} from '../classes/Game.js';
import {Player} from '../classes/Player.js';
import {createBoard} from './events.js';
import {computerMove} from './computer.js';

//Configurations for the game
let numPlayers: number = 4;
let tilesPerPlayer: number = 4;
let players = [];

for(let i=0;i<numPlayers;i++){
  let p: Player;
  if(i===0)
     p = new Player(i, 'Weslley', 'user');
  else
    p = new Player(i, 'Computer'+i, 'computer');

  players.push(p);
}

let game: Game = new Game(numPlayers, tilesPerPlayer, players);

createBoard();

//if computer starts the game
if(game.isComputer(game.getTurn())){
  computerMove();
}

export {game};
