import {Tile} from '../classes/Tile.js';
import {playerMove, clearAndReturnButtonsDiv} from './player.js';
import {game, playerTiles, computerTiles, boardTiles} from './main.js';

//Methods that create components of the app

//creates board and player divs (implement later)
function createBoard(): void{
  for(let i=0;i<game.players.length;i++){

  }
}

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
    tilePlayer.addEventListener('click', onTileClick);

    //Inserting tile unicode into tags
    tilePlayer.innerHTML = game.players[0].hand.get(i).verticalUnicode;
    tileComputer.innerHTML = game.players[1].hand.get(i).unknown;

    //adding orientation as class for styling
    tilePlayer.classList.add('vertical');
    tileComputer.classList.add('vertical');

    //appending domino tags into divs
    playerTiles.appendChild(tilePlayer);
    computerTiles.appendChild(tileComputer);

    //initialize deck div
    updateDeck();
  }
}

//Update methods
function updateBoard(): void{
  //update div with board every time a tile is added to it!
  boardTiles.innerHTML = '';
  for(let i=0;i<game.board.size();i++){
    let t = document.createElement('small');
    if(game.board.get(i).isDouble()){
      t.innerHTML = game.board.get(i).verticalUnicode;
      t.classList.add('vertical');
    }
    else{
      t.innerHTML = game.board.get(i).getHorizontalUnicode();
      t.classList.add('horizontal');
    }
    boardTiles.appendChild(t);
  }
}

function updatePlayerTiles(): void{
  playerTiles.innerHTML = '';
  for(let i=0;i<game.players[0].hand.size();i++){
    let t = document.createElement('small');
    t.addEventListener('click', onTileClick);
    t.setAttribute('unicode',game.players[0].hand.get(i).getHorizontalUnicode());
    t.classList.add('vertical');
    t.innerHTML = game.players[0].hand.get(i).verticalUnicode;
    playerTiles.appendChild(t);
  }
}

function updateComputerTiles(){
  computerTiles.innerHTML = '';
  for(let i=0;i<game.players[1].hand.size();i++){
    let t = document.createElement('small');
    t.classList.add('vertical');
    t.innerHTML = game.players[1].hand.get(i).verticalUnicode;
    computerTiles.appendChild(t);
  }
}

function updateDeck(): void{
  let deck: HTMLDivElement = document.querySelector('.deck');
  deck.style.display = 'block';
  deck.addEventListener('click', onDeckClick);
  deck.innerHTML = `Deck (${game.deck.size()})`;
}

//Event listeners
function onTileClick(e: MouseEvent): void{
  let btn: Element = clearAndReturnButtonsDiv();

  let element = e.currentTarget as HTMLElement;//currentTarget has to have a type HTMLElement (Not all element with type HTMLElement has the method getAttribute() - that's why I was getting that error)
  let horizontalUnicode: string = element.getAttribute('unicode');
  let left: HTMLButtonElement = document.createElement('button');
  let right: HTMLButtonElement = document.createElement('button');

  //setting attributes on side buttons
  //left button
  left.classList.add('left');
  left.setAttribute('horizontal-unicode', horizontalUnicode);
  left.addEventListener('click', playerMove);
  left.innerHTML = 'Add Left';
  //right button
  right.classList.add('right');
  right.setAttribute('horizontal-unicode', horizontalUnicode);
  right.addEventListener('click', playerMove);
  right.innerHTML = 'Add Right';

  //checking if current tile can be used
  let tile: Tile = new Tile(horizontalUnicode);
  let play = game.board.isMoveValid(tile);
  if(play.result){
    if(play.side == 'both'){
      btn.appendChild(left);
      btn.appendChild(right);
    }
    else if(play.side == 'right')
      btn.appendChild(right);
    else if(play.side == 'left')
      btn.appendChild(left);
  }
}

//When request for more tiles from the deck is made
function onDeckClick(e: MouseEvent){
  let tile: Tile = game.deck.removeFirstTile();//remove tile from deck
  game.players[0].hand.addTile(tile);//add tile to player's hand
  updatePlayerTiles();//update hand
  updateDeck();
}


export {createPlayersHand, updatePlayerTiles, updateComputerTiles, updateBoard, updateDeck};
