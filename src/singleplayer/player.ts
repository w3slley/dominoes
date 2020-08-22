import {Tile} from '../classes/Tile.js';
import {computerMove} from './computer.js';
import {updatePlayerTiles, updateBoard} from './events.js';
import {game} from './main.js';


function playerMove(e: MouseEvent){
  e.preventDefault();
  let element = e.currentTarget as HTMLElement;
  let side: string = element.classList.value;
  let horizontalUnicode: string = element.getAttribute('horizontal-unicode');
  let tile: Tile = new Tile(horizontalUnicode);
  let play = game.board.isMoveValid(tile);
  if(play.result){
    let tileRemoved: Tile = game.players[0].hand.removeTile(tile);
    game.board.makePlay(tileRemoved,side);
    clearAndReturnButtonsDiv();
    updateBoard();
    updatePlayerTiles();

    //computer makes its move
    computerMove();
  }
}

function clearAndReturnButtonsDiv(): Element{
  let className: string = 'buttons';
  let btnDiv: HTMLElement = document.querySelector('.'+className);
  btnDiv.innerHTML = '';
  return btnDiv;
}

export {playerMove, clearAndReturnButtonsDiv}
