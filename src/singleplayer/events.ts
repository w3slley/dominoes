import {Tile} from '../classes/Tile.js';
import {playerMove, getTileFromDeck, passTurn} from './player.js';
import {computerMove} from './computer.js';
import {game, playerTiles, computerTiles, boardTiles} from './main.js';

//Methods that create components of the app

//creates board and player divs (implement later)
function createBoard(): void{
  for(let i=0;i<game.players.length;i++){

  }
}

function createPlayersHand(): void{
  //systematize this function to n players!
  for(let i=0;i<game.getPlayer().hand.size();i++){
    //Creating domino tags
    let tilePlayer = document.createElement('small');
    let tileComputer = document.createElement('small');

    //Adding unicode attribute on small tags
    tilePlayer.setAttribute('unicode',game.getPlayer().hand.get(i).getHorizontalUnicode());
    tileComputer.setAttribute('unicode',game.getComputer().hand.get(i).getHorizontalUnicode());

    //Adding click event listener on player's tiles
    tilePlayer.addEventListener('click', selectTile);

    //Inserting tile unicode into tags
    tilePlayer.innerHTML = game.getPlayer().hand.get(i).verticalUnicode;
    tileComputer.innerHTML = game.getComputer().hand.get(i).unknown;

    //adding orientation as class for styling
    tilePlayer.classList.add('vertical');
    tileComputer.classList.add('vertical');

    //appending domino tags into divs
    playerTiles.appendChild(tilePlayer);
    computerTiles.appendChild(tileComputer);
  }
  //create pass turn btn
  createPassTurnBtn();

  //initialize deck div
  updateDeck();

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
  for(let i=0;i<game.getPlayer().hand.size();i++){
    let t = document.createElement('small');
    t.addEventListener('click', selectTile);
    t.setAttribute('unicode',game.getPlayer().hand.get(i).getHorizontalUnicode());
    t.classList.add('vertical');
    t.innerHTML = game.getPlayer().hand.get(i).verticalUnicode;
    playerTiles.appendChild(t);
  }
}

function updateComputerTiles(){
  computerTiles.innerHTML = '';
  for(let i=0;i<game.getComputer().hand.size();i++){
    let t = document.createElement('small');
    t.classList.add('vertical');
    t.innerHTML = game.getComputer().hand.get(i).unknown;
    computerTiles.appendChild(t);
  }
}

function updateDeck(): void{
  let deck: HTMLDivElement = document.querySelector('.deck');
  deck.style.display = 'block';
  deck.addEventListener('click', getTileFromDeck);
  deck.innerHTML = `Deck (${game.deck.size()})`;
}

function createPassTurnBtn(): void{
  let div: HTMLElement = document.querySelector('.pass-turn');
  div.innerHTML = 'Pass turn';
  div.addEventListener('click', passTurn);
  div.style.display = 'block';
}

//Event listeners
function selectTile(e: MouseEvent): void{
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


function clearAndReturnButtonsDiv(): Element{
  let className: string = 'buttons';
  let btnDiv: HTMLElement = document.querySelector('.'+className);
  btnDiv.innerHTML = '';
  return btnDiv;
}


export {createPlayersHand, updatePlayerTiles, updateComputerTiles, updateBoard, updateDeck, clearAndReturnButtonsDiv};
