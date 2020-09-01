import {Tile} from '../classes/Tile.js';
import {computerMove} from './computer.js';
import {updateUserTiles, updateBoard, updateDeck, highlightNextTurn, updateWinnerTiles, clearAndReturnButtonsDiv} from './events.js';
import {game} from './main.js';


function playerMove(e: MouseEvent): void{
  let user = game.getUser();
  let element = e.currentTarget as HTMLElement;
  let side: string = element.classList.value;
  let horizontalUnicode: string = element.getAttribute('horizontal-unicode');
  let tile: Tile = new Tile(horizontalUnicode);
  let validSide = game.board.isMoveValid(tile).side;

  if(validSide != 'both' && validSide != side){//to prevent previous valid selected tile to be added after board is updated
    alert('Not a valid move!');
  }
  else if (!game.getUser().isEqual(game.getTurn())){
    alert('Not your turn!');
  }
  else{
    let tileRemoved: Tile = user.hand.removeTile(tile);
    game.board.makePlay(tileRemoved,side);
    //When user wins the game, game is over!
    if(user.hand.size()===0){
      let playerId = user.getPlayerId();
      updateWinnerTiles(playerId);
      game.addWinner(playerId);
      let place = game.winners.length;
      if(place == 1){
        alert('You have won the game!');
      }
      else{
        alert('Won on '+place+' position!');
      }
      alert('Display buttons to play again');
      window.location.href = '/';//temporary
    }
    else{
      clearAndReturnButtonsDiv();//remove all user butons to add tiles to board
      updateBoard();//cleans board and updates it (html) with the new tiles
      updateUserTiles();//cleans user hand and updates it (adds or removes tiles)
      passPlayerTurn();//reusing function used in deck event listener
    }
  }
}

function passPlayerTurn(): void{
  if(game.getTurn().isEqual(game.getUser())){//only passing turn if it's player's turn
    highlightNextTurn();//highlights next player's name and remove highlighting on the current one
    game.passTurn();//passes the turn
    computerMove();//computer makes its mode
  }
  else{
    alert('Not your turn!');
  }
}

//When request for more tiles from the deck is made
function getTileFromDeck(): void{
  if(game.getUser().isEqual(game.getTurn())){
    if(game.deck.size()===0) {
      alert('Deck is empty!');
      return;
    }
    let tile: Tile = game.deck.removeFirstTile();//remove tile from deck
    game.getUser().hand.addTile(tile);//add tile to player's hand
    updateUserTiles();//update hand
    updateDeck();
  }
  else
    alert('Not your turn!');

}

export {playerMove, getTileFromDeck, passPlayerTurn};
