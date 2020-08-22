import {Tile} from '../classes/Tile.js';
import {Hand} from '../classes/Hand.js';
import {Player} from '../classes/Player.js';
import {updateComputerTiles, updateBoard, updateDeck} from './events.js';
import {game} from './main.js';
//to generalize a computer move for multiple users (non-player), this function could become a method inside the player class taking as input a game object and the id of the player (right now is only the array index but later could become a more unique number)
async function computerMove(){
  //This is the straighforward approach. I need to think about how to make the computer moves more intelligent.
  let computerHand: Hand  = game.getTurn().hand;
  for(let i=0;i<computerHand.size();i++){
    let tile: Tile = computerHand.get(i);
    let computerPlay = game.board.isMoveValid(tile);

    if(computerPlay.result){//if it's a valid tile
      await playTile(tile);
      game.passTurn();
      return;
    }
  }
  //if gets here, computer has to get tiles from the deck (implement later!) - it also waits 2s to give a response.
  if(game.deck.size()!=0){
    let tile: Tile = game.deck.removeFirstTile();//remove tile from deck
    await addTileToHand(tile);

    //if tile from deck can't be played, get more tiles untill it can. If not, return msg!
    while(!game.board.isMoveValid(tile).result){
      if(game.deck.size()==0) break;
      tile = game.deck.removeFirstTile();
      await addTileToHand(tile);
    }

    if(game.deck.size()==0){
      alert('Computer doesn\'t have any tiles to play and deck is empty!');
    }
    else{
      await playTile(tile);
    }
  }
  else{
    alert('Computer doesn\'t have any tiles to play and deck is empty!');

  }
  game.passTurn(); //pass turn at the end
}

//Functions that return promises that sleep for 2 seconds so that computer move is not instantaneous
function addTileToHand(tile: Tile): Promise<string>{
  return new Promise(resolve=>setTimeout(()=>{
    game.players[1].hand.addTile(tile);//add tile to computer's hand
    updateComputerTiles();
    updateDeck();
    resolve('ok');
  },2000));
}

function playTile(tile: Tile): Promise<string>{
  return new Promise(resolve=>setTimeout(()=>{
    game.players[1].hand.removeTile(tile);//remove tile from hand
    game.board.makePlay(tile, game.board.isMoveValid(tile).side);//add tile to the board
    updateBoard();
    updateComputerTiles();
    resolve('ok');
  },2000));
}

export {computerMove};
