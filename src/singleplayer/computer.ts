import {Tile} from '../classes/Tile.js';
import {Hand} from '../classes/Hand.js';
import {updateComputerTiles, updateBoard, updateDeck, highlightCurrentTurn, highlightNextTurn, updateWinnerTiles} from './events.js';
import {game} from './main.js';

async function computerMove(){
  //When there is only one player left (the user), this player lost the game (i.e was last to win)
  if(game.players.length === 1){
    alert('You have lost the game!');
    return;
  }
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
      //if player doesn't have any more domino tiles, then they won the game
      if(computerHand.size()===0){
        let playerId: number = game.getTurn().getPlayerId();
        game.addWinner(playerId);
        updateWinnerTiles(playerId);
        highlightCurrentTurn();//simply highlights the name of player that has the turn
        computerMove();
        return;
      }
      passComputerTurn();
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

    if(game.deck.size()==0){
      await wait();
      console.log('Computer doesn\'t have any tiles to play and deck is empty!');
    }

    else
      await playTile(tile, game.board.isMoveValid(tile).side);
  }
  else{
    await wait();
    console.log('Computer doesn\'t have any tiles to play and deck is empty!');
  }
  passComputerTurn();
}

//function that takes care of passing turn of computer
function passComputerTurn(): void{
  highlightNextTurn();
  game.passTurn();
  computerMove();
}

//Functions that return promises that sleep for 1.5 seconds so that computer move is not instantaneous
function addTileToHand(tile: Tile): Promise<string>{
  return new Promise(resolve=>setTimeout(()=>{
    game.getTurn().hand.addTile(tile);//add tile to computer's hand
    updateComputerTiles(game.getTurn().getPlayerId());
    updateDeck();
    resolve('ok');
  },1500));
}

function playTile(tile: Tile, side: string): Promise<string>{
  return new Promise(resolve=>setTimeout(()=>{
    let computerId: number = game.getTurn().getPlayerId()
    game.getPlayer(computerId).hand.removeTile(tile);//removing tile from computer hand
    game.board.makePlay(tile, side);//add tile to the board
    updateComputerTiles(computerId);
    updateBoard();
    resolve('ok');
  },1500));
}

//method used for waiting when computer doesn't have tile and deck is empty - so that it doesn't look like the turn was simply jumped from one player to the one after the next
function wait():Promise<string>{
  return new Promise(resolve=>setTimeout(()=>{
    resolve('ok');
  }, 1500));
}

export {computerMove};
