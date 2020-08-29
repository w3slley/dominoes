import {Tile} from '../classes/Tile.js';
import {Hand} from '../classes/Hand.js';
import {Player} from '../classes/Player.js';
import {updateComputerTiles, updateBoard, updateDeck} from './events.js';
import {game} from './main.js';
//to generalize a computer move for multiple users (non-player), this function could become a method inside the player class taking as input a game object and the id of the player (right now is only the array index but later could become a more unique number)
async function computerMove(){
  //Base case - when it's the user's turn again, get out of function.
  if(game.getTurn() == game.getUser()){
    return;
  }
  //This is the straighforward approach. I need to think about how to make the computer moves more intelligent.
  let computerHand: Hand  = game.getTurn().hand;
  for(let i=0;i<computerHand.size();i++){
    let tile: Tile = computerHand.get(i);
    let computerPlay = game.board.isMoveValid(tile);

    if(computerPlay.result){//if it's a valid tile
      await playTile(tile, computerPlay.side);
      game.passTurn();
      computerMove();
      return;
    }
  }
  //if gets here, computer has to get tiles from the deck - it also waits 2s to give a response.
  if(game.deck.size()!=0){
    let tile: Tile = game.deck.removeFirstTile();//remove tile from deck
    await addTileToHand(tile);
    //if tile from deck can't be played, get more tiles untill it can. If not, return msg!
    while(!game.board.isMoveValid(tile).result){
      if(game.deck.size()==0) break;
      tile = game.deck.removeFirstTile();
      await addTileToHand(tile);
    }

    if(game.deck.size()==0)
      alert('Computer doesn\'t have any tiles to play and deck is empty!');
    else
      await playTile(tile, game.board.isMoveValid(tile).side);
  }
  else{
    alert('Computer doesn\'t have any tiles to play and deck is empty!');
  }
  game.passTurn(); //pass turn at the end
  computerMove();
}

//Functions that return promises that sleep for 2 seconds so that computer move is not instantaneous
function addTileToHand(tile: Tile): Promise<string>{
  return new Promise(resolve=>setTimeout(()=>{
    game.getTurn().hand.addTile(tile);//add tile to computer's hand
    updateComputerTiles(game.getTurn().getPlayerId());
    updateDeck();
    resolve('ok');
  },2000));
}

function playTile(tile: Tile, side: string): Promise<string>{
  return new Promise(resolve=>setTimeout(()=>{
    let computerId = game.getTurn().getPlayerId()
    game.getComputer(computerId).hand.removeTile(tile);//removing tile from computer hand
    game.board.makePlay(tile, side);//add tile to the board
    updateComputerTiles(computerId);
    updateBoard();
    resolve('ok');
  },2000));
}

export {computerMove};
