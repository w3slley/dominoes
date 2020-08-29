import {Tile} from '../classes/Tile.js';
import {computerMove} from './computer.js';
import {updateUserTiles, updateBoard, updateDeck, clearAndReturnButtonsDiv} from './events.js';
import {game} from './main.js';


function playerMove(e: MouseEvent){
  let element = e.currentTarget as HTMLElement;
  let side: string = element.classList.value;
  let horizontalUnicode: string = element.getAttribute('horizontal-unicode');
  let tile: Tile = new Tile(horizontalUnicode);
  let validSide = game.board.isMoveValid(tile).side;

  if(validSide != 'both' && validSide != side){//to prevent previous valid selected tile to be added after board is updated
    alert('not a valid move');
  }
  else if (!game.getUser().isEqual(game.getTurn())){
    alert('not your turn');
  }
  else{
    let tileRemoved: Tile = game.getUser().hand.removeTile(tile);
    game.board.makePlay(tileRemoved,side);
    clearAndReturnButtonsDiv();
    updateBoard();
    updateUserTiles();
    game.passTurn();
    computerMove();
  }
}

function passTurn(){
  if(game.getTurn().isEqual(game.getUser())){//only passing turn if it's player's turn
    game.passTurn()
    alert('you passed your turn');
    computerMove();
  }
  else{
    alert('not your turn');
  }
}

//When request for more tiles from the deck is made
function getTileFromDeck(){
  if(game.getUser().isEqual(game.getTurn())){
    let tile: Tile = game.deck.removeFirstTile();//remove tile from deck
    game.getUser().hand.addTile(tile);//add tile to player's hand
    updateUserTiles();//update hand
    updateDeck();
  }
  else
    alert('not your turn');

}

export {playerMove, getTileFromDeck, passTurn};
