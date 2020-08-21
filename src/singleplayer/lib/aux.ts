import {Tile} from '../../classes/Tile.js';
import {Hand} from '../../classes/Hand.js';
import {game, playerTiles, computerTiles, boardTiles} from '../main.js';

//Methods that create components of the app
function createPlayersHand(): void{
  //players[0] is the user and players[1] is the computer (I need to systematize this later) - add player tag on divs of every player and loop through it.
  for(let i=0;i<game.players[0].hand.size();i++){
    //Creating domino tags
    let tilePlayer = document.createElement('small');
    let tileComputer = document.createElement('small');

    //Adding unicode attribute on small tags
    tilePlayer.setAttribute('unicode',game.players[0].hand.get(i).getHorizontalUnicode());
    tileComputer.setAttribute('unicode',game.players[1].hand.get(i).getHorizontalUnicode());

    //Adding click event listener on player's tiles
    tilePlayer.addEventListener('click', onClick);

    //Inserting tile unicode into tags
    tilePlayer.innerHTML = game.players[0].hand.get(i).verticalUnicode;
    tileComputer.innerHTML = game.players[1].hand.get(i).unknown;

    //appending domino tags into divs
    playerTiles.appendChild(tilePlayer);
    computerTiles.appendChild(tileComputer);
  }
}

//Event listeners
function onClick(e: any): void{
  let element = e.currentTarget as HTMLTextAreaElement;//currentTarget has to have a type HTMLTextAreaElement (Not all element with type HTMLElement has the method getAttribute() - that's why I was getting that error)
  let tile = new Tile(element.getAttribute('unicode'));
  let play = game.board.isMoveValid(tile);
  if(play.result){
    let tileRemoved: Tile = game.players[0].hand.removeTile(tile);
    game.board.makePlay(tileRemoved,play.side);
    updateBoard();
    updatePlayerTiles();

    //computer makes its move
    computerMove();
  }
}

//Update methods
function updateBoard(): void{
  //update div with board every time a tile is added to it!
  boardTiles.innerHTML = '';
  for(let i=0;i<game.board.size();i++){
    let t = document.createElement('small');
    if(game.board.get(i).isDouble())
      t.innerHTML = game.board.get(i).verticalUnicode;
    else
      t.innerHTML = game.board.get(i).getHorizontalUnicode();

    boardTiles.appendChild(t);
  }
}

function updatePlayerTiles(): void{
  playerTiles.innerHTML = '';
  for(let i=0;i<game.players[0].hand.size();i++){
    let t = document.createElement('small');

    //Updating click event listener on player's tiles
    t.addEventListener('click', onClick);

    //Updating unicode attribute on small tags
    t.setAttribute('unicode',game.players[0].hand.get(i).getHorizontalUnicode());

    t.innerHTML = game.players[0].hand.get(i).verticalUnicode;
    playerTiles.appendChild(t);
  }
}

function updateComputerTiles(){
  computerTiles.innerHTML = '';
  for(let i=0;i<game.players[1].hand.size();i++){
    let t = document.createElement('small');
    t.innerHTML = game.players[1].hand.get(i).verticalUnicode;
    computerTiles.appendChild(t);
  }
}

function computerMove(): void{
  //This is the straighforward approach. I need to think about how to make the computer moves more intelligent.
  let computerHand: Hand  = game.players[1].hand;
  for(let i=0;i<computerHand.size();i++){
    let tile = computerHand.get(i);
    let computerPlay = game.board.isMoveValid(tile);

    if(computerPlay.result){//if it's a valid tile
      let tileRemoved: Tile = game.players[1].hand.removeTile(tile); //remove tile from computer's hand
      game.board.makePlay(tileRemoved, computerPlay.side);//add tile to the board
      //adding time delay for computer move
      setTimeout(()=>{
        updateBoard();
        updateComputerTiles();
      }, 2000);
      return;
    }
  }
  //if gets here, computer has to get tiles from the deck (implement later!)
  console.log('Computer doesn\'t have any tiles to play');
}

export {createPlayersHand}
